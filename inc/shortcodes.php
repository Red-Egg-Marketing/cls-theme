<?php

function cls_pull_cars_by_attr( $atts ) {

	$a = shortcode_atts( array(
        'body_style' => '',
        'limit' => -1
    ), $atts );
	$args = [
		'post_type' => ['vehicle'],
		'post_status' => 'publish',
		'posts_per_page' => $a['limit'],
		'orderby' => 'date',
		'order' => 'DESC',
		'tax_query' => [
			'relation' => 'AND',
			[
				'terms' => explode(',', $a['body_style']),
				'field' => 'name',
				'taxonomy' => 'body_style'
			]
		]
	];

	$html = '';

	$query = new WP_Query($args);

	if ($query->have_posts()) {
		$html .= '<div class="shortcode-wrap">';
		$html .= '<div class="grid">';
		while($query->have_posts()){
			$query->the_post();
			$id = get_the_ID();
			$html .= cls_vehicle_card($id);
		}
		wp_reset_postdata();
		$html .= '</div>';
		$html .= '</div>';
	} else {
		$html .= '<p>Sorry, no vehicles were found.';
	}

	return $html;
} 

add_shortcode( 'cls_vehicles_body_style', 'cls_pull_cars_by_attr' );


?>