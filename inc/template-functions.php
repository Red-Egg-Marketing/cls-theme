<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package cls
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function cls_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'cls_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function cls_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'cls_pingback_header' );


function cls_featured_image(int $id) {
	if ($id != 0) {
		$img = get_the_post_thumbnail($id, 'post-landscape-large');
		$media_id = get_post_thumbnail_id($id);
		$src = wp_get_attachment_image_src($media_id, 'post-landscape-large');
		$class= 'no-image';

		if (is_array($src)) {
			$width = $src[1];
			$class = $width < 1920 ? 'small-image' : 'large-image';
			if ($width == 0) {
				$class = 'no-image';
			}

			if ($img != '') {
				?>
				<div class="post-thumbnail <?= $class; ?>">
					<?= $img; ?>
				</div>
				<?php
			}
		}

		return $class;
	}
}

function cls_post_whitepaper_thumbnail(int $id) {
	if ($id != 0) {
		$img = get_the_post_thumbnail($id, 'whitepaper-poster');
		if ($img != '') {
			?>
			<div class="post-thumbnail">
				<div class="thumbnail-wrap">
					<?= $img; ?>
				</div>
			</div>
			<?php
		}
	}
}

function cls_posts_post_type(int $id) {
	$post_type = get_post_type($id);
	$post_type = get_post_type_object($post_type);

	if (is_object($post_type)) {

		$html = '<ul class="tax-links">';
			$html .= '<li class="tax-item">' . $post_type->labels->singular_name . '</li>';
		$html .= '</ul>';

		return $html;
	}
}

function cls_posts_topics_list(int $id, string $tax = 'category') {
	$topics = get_the_terms($id, $tax);

	if (!empty($topics) && ($topics instanceof WP_Error) == false) {
			$del = ',&nbsp;';
			$size = sizeof($topics);
			$html = '<ul class="tax-links">';

			foreach($topics as $key => $topic) {
				$t_id = $topic->term_id;
				$t_name = $topic->name;
				$del = $key != ($size - 1) ? $del : ''; 
				// $t_link = get_term_link($t_id, $tax);
				$html .= '<li class="tax-item">' . $t_name . $del . '</li>';
			}
			$html .= '</ul>';
			return $html;
	} 
}


function cls_posts_topics(int $id, string $tax = 'category', $label = '') {
	$topics = get_the_terms($id, $tax);

	$head_label = $label == '' ? $tax . ' Tagged' : $label;

	if (!empty($topics) && ($topics instanceof WP_Error) == false) {
	?>
		<h3 class="footer-header"><?= $head_label; ?></h3>
		<ul class="tax-links link-buttons">
		<?php
			foreach($topics as $topic) {
				$t_id = $topic->term_id;
				$t_name = $topic->name;
				$t_link = get_term_link($t_id, $tax);
				?>
					<li class="tax-link"><a href="<?= $t_link; ?>"><?= $t_name; ?></a></li>
				<?php
			}
		?>
		</ul>
	<?php
	}
}

function cls_subscribe_custom_html(int $id = 1) {
	if (function_exists('gravity_form')) {
		$form = gravity_form($id, false, true, null, null, false, 55, false);

		echo $form;

	}
}


function cls_post_form(int $id = 2) {
	if (function_exists('gravity_form')) {
		$form = gravity_form($id, true, false, null, null, true, 48, false);

		return $form;

	}
}


function cls_check_cookie() {
	?>

	<div class="form-wrapper-load">
		...Loading
	</div>
	<?php
}


function cls_get_asset($id) {
	$asset = get_field('asset_download', $id);

	$html = '<div class="form-wrapper">';
	$html .= '<div class="wp-buttons">';
	$html .= '<a href="' . $asset['url'] . '" download>Download Whitepaper</a>';
	$html .= '</div>';
	$html .= '</div>';

	echo $html;
}


function cls_cookie_pick() {
	$page_id = $_GET['page_id'];
	$form_cookie = $_COOKIE['whitepaper-cookie-' . $page_id];
 	$html = '';

 	if ($form_cookie == true) {
 		// get the asset
 		$asset = get_field('asset_download', $page_id);
 		$html .= '<div class="wp-buttons">';
 		$html .= '<a href="' . $asset['url'] . '" download>Download Whitepaper</a>';
 		$html .= '</div>';

 	} else {
 		$form = cls_post_form();
 		$html .= $form;
 	}

 	echo $html;
 	wp_die();
}

add_action( 'wp_ajax_nopriv_cls_cookie_pick', 'cls_cookie_pick' );
add_action( 'wp_ajax_cls_cookie_pick', 'cls_cookie_pick' );

function cls_posts_pagination() {

	$post_types = ['post'];

	$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'paged' => $paged,
		'posts_per_page' => 12,
	];

	if (is_archive()) {
		$object_id = get_queried_object_id();


		$args ['tax_query'] = [
			'relation' => 'OR',
			[
				'taxonomy' => 'category',
				'field' => 'term_id',
				'terms' => $object_id
			],
			[
				'taxonomy' => 'project_category',
				'field' => 'term_id',
				'terms' => $object_id
			]
		];
	}

	$html = '';
	$query = new WP_Query($args);

	if ($query->have_posts()) {
		while($query->have_posts()) {
			$query->the_post();
			$id = get_the_ID();
			$permalink = get_the_permalink();
			$title = get_the_title();
			$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
			$excerpt = get_the_excerpt();
			$post_type = $post_type->labels->singular_name;
			$post_type = $post_type == 'post' ? 'insights' : $post_type;
			$cta = strtolower($post_type) == 'videos' ? 'Watch Video' : 'Read More';
			
				$html .= '<div class="resource-card">';
					$html .= '<div class="resource-extra">';
						$html .= '<a class="resource-wrap" href="' . $permalink . '">';
							$html .= '<div class="cont-wrap">';
							if ($thumbnail != '') {
							$html .= '<div class="image-cont">';
								$html .= '<img class="resource-img" src="' . $thumbnail . '" />';
							$html .= '</div>';
							}
							$html .= '<div class="content">';
								$html .=  '<h3 class="resource-title">' . $title . '</h3>';
								if ($excerpt != '') { 
									$html .= '<p class="resource-excerpt">' . $excerpt . '</p>';
								}
							$html .= '</div>';
							$html .= '<button class="wp-button">' . $cta . '</button>';
							$html .= '</div>';
						$html .= '</a>';
					$html .= '</div>';
				$html .= '</div>';
				
		}
	}

	$html .= '<div class="pagination">';
	$html .= paginate_links(array(  'total' => $query->max_num_pages, 
                'base'      => add_query_arg('paged','%#%'),
                'format'    => '?paged=%#%',
                'current'   => max(1, get_query_var('paged'))
            ));
	$html .= '</div>';

	wp_reset_postdata();

	return $html;
}

function cls_vehicle_footer(int $id, $post_type = 'vehicle', $head_title = 'Inventory') {
	$post_types = [$post_type];
	$t = [];
	$taxes = ['make', 'model', 'body'];
	$make = get_the_terms($id, 'make');
	$model = get_the_terms($id, 'model');

	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'posts_per_page' => 15,
		'post__not_in' => [$id]
	];
	$x = 0;
	// build terms array of ids
	foreach($taxes as $tax) {
		// $c[] = $m->term_id;
		$terms = get_the_terms($id, $tax);
		if (!empty($terms) && !is_object($terms)) {
			if ($x == 0) $args['tax_query'] = [
				'relation' => 'OR'
			];
			foreach($terms as $term) {
				$args['tax_query'][] = [
					'taxonomy' => $tax,
					'field' => 'term_id',
					'terms' => $term->term_id
				];
			}
			$x++;
		}
	}

	$query = new WP_Query($args);
			if ($query->have_posts()) {
			?>
			<div class="resources-block light-blue">
				<header class="header">
					<h2><?= $head_title; ?></h2>
				</header>
				<div class="related-vehicle swiper">
				<div class="swiper-wrapper">
				<?php
				while($query->have_posts()) {
					$query->the_post();
					$id = get_the_ID();
					$permalink = get_the_permalink();
					$title = get_the_title();
					$year = get_the_terms($id, 'car_year');
					$year = join(', ', wp_list_pluck($year, 'name'));
					$miles = number_format(get_post_meta($id, 'miles', true), 0) . ' mi';
					$price = '$' . number_format(get_post_meta($id, 'selling_price', true), 0);
					$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
					$thumbnail = $thumbnail == false ? get_stylesheet_directory_uri() . '/img/listing_vehicle_placeholder.jpg' : $thumbnail;

					?>
						<div class="resource-card swiper-slide">
							<div class="resource-extra">
								<a class="resource-wrap" href="<?= $permalink ?>">
									<div class="cont-wrap">
										<?php if ($thumbnail != '') { ?>
										<div class="image-cont">
											<img class="resource-img" src="<?= $thumbnail ?>" />
										</div>
										<?php } ?>
										<div class="content">
											<div class="top">
												<h4 class="resource-title"><?= $title; ?></h4>
												<p class="resource-year"><?= $year; ?></p>
											</div>
											<div class="bottom">
												<p class="resource-miles"><?= $miles; ?></p>
												<p class="resource-price"><?= $price; ?></p>
											</div>
										</div>
									</div>
								</a>
							</div>
						</div>
					<?php
				}
				wp_reset_postdata();
			?>
				</div><!-- .swiper-wrapper -->
				<div class="swiper-button-prev"></div>
  				<div class="swiper-button-next"></div>
				</div>
				
			</div><!-- .resources-grid -->
			<?php
			}
}

function cls_posts_footer(int $id, $post_type = 'post') {
	$post_types = [$post_type];
	$t = [];
	$cats = get_the_terms($id, 'category');
	$c = [];

	// build cats array of ids
	if (!empty($cats)) {
		foreach($cats as $cat) {
			$c[] = $cat->term_id;
		}
	}

	$args = [
		'post_type' => $post_types,
		'post_status' => 'publish',
		'posts_per_page' => 3,
		'post__not_in' => [$id],
		'tax_query' => [
			'relation' => 'OR',
			[
				'taxonomy' => 'category',
				'field' => 'term_id',
				'terms' => $c
			],
		]
	];

	$query = new WP_Query($args);
			if ($query->have_posts()) {
			?>
			<div class="resources-grid resources-block light-grey">
				<header class="header">
					<h2 class="header-title"><background class="bg-gradient">Related Content</background></h2>
				</header>
				<div class="block-wrapper">
				<?php
				while($query->have_posts()) {
					$query->the_post();
					$id = get_the_ID();
					$permalink = get_the_permalink();
					$title = get_the_title();
					$thumbnail = get_the_post_thumbnail_url($id, 'post-landscape') != false ? get_the_post_thumbnail_url($id, 'post-landscape') : get_the_post_thumbnail_url($id, 'thumbnail');
					$excerpt = get_the_excerpt();
					$typeClass = '';
					$cta = 'Read More';
					?>
						<div class="resource-card <?= $typeClass; ?>">
							<div class="resource-extra">
								<a class="resource-wrap" href="<?= $permalink ?>">
									<div class="cont-wrap">
										<?php if ($thumbnail != '') { ?>
										<div class="image-cont">
											<img class="resource-img" src="<?= $thumbnail ?>" />
										</div>
										<?php } ?>
										<div class="content">
											<h3 class="resource-title"><?= $title; ?></h3>
											<?php if ($excerpt != '') { ?>
											<?php } ?>
										</div>
									</div>
									<button class="wp-button"><?= $cta; ?></button>
								</a>
							</div>
						</div>
					<?php
				}
				wp_reset_postdata();
			} ?>
				</div><!-- .block-wrapper -->
			</div><!-- .resources-grid -->
	<?php
}


function cls_embed_video(int $id) {
	if (function_exists('get_field')) {
		$video = get_field('featured_video', $id);

		$html = wp_oembed_get($video);

		echo $html;
	}
}

add_filter( 'oembed_dataparse', 'custom_oembed_url', 10, 3 );

function custom_oembed_url( $html, $data, $url ) {
	if ($data->type == 'video') {
		// youtube provider
		if ($data->provider_name == 'YouTube') {
			// $toAppend = '?enablejsapi=1&modestbranding=1&controls=0';

			$html = preg_replace('/(src)="*"\s/', 'src=', $html);
			preg_match('/(src)="*"\s/', $html, $match);
			$html = str_replace('feature=oembed', 'feature=oembed&controls=0&modestbranding=0&enablejsapi=1', $html);

			return '<div class="responsive-video video-cont">' . $html . '</div>';
		}
	}
}



function cls_post_video(int $id) {
	if (function_exists('get_field')) {
		$video = get_field('featured_video', $id);
		$vid_src = $video['url'];
		$width = $video['width'];
		$height = $video['height'];
		$poster = $video['sizes']['medium_large'];

		if ($vid_src != '' && is_array($video)) {
		?>
			<div class="video-cont">
				<video
					width="<?= $width; ?>"
					height="<?= $height; ?>"
					poster="<?= $poster; ?>"
				>
					  <source src="<?= $vid_src; ?>" type="video/mp4">
				</video>
				<button class="play">Play</button>
				<script type="text/javascript">
					(function(){
						function CustomVideoControls() {
							var bttn = document.querySelector('.video-cont button.play');
		
							if (bttn != null) {
								var vid = bttn.previousElementSibling;
								var par = bttn.parentNode;

								bttn.addEventListener('click', customPlay);
								vid.addEventListener('pause', customPause);
							}

							function customPause() {
								
								let seek = vid.seeking;
			
								if (seek == false) {
									par.classList.remove('playing');
									vid.setAttribute('controls', false);
									vid.controls = false;
								}
			
							}

							function customPlay() {
								par.classList.add('playing');
								vid.setAttribute('controls', true);
								vid.controls = true;
								vid.play();
							}

						}

						CustomVideoControls();
					})();
				</script>
			</div>

		<?php
		}
	}
}

function cls_new_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'cls_new_excerpt_more');


function cls_excerpt_length( $length ) {
    return 24;
}
add_filter( 'excerpt_length', 'cls_excerpt_length', 999 );

?>