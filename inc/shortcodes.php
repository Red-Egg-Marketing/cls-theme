<?php

function cls_pull_cars_by_attr( $atts ) {

	$a = shortcode_atts( array(
        'body_style' => '',
        'vehicle_make' => '',
        'type' => '',
        'limit' => -1
    ), $atts );

	$args = [
		'post_type' => ['vehicle'],
		'post_status' => 'publish',
		'posts_per_page' => $a['limit'],
		'meta_query' => [
			'relation' => 'AND',
			'year_clause' => [
				'key' => 'year',
				'compare' => 'EXISTS'
			],
			'make_clause' => [
				'key' => 'make',
				'compare' => 'EXISTS'
			],
			'model_clause' => [
				'key' => 'model',
				'compare' => 'EXISTS'
			],
		],
		'orderby' => [
			'make_clause' => 'ASC',
			'model_clause' => 'ASC',
			'year_clause' => 'DESC'
		],
		'tax_query' => [
			'relation' => 'AND'
		]
	];

	if ($a['body_style'] != '') {
		$args['tax_query'][] = [
			'terms' => explode(',', $a['body_style']),
			'field' => 'name',
			'taxonomy' => 'body_style'
		];
	}

	if ($a['vehicle_make'] != '') {
		$args['tax_query'][] = [
			'terms' => explode(',', $a['vehicle_make']),
			'field' => 'name',
			'taxonomy' => 'make'
		];
	}

	if ($a['type'] != '') {
		$args['tax_query'][] = [
			'terms' => explode(',', $a['type']),
			'field' => 'name',
			'taxonomy' => 'vehicle_type'
		];
	}

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