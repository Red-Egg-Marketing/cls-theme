<?php

function cls_return_taxonomies($post_types) {

	$request = new WP_REST_Request('GET', '/wp/v2/types');
	$response = rest_do_request( $request );
	$server = rest_get_server();
	$taxes = $server->response_to_data( $response, false );
	$tax_array = [];
	$desired_taxes = ['car_year', 'make', 'body_style' , 'drivetrain', 'fuel_type'];
	$sort_order = ['Price', 'Miles', 'Year', 'Make', 'Body Style', 'Drivetrain', 'Fuel Type'];

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
					$tax_array[$singular_name][$term->name]['count'] = $term->count;
				}
				
			}
		}
	}
	$ordered_array = array_merge(array_flip($sort_order), $tax_array);

	return $ordered_array;
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
			$post->price = '$' . number_format(get_post_meta($id, 'selling_price', true), 0);
			$post->miles = number_format(get_post_meta($id, 'miles', true), 0) . ' mi';
			$year = get_the_terms($id, 'car_year');
			$year = join(', ', wp_list_pluck($year, 'name'));
			$post->year = $year;
			$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
			$thumbnail = $thumbnail == false ? get_stylesheet_directory_uri() . '/img/listing_vehicle_placeholder.jpg' : $thumbnail;
			$tiny_thumb = get_the_post_thumbnail_url($id, 'post-landscape-tiny') != false ? get_the_post_thumbnail_url($id, 'post-landscape-tiny') : get_the_post_thumbnail_url($id, 'thumbnail');
			$post->thumb = $tiny_thumb;
			$post->media_url = $thumbnail;
			$post_array['resources'][] = $post;
			
		}
		return $post_array;

	} else {
		return false;
	}
}

function cls_add_custom_query_vars( $vars ){
  $vars[] = "miles_min";
  $vars[] = "miles_max";
  $vars[] = "price_min";
  $vars[] = "price_max";
  $vars[] = "vin";
  $vars[] = "stock";
  return $vars;
}
add_filter( 'query_vars', 'cls_add_custom_query_vars' );


function cls_return_vehicles_transient() {
	$object = get_transient('_vehicles_transient');

	return json_decode($object);
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'cls/v2', '/vehicles_transient/', 
  	[
    	'methods' => 'POST, GET',
    	'callback' => 'cls_return_vehicles_transient',
    	'permission_callback' => '__return_true'
  	] 
  );
 });


function cls_return_vehicles() {
	$post_types = ['vehicle'];

	$post = $_POST;
	$get = $_GET;
	$make = isset($post['make']) ? explode(',', $post['make']) : false;
	$make = isset($get['make']) ? explode(',', $get['make']) : $make;
	$body = isset($post['body_style']) ? explode(',',$post['body_style']) : false;
	$body = isset($get['body_style']) ? explode(',',$get['body_style']) : $body;
	$drive = isset($post['drivetrain']) ? explode(',', $post['drivetrain']) : false;
	$drive = isset($get['drivetrain']) ? explode(',', $get['drivetrain']) : $drive;
	$fuel = isset($post['fuel_type']) ? explode(',',$post['fuel_type']) : false;
	$fuel = isset($get['fuel_type']) ? explode(',', $get['fuel_type']) : $fuel;
	$min_year = isset($post['year_min']) ? $post['year_min'] : false;
	$min_year = isset($get['year_min']) ? $get['year_min'] : $min_year;
	$max_year = isset($post['year_max']) ? $post['year_max'] : false;
	$max_year = isset($get['year_max']) ? $get['year_max'] : $max_year;
	$min_miles = isset($post['miles_min']) ? $post['miles_min'] : false;
	$min_miles = isset($get['miles_min']) ? $get['miles_min'] : $min_miles;
	$max_miles = isset($post['miles_max']) ? $post['miles_max'] : false;
	$max_miles = isset($get['miles_max']) ? $get['miles_max'] : $max_miles;
	$min_price = isset($post['price_min']) ? $post['price_min'] : false;
	$min_price = isset($get['price_min']) ? $get['price_min'] : $min_price;
	$max_price = isset($post['price_max']) ? $post['price_max'] : false;
	$max_price = isset($get['price_max']) ? $get['price_max'] : $max_price;
	$ppp = isset($post['ppp']) ? explode(',',$post['ppp']) : -1;
	$ppp = isset($get['ppp']) ? $get['ppp'] : $ppp;
	$year = isset($get['year']) ? $get['year'] : false;
	$year = isset($post['year']) ? $post['year'] : $year;
	$search = isset($post['search']) ? $post['search'] : false;
	$search = isset($get['search']) ? $get['search'] : $search;
	$order = isset($post['order']) ? $post['order'] : false;
	$order = isset($get['order']) ? $get['order'] : $order;

	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'posts_per_page' => $ppp,
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
		]
		// 'meta_key' => 'year',
		// 'meta_type' => 'NUMERIC',
		// 'order' => 'DESC'
	];
	$args_2 = false;

	if ($order) {
		$args['orderby'] = 'meta_value';
		
		if ($order == 'price') {
			$args['meta_key'] = 'selling_price';
			$args['meta_type'] = 'NUMERIC';
			$args['order'] = 'ASC';
		}
		if ($order == 'price-high') {
			$args['meta_key'] = 'selling_price';
			$args['meta_type'] = 'NUMERIC';
			$args['order'] = 'DESC';
		}
		if ($order == 'year') {
			$args['meta_key'] = 'year';
			$args['meta_type'] = 'NUMERIC';
			$args['order'] = 'ASC';
		}
		if ($order == 'year-high') {
			$args['meta_key'] = 'year';
			$args['meta_type'] = 'NUMERIC';
			$args['order'] = 'DESC';
		}
		if ($order == 'miles') {
			$args['meta_key'] = 'miles';
			$args['meta_type'] = 'NUMERIC';
			$args['order'] = 'ASC';
		}
		if ($order == 'miles-high') {
			$args['meta_key'] = 'miles';
			$args['meta_type'] = 'NUMERIC';
			$args['order'] = 'DESC';
		}
	
	}

	if ($search) {
		$args['s'] = $search;
		$args_2 = [
			'post_type' => $post_types,
			'post_status' => 'publish',
			'posts_per_page' => $ppp,
			'meta_query' => [
			 	'relation' => 'OR',
				[
					'key' => 'vin',
					'value' => $search,
					'compare' => '='
				],
				[
					'key' => 'stock',
					'value' => $search,
					'compare' => '='
				]
			]
		];
	
	}

	if ($make || $body || $drive || $fuel || $min_year || $max_year) {
		$args['tax_query'] = [
			'relation' => 'AND'
		];
	}

	if ($make){
		$args['tax_query'][] = 
			[
				'terms' => $make,
				'field' => 'slug',
				'taxonomy' => 'make',
			];
	}

	if ($body){
		$args['tax_query'][] =
			[
				'terms' => $body,
				'field' => 'slug',
				'taxonomy' => 'body_style',
			];
	}

	if ($drive){
		$args['tax_query'][] =
			[
				'terms' => $drive,
				'field' => 'slug',
				'taxonomy' => 'drivetrain',
			];
	}

	if ($fuel){
		$args['tax_query'][] =
			[
				'terms' => $fuel,
				'field' => 'slug',
				'taxonomy' => 'fuel_type',
			];
	}

	if ($year && $year != 'all') {
		$args['tax_query'][] = [
			[
				'terms' => $year,
				'field' => 'name',
				'taxonomy' => 'car_year'
			]
		];
	}

	if ($min_year || $max_year){
			
		if ($min_year && $max_year) {
			$years = range($min_year, $max_year);
		} elseif($min_year && !$max_year) {
			$current_year = date("Y");
			$years = range($min_year, $current_year);
		} elseif($max_year && !$min_year) {
			$years = range('1900', $max_year);
		}

		$args['tax_query'][] =
			[
				'terms' => $years,
				'field' => 'name',
				'taxonomy' => 'car_year',
			];
	}

	if (($min_miles || $max_miles) && ($min_price || $max_price)) {
		$args['meta_query'][] = [
			'relation' => 'AND'
		];
	}

	if ($min_miles || $max_miles) {
	
		if ($min_miles && $max_miles) {
			$miles_values = [intval($min_miles), intval($max_miles)];
			$compare = 'BETWEEN';	
		} elseif($min_miles && !$max_miles) {
			$miles_values = intval($min_miles);
			$compare = '>=';
		} elseif($max_miles && !$min_miles) {
			$miles_values = intval($max_miles);
			$compare = '<=';
		}

		$args['meta_query'][] = 
			[
				'key' => 'miles',
				'value' => $miles_values,
				'type' => 'numeric',
				'compare' => $compare
			];
	}

	if ($min_price || $max_price) {
	
		if ($min_price && $max_price) {
			$price_values = [intval($min_price), intval($max_price)];
			$compare = 'BETWEEN';	
		} elseif($min_price && !$max_price) {
			$price_values = intval($min_price);
			$compare = '>=';
		} elseif($max_price && !$min_price) {
			$price_values = intval($max_price);
			$compare = '<=';
		}

		$args['meta_query'][] = 
			[
				'key' => 'selling_price',
				'value' => $price_values,
				'type' => 'numeric',
				'compare' => $compare
			];

	}

	$query_1 = new WP_Query($args);
	$query = new WP_Query();

	if ($args_2 != false) {
		$query_2 = new WP_Query($args_2);
		$query->posts = array_merge($query_1->posts, $query_2->posts);
		$query->post_count = $query_1->post_count + $query_2->post_count;
	} else {
		$query->posts = $query_1->posts;
		$query->post_count = $query_1->post_count;
	}

	$taxes = cls_return_taxonomies($post_types);

	if ($query->have_posts()) {
		$result = $query->posts;

		$vehicles = cls_build_post_tax_array($result, $taxes);

		wp_reset_postdata();

		return [$vehicles, $taxes, 'empty' => false, $args];
	} else {
		$empty  = '<div class="warning">There are no available vehicles matching your filters. Please try something else.</div>';
		$error = new stdClass();
		$error->message = $empty;
		return [$error ,$taxes, 'empty' => true, $args];
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


function cls_return_reviews() {
	global $wpdb;
	$id = array_key_exists('post_id', $_POST) ? $_POST['post_id'] : false;

	if ($id) {
			$name = get_the_title($id);
			$full = $name;
			$name = explode(" ", $name);
			$length = sizeof($name);
			$first = $name[0];
			$last = $name[$length - 1];
			$middle = '';
			if ($length >= 3) {
				$middle = $name[$length - 2];
			} else if ($length < 3) {
				$middle = $last;
			}
			$name = $first . " " . $last;
			$first_middle = $first . " " . $middle;
			$results = $wpdb->get_results( 
			"
				SELECT *
				FROM {$wpdb->prefix}wpfb_reviews 
				WHERE review_text LIKE '%" . $name . "%' OR review_text LIKE '%" . $first_middle . "%'
			", OBJECT );


		return $results;
	} else {
		return false;
	}

}

add_action( 'rest_api_init', function () {
  register_rest_route( 'cls/v2', '/reviews/', 
  	[
    	'methods' => 'POST, GET',
    	'callback' => 'cls_return_reviews',
    	'permission_callback' => '__return_true'
  	] 
  );
 });

function cls_return_vin_numbers() {
	global $wpdb;
	$dealer_id = function_exists('get_field') ? get_field('dealer_id', 'options') : '';
	$address = function_exists('get_field') ? get_field('business_address', 'options') : '';
	$address2 = '';
	$city = function_exists('get_field') ? get_field('business_city', 'options') : '';
	$state = function_exists('get_field') ? get_field('business_state', 'options') : '';
	$zip = function_exists('get_field') ? get_field('business_zip', 'options') : '';
	$dealer = function_exists('get_field') ? get_field('business_name', 'options') : '';
	$phone = function_exists('get_field') ? str_replace(['(', ')', '-', ' '], '', get_field('business_phone', 'options')) : '';

	$results = $wpdb->get_results( 
			"
				SELECT meta_value, post_id
				FROM {$wpdb->prefix}postmeta
				WHERE meta_key = 'vin'
			", ARRAY_A );

	$return = '';
	$return_1 = "\"" .$dealer_id . "\"|\"" . $dealer . "\"|\"" . $address . "\"|\"" . $address2 . "\"|\"" . $city . "\"|\"" . $state . "\"|\"" . $zip . "\"|\"" . $phone . "\""; 

	foreach($results as $result) {
		$id = $result['post_id'];
		$vin = $result['meta_value'];
		$price = get_post_meta($id, 'selling_price', true);
		$return .= $vin . "|" . $dealer_id . "|" . $price . "\r\n";
	}

	return [$return_1, $return];

}

add_action( 'rest_api_init', function () {
  register_rest_route( 'cls/v2', '/vin/', 
  	[
    	'methods' => 'POST, GET',
    	'callback' => 'cls_return_vin_numbers',
    	'permission_callback' => '__return_true'
  	] 
  );
});
