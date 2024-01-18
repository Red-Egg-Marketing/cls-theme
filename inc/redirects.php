<?php

function cls_vin_number_redirect() {
	global $wpdb;

	$vin = get_query_var('vin', false);
	$stock = get_query_var('stock', false);

    if ($vin != false) {
    	$vehicle = $wpdb->get_col("SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'vin' && meta_value = '{$vin}'");
    	if (!empty($vehicle)) {
    		$url = get_permalink($vehicle[0]);
        	wp_redirect( $url );
        	exit; 
    	} else {
    		wp_redirect( home_url('/vehicles'));
    		exit;
    	}

    } 

    if ($stock != false) {
    	$vehicle = $wpdb->get_col("SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'stock' && meta_value = '{$stock}'");
    	if (!empty($vehicle)) {
    		$url = get_permalink($vehicle[0]);
        	wp_redirect( $url );
        	exit; 
    	} else {
    		wp_redirect( home_url('/vehicles'));
    		exit;
    	}
    }

}

add_action( 'template_redirect', 'cls_vin_number_redirect');