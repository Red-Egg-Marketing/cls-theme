<?php


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
        if($fuel_type) {
            wp_set_post_terms(
                $post_id,
                $fuel_type,
                'fuel_type',
                false
            );
        }
    }
}

add_action('save_post', 'cls_vin_import_check');


function cls_rewrite_rules_update( $post_id ) {

    if ( array_key_exists('post_type', $_POST) && $_POST['post_type'] != 'vehicle' ) {
        return;
    }
    flush_rewrite_rules();
}
add_action('save_post', 'cls_rewrite_rules_update');