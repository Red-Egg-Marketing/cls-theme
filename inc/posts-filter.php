<?php


if (!wp_next_scheduled('cls_vehicles_vin_features_lookup')) {
    wp_schedule_event( time(), '12hrs', 'cls_vehicles_vin_features_lookup' );
}

add_action ( 'cls_vehicles_vin_features_lookup', 'cls_all_vins_features_lookup' );

function cls_all_vins_features_lookup() {
    $vehicles = [
        'post_type' => 'vehicle',
        'post_status' => 'publish',
        'posts_per_page' => -1
    ];

    $query = new WP_Query($arg);

    if ($query->have_posts()) {
        while($query->have_posts()){
            $query->the_post();
            $post_id = get_the_ID();

            $vin = get_post_meta($post_id, 'vin', true);

            if (get_post_meta($post_id, 'exterior', true)) {
                continue;
            }

            curl_call_vd($post_id, $vin);
        }
    }

    wp_reset_postdata();

}


function curl_call_vd($post_id, $vin) {

    $curl = curl_init();

    curl_setopt_array($curl, [
    CURLOPT_URL => "https://vehicle-database.p.rapidapi.com/userreport/vin-decoding-premium-plus?vin=" . $vin,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 30,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
            "X-RapidAPI-Host: vehicle-database.p.rapidapi.com",
            "X-RapidAPI-Key: 939a406ac1msh07aacf37e0391c0p1ffeb7jsnef460c51559d"
        ],
    ]);

    $response = json_decode(curl_exec($curl), true);

    $err = curl_error($curl);

    curl_close($curl);
    

    if ($err || $response == null) {
        return;
    } else {
        if ($response['status'] == 'success') {
            $key = array_keys($response['data']);
            $features = $response['data'][$key[0]]['feature'];
            foreach($features as $key => $feature) {
                // $feature = json_encode($feature);
                add_post_meta(
                    $post_id,
                    $key,
                    $feature,
                    true
                );

            }
        }
    }
}


function cls_vin_features_lookup( $post_id ) {
    
    $post_type = get_post_type($post_id);

    $vin = get_post_meta($post_id, 'vin', true);

    if (get_post_meta($post_id, 'exterior', true)) {
        return;
    }

    curl_call_vd($post_id, $vin);
   
}

add_action('save_post_vehicle', 'cls_vin_features_lookup');


// use to import attributes not available in import file
function cls_vin_import_check( $post_id ) {

    $post_type = get_post_type($post_id);

    $vin = get_post_meta($post_id, 'vin', true);

    if ($vin != '' && $post_type != 'vehicle') return;

    $postdata = http_build_query(
        array(
                'format' => 'json',
                'data' => $vin
            )
    );
    $opts = array('http' =>
        array(
            'method' => 'POST',
            'content' => $postdata
        )
    );
    $apiURL = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/";
    $context = stream_context_create($opts);
    $fp = fopen($apiURL, 'rb', false, $context);
    if(!$fp)
    {
        exit;
    }
    $response = @stream_get_contents($fp);
    if($response == false)
    {
        exit;
    }

    $response = json_decode($response);

    $results = $response->Results;

    foreach($results as $result) {
        $fuel_type = $result->FuelTypePrimary;
        $seats = $result->Seats;

        if($fuel_type) {
            wp_set_post_terms(
                $post_id,
                $fuel_type,
                'fuel_type',
                false
            );
        }
        if($seats) {
            add_post_meta(
                $post_id,
                'seats',
                $seats,
                true
            );
        }
    }
}

add_action('save_post_vehicle', 'cls_vin_import_check');


function cls_rewrite_rules_update( $post_id ) {

    if ( array_key_exists('post_type', $_POST) && $_POST['post_type'] != 'vehicle' ) {
        return;
    }
    flush_rewrite_rules();
}
add_action('save_post', 'cls_rewrite_rules_update');