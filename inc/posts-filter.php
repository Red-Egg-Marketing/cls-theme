<?php
/**
 * Vehicle VIN feature lookup + rewrite flush.
 *
 * VIN feature decoding runs on a 12-hour cron (cls_vehicles_vin_features_lookup),
 * NOT on save_post_vehicle — so a slow or failed external API never blocks or
 * truncates the CSV import. The old fopen()/die() NHTSA lookup was removed: a
 * dead remote call under allow_url_fopen=0 was halting the entire import mid-loop.
 */


/**
 * Schedule the 12-hour VIN feature backfill.
 */
if ( ! wp_next_scheduled( 'cls_vehicles_vin_features_lookup' ) ) {
    wp_schedule_event( time(), '12hrs', 'cls_vehicles_vin_features_lookup' );
}

/**
 * Loop all published vehicles and decode features for any that are missing them.
 * Runs on the 12-hour cron only.
 */
function cls_all_vins_features_lookup() {
    $vehicles = [
        'post_type'      => 'vehicle',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
    ];

    $query = new WP_Query( $vehicles );

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $post_id = get_the_ID();
            $vin     = get_post_meta( $post_id, 'vin', true );

            // Skip vehicles that already have all four feature groups.
            $has_features = get_post_meta( $post_id, 'exterior', true )
                && get_post_meta( $post_id, 'interior', true )
                && get_post_meta( $post_id, 'safety', true )
                && get_post_meta( $post_id, 'mechanical_and_powertrain', true );

            if ( $has_features ) {
                continue;
            }

            curl_call_vd( $post_id, $vin );
        }
    }

    wp_reset_postdata();
}
add_action( 'cls_vehicles_vin_features_lookup', 'cls_all_vins_features_lookup' );

/**
 * Decode a single VIN via the Vehicle Database RapidAPI and store its features.
 * Fails closed: any cURL error, empty response, or missing key returns quietly
 * without ever halting the calling process.
 */
function curl_call_vd( $post_id, $vin ) {

    if ( empty( $vin ) ) {
        return;
    }

    $curl = curl_init();

    curl_setopt_array( $curl, [
        CURLOPT_URL            => 'https://vehicle-database.p.rapidapi.com/userreport/vin-decoding-premium-plus?vin=' . rawurlencode( $vin ),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING       => '',
        CURLOPT_MAXREDIRS      => 30,
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST  => 'GET',
        CURLOPT_HTTPHEADER     => [
            'X-RapidAPI-Host: vehicle-database.p.rapidapi.com',
            'X-RapidAPI-Key: 939a406ac1msh07aacf37e0391c0p1ffeb7jsnef460c51559d',
        ],
    ] );

    $response = json_decode( curl_exec( $curl ), true );
    $err      = curl_error( $curl );

    curl_close( $curl );

    if ( $err || $response === null ) {
        return;
    }

    if ( isset( $response['status'] ) && $response['status'] === 'success' ) {
        $keys     = array_keys( $response['data'] );
        $features = $response['data'][ $keys[0] ]['feature'];

        foreach ( $features as $key => $feature ) {
            add_post_meta( $post_id, $key, $feature, true );
        }
    }
}

/**
 * Flush rewrite rules when a vehicle is saved.
 */
function cls_rewrite_rules_update( $post_id ) {
    if ( array_key_exists( 'post_type', $_POST ) && $_POST['post_type'] !== 'vehicle' ) {
        return;
    }
    flush_rewrite_rules();
}
add_action( 'save_post', 'cls_rewrite_rules_update' );