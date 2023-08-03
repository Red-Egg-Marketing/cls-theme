<?php

function cls_return_taxonomies($post_types) {

	$request = new WP_REST_Request('GET', '/wp/v2/types');
	$response = rest_do_request( $request );
	$server = rest_get_server();
	$taxes = $server->response_to_data( $response, false );
	$tax_array = [];
	$desired_taxes = ['car_year', 'make', 'body' , 'drivetrain', 'fuel_type'];
	$sort_order = ['Year', 'Make', 'Body Style', 'Drivetrain', 'Fuel Type'];

	foreach($post_types as $post_type) {
		$type = $taxes[$post_type];
		$type_tax = $type['taxonomies'];
		for ($x = 0; $x < sizeof($type_tax); $x++) {
			$tax = $type_tax[$x];
			if (!in_array($tax, $desired_taxes)) continue;
			if (!in_array($tax, $tax_array)) {
				$terms = get_terms([
					'taxonomy' => $tax,
					'hide_empty' => true
				]);
				$singular = get_object_taxonomies('vehicle', 'object');
				$singular_name = $singular[$tax]->labels->singular_name;
				foreach($terms as $term) {
					$tax_array[$singular_name][$term->name]['tax_name'] = $term->name;
					$tax_array[$singular_name][$term->name]['tax_id'] = $term->term_id;
					$tax_array[$singular_name][$term->name]['tax_slug'] = $term->slug;
					$tax_array[$singular_name][$term->name]['taxonomy'] = $term->taxonomy;
				}
				
			}
		}
	}

	return $tax_array;
}


function cls_build_post_tax_array($posts, $tax) {
	if (sizeof($tax) > 0) {
		$len = sizeof($tax);
		$post_array = [];
		$tax_array = [];

		foreach($posts as $post) {
			$id = $post->ID;
			
			$post->link = get_permalink($id);
			$post->post_excerpt = wp_trim_words($post->post_content, 25, '...');
			$post->taxonomies = [];
			$post_type = get_post_type($id);
			$post_label = get_post_type_object($post_type);
			$post_label = $post_label->labels->singular_name;
			$post->label = $post_label;
			$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
			$post->media_url = $thumbnail;

			// for ($x = 0; $x < $len; $x++) {
			// 	$c_tax = $tax[$x];
			// 	$post_taxes = get_the_terms($id, $c_tax);
				
			// 	if (!empty($post_taxes)) {

			// 		$singular = get_object_taxonomies($post_type, 'object');
			// 		$sing_label = $singular[$c_tax]->labels->singular_name;

			// 		foreach($post_taxes as $post_tax) {
			// 			$term_id = $post_tax->term_id;
			// 			$term_slug = $post_tax->slug;
			// 			$term_tax = $post_tax->taxonomy;
			// 			$term_name = $post_tax->name;
			// 			$tax_array[$sing_label][$term_name]['tax_name'] = $term_name;
			// 			$tax_array[$sing_label][$term_name]['tax_id'] = $term_id;
			// 			$tax_array[$sing_label][$term_name]['tax_slug'] = $term_slug;
			// 			$tax_array[$sing_label][$term_name]['taxonomy'] = $term_tax;
			// 			$post->taxonomies[$sing_label][] = [
			// 				'term_name' => $term_name,
			// 				'term_id' => $term_id,
			// 				'taxonomy' => $term_tax
			// 			];
			// 		}
			// 	}

			// }

			$post_array['resources'][] = $post;
			
		}
		return $post_array;

	} else {
		return false;
	}
}


function cls_return_vehicles() {
	$post_types = ['vehicle'];

	$post = $_POST;
	$make = isset($post['make']) ? $post['make'] : false;
	$body = isset($post['body']) ? $post['body'] : false;

	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'posts_per_page' => -1,
	];

	if ($make || $body) {
		$args['tax_query'] = [
			'relation' => 'AND'
		];
	}

	if ($make){
		$args['tax_query'][] = 
			[
				'terms' => $make,
				'field' => 'term_id',
				'taxonomy' => 'make',
			];
	}

	if ($body){
		$args['tax_query'][] =
			[
				'terms' => $body,
				'field' => 'term_id',
				'taxonomy' => 'body',
			];
	}

	$query = new WP_Query($args);

	$taxes = cls_return_taxonomies($post_types);

	if ($query->have_posts()) {
		$result = $query->posts;

		$vehicles = cls_build_post_tax_array($result, $taxes);

		wp_reset_postdata();

		return [$vehicles, $taxes];
	} else {
		$empty  = '<div class="warning">There are no available vehicles matching your filters. Please try something else.</div>';
		return [$empty ,$taxes];
	}

}


add_action( 'rest_api_init', function () {
  register_rest_route( 'cls/v2', '/vehicles/', 
  	[
    	'methods' => 'POST, GET',
    	'callback' => 'cls_return_vehicles',
    	'permission_callback' => '__return_true'
  	] 
  );
 });


function cls_return_posts($data) {

	$get = $_GET;
	$post_types = [];
	$cats = isset($get['category']) ? explode(',', $get['category']) : false;
	$tags = isset($get['tag']) ? $get['tag'] : false;
	$html = isset($get['html']) ? $get['html'] : false;
	$author = isset($get['author']) ? $get['author'] : false;
	$offset = isset($get['offset']) ? $get['offset'] : 0;
	$custom_tax = isset($get['custom_tax']) ? explode(',', $get['custom_tax']) : false;
	$tax_type = isset($get['tax_name']) ? $get['tax_name'] : false;
	$posts_per_page = isset($get['ppp']) ? $get['ppp'] : 3;
	if ($cats != false || $tags != false || $author != false) {
		$post_types[] = 'post';
	}

	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'posts_per_page' => $posts_per_page,
		'offset'	=> $offset
	];

	if ($cats != false) {
		$args['cat'] = $cats;
	}

	if ($tags != false) {
		$args['tag_id'] = $tags;
	}

	if ($author != false) {
		$args['author'] = $author;
	}

	if ($custom_tax != false && $tax_type != false) {
		$args['tax_query'] = [
			'relation' => 'AND',
			[
				'taxonomy' => $tax_type,
				'field' => 'term_id',
				'terms' => $custom_tax
			]
		];
	}

	$posts = $html == false ? [] : '';
	$query = new WP_Query($args);

	if ($query->have_posts()) {
		while($query->have_posts()) {
			$query->the_post();
			$id = get_the_ID();
			if ($html == false) {
				$post = $query->post;
				$postObj = new stdClass;
				$postObj->ID = $id;
				$postObj->title = $post->post_title;
				$postObj->excerpt = wp_trim_words($post->post_content, 25, '...');
				$postObj->link = get_the_permalink($id);
				$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
				$postObj->featured_image = $thumbnail;
				$posts[] = $postObj;
			} elseif($html == true) {
				$posts .= cls_resource_card($id);
			}
		}

		wp_reset_postdata();

	}
	return $posts;
}



add_action( 'rest_api_init', function () {
  register_rest_route( 'cls/v2', '/posts/', 
  	[
    	'methods' => 'GET',
    	'callback' => 'cls_return_posts',
    	'permission_callback' => '__return_true'
  	] 
  );
 });

function cls_case_study_card($id) {
		$permalink = get_the_permalink($id);
		$title = get_the_title($id);
		$excerpt = get_the_excerpt($id);
		$image = get_the_post_thumbnail($id,'post-landscape');

		$html = '<div class="image-col column">';
			$html .= $image;
		$html .= '</div>';
		$html .= '<div class="content-columns column">';
			$html .= '<h3>' . $title . '</h3>';
			$html .= '<p>' . $excerpt . '</p>';
			$html .= '<div class="wp-buttons">';
				$html .= '<a href="' . $permalink . '" class="wp-block-button__link">Read More</a>';
			$html .= '</div>';
		$hthl = '</div>';

		return $html;
}

function cls_resource_card($id, $cats = false) {
	if ($id != null) {
		$permalink = get_the_permalink($id);
		$title = get_the_title($id);
		$excerpt = get_the_excerpt($id);
		// $terms = $cats == true ? cls_posts_topics_list($id, 'category') : cls_posts_post_type($id);
		$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');

		$html = '<div class="resource-card">';
			$html .= '<div class="resource-extra">';
				$html .= '<a href="' . $permalink . '">';
				$html .= '<div class="cont-wrap">';
				if ($thumbnail != '') {
					$html .= '<div class="image-cont">';
						$html .= '<picture>';
							// $html .= '<source type="image/webp" srcset="' . $thumbnail . '.webp">';
							$html .= '<img class="resource-img" src="' . $thumbnail . '" />';
						$html .= '</picture>';
					$html .= '</div>';
				}
				$html .= '<h4 class="resource-title">' . $title . '</h4>';
				// $html .= '<p class="resource-excerpt">' . $excerpt . '</p>';
				$html .= '</div>';
				$html .= '<div class="wp-buttons">';
					$html .= '<button class="wp-button">Read More</button>';
					$html .= '</div>';
				$html .= '</a>';
			$html .= '</div>';
		$html .= '</div>';

		return $html;
	}
}


function cls_return_case_studies($data) {

	$get = $_GET;
	$post_types = [];
	$industry = isset($get['industry']) ? explode(',', $get['industry']) : false;
	$post_id = isset($get['id']) ? $get['id'] : false;
	$html = isset($get['html']) ? $get['html'] : false;
	$offset = isset($get['offset']) ? $get['offset'] : 0;
	$posts_per_page = isset($get['ppp']) ? $get['ppp'] : -1;
	$post_types = 'case-studies';
		
	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'posts_per_page' => $posts_per_page,
		'offset'	=> $offset
	];

	if ($post_id != false){
		$args['p'] = $post_id;
	}

	if ($industry != false) {
		$args['tax_query'] = [
			[
				'taxonomy' 	=> 'industry',
				'field'			=> 'id',
				'terms'			=> $industry,
			]
		];
	}

	$posts = $html == false ? [] : '';
	$query = new WP_Query($args);

	if ($query->have_posts()) {
		while($query->have_posts()) {
			$query->the_post();
			$id = get_the_ID();
			if ($html == false) {
				$post = $query->post;
				$postObj = new stdClass;
				$postObj->ID = $id;
				$postObj->title = $post->post_title;
				$postObj->excerpt = wp_trim_words($post->post_content, 25, '...');
				$postObj->link = get_the_permalink($id);
				$post_type = get_post_type_object($post_types);
				$postObj->label = $post_type->labels->singular_name;
				$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
				$postObj->featured_image = $thumbnail;
				$posts[] = $postObj;
			} elseif($html == 'cards') {
				$posts .= cls_resource_card($id, false);
			} elseif($html == true && $html != 'cards') {
				$posts .= cls_case_study_card($id);
			} 
		}

		wp_reset_postdata();

	}
	return $posts;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'cls/v2', '/case-studies/', 
  	[
    	'methods' => 'GET',
    	'callback' => 'cls_return_case_studies',
    	'permission_callback' => '__return_true'
  	] 
  );
 });