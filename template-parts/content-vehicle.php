<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package paint_denver
 */

$id = get_the_id();
$modal_form = get_field('menu_form', 'options');
$orig_price = get_post_meta($id, 'selling_price', true);
$city = get_post_meta($id, 'city_mpg', true);
$highway = get_post_meta($id, 'highway_mpg', true);
$seats = get_post_meta($id, 'seats', true);
$doc_fee = get_field('doc_fee', 'options');
$price = number_format(floatval($orig_price + $doc_fee), 0);
$orig_price = $orig_price + $doc_fee;
$year = get_the_terms($id, 'car_year');
$year = join(', ', wp_list_pluck($year, 'name'));
$interior = get_the_terms($id, 'interior_color');
$interior = join(', ', wp_list_pluck($interior, 'name'));
$exterior = get_the_terms($id, 'exterior_color');
$exterior = join(', ', wp_list_pluck($exterior, 'name'));
$engine = get_the_terms($id, 'engine_cylinder');
$engine = join(', ', wp_list_pluck($engine, 'name'));
$displace = get_the_terms($id, 'engine_displacement');
$displace = join(', ', wp_list_pluck($displace, 'name'));
$trans = get_the_terms($id, 'transmission');
$trans = join(', ', wp_list_pluck($trans, 'name'));
$drive = get_the_terms($id, 'drivetrain');
$drive = join(', ', wp_list_pluck($drive, 'name'));
$trim = get_the_terms($id, 'trim');
$trim = join(', ', wp_list_pluck($trim, 'name'));
$mechanical = get_post_meta($id, 'mechanical_and_powertrain', true);
$safety = get_post_meta($id, 'safety', true);
$feature_interior = get_post_meta($id, 'interior', true);
$feature_exterior = get_post_meta($id, 'exterior', true);
$vin = get_post_meta($id, 'vin', true);
$carfax_link = get_post_meta($id, 'carfax_link', true);
// $carfax_link = "https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=DVW_1&vin=" . $vin;
$carfax_img = get_stylesheet_directory_uri() . '/img/carfax.svg';
$miles = number_format(floatval(get_post_meta($id, 'miles', true)), 0);
$phone = get_field('business_phone', 'options');
$stock = get_post_meta($id, 'stock', true);
$type = has_term('new', 'car_type', $id);
$reviews = get_field('reviews_for_vehicles', 'options');
$credit_app = get_field('credit_app', 'options');
$doc_language = get_field('doc_language', 'options');

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">

	<div class="post-content">
		<div class="col flex main-col">
			<header>
			<?php
				echo '<h1 class="header-title">' . get_the_title() . '</h1>';
			?>
			</header>
		<?php

			$feat = get_post_thumbnail_id();
			$attachments = get_posts(array(
			    'post_parent' => $id,
			    'post_type' => 'attachment',
			    'post_mime_type' => 'image',
			    'meta_key' => 'image_order',
        		'orderby' => 'meta_value_num',
        		'order' => 'ASC',
			    'exclude' => $feat,
			    'numberposts' => -1
			));

			if (!empty($attachments || $feat != false)) {
				?>
				<div class="vehicle-gallery">
				<div class="vehicle swiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
								<?php
									echo wp_get_attachment_image($feat, 'post-landscape');
								?>
						</div>
					<?
					foreach($attachments as $key => $attachment) {
					?>

						<div class="swiper-slide">
						<?php
							echo wp_get_attachment_image($attachment->ID, 'post-landscape');
						?>
						</div>
					<?php
					}?>
					</div>
					<div class="swiper-button-prev"></div>
  					<div class="swiper-button-next"></div>
  				</div>
  				<!-- Gallery Thumbs -->
  				<div class="thumbnails swiper">
  					<div class="swiper-wrapper">
  						<div class="swiper-slide">
							<?php
								echo wp_get_attachment_image($feat, 'thumbnail');
							?>
						</div>
  						<?
						foreach($attachments as $key => $attachment) {
						?>
								<div class="swiper-slide">
								<?php
									echo wp_get_attachment_image($attachment->ID, 'thumbnail');
								?>
								</div>
							<?php
						}?>
					</div>
				</div>
  				</div>
  			<?php
			} else {
				?>
				<div class="vehicle-gallery">
					<div class="vehicle">
					<?php
					echo '<img src="' . get_stylesheet_directory_uri() . '/img/listing_vehicle_placeholder.jpg" />';
					?>
					</div>
				</div>
				<?php
			}
		?>
		</div>
		<div class="col flex second-col">
			<div class="col-full col align-start price-col flex">
				<?php echo '<h2 class="price" id="Price" data-price="' . $orig_price . '"><span>Total Price</span> $' . $price . '</h2>' ?>
				<p class="disclaimer-lang"><em><?php echo $doc_language; ?></em></p>
			</div>
			<div class="col col-full car-details cta-actions flex">
				<a 
					class="wp-block-button__link wp-element-button" 
					href="javascript;" 
					data-src="#modal-form-<?= $modal_form  ?>" 
					data-fancybox>I'm Interested</a>

					<a 
					class="wp-block-button__link wp-element-button" 
					href="javascript;" 
					data-src="#modal-form-<?= $modal_form  ?>" 
					data-fancybox>Schedule a Test Drive</a>
					<p class="phone"><a href="tel:<?php echo $phone; ?>"><? echo $phone; ?></a></p>
			</div>
			
			<div class="col car-details flex align-start">
				<div class="flex align-start width-100">
					<?php if ($miles) { ?>
						<p class="attr miles"><? echo $miles; ?> mi</p>
					<?php } ?>
					<?php if ($trim) { ?>
						<p class="attr trim"><? echo $trim; ?></p>
					<?php } ?>
					<?php if($engine || $displace) { ?>
						<p class="attr engine">
							<?php if ($engine) echo $engine . ' Cylinders, ';
							echo $displace;
							?>
						</p>
					<?php } ?>
					<?php if ($trans) { ?>
						<p class="attr trans"><? echo $trans; ?></p>
					<?php } ?>
					<?php if ($drive) { ?>
						<p class="attr drive"><? echo $drive; ?></p>
					<?php } ?>
					<?php if ($exterior) { ?>
						<p class="attr exterior">Exterior: <? echo $exterior; ?></p>
					<?php } ?>
					<?php if ($interior) { ?>
						<p class="attr interior">Interior: <? echo $interior; ?></p>
					<?php } ?>
					<?php if($seats) { ?>
						<p class="attr seats"><? echo $seats; ?> Seats</p>
					<?php } ?>
					<?php if ($city && $highway) { ?>
						<p class="attr mpg"><? echo $city . ' City/' . $highway .' Highway MPG'; ?> </p>
					<?php } ?>

					<?php if ($credit_app) { ?>
						<a 
						class="wp-block-button__link wp-element-button get-approved" 
						href="<?php echo $credit_app; ?>">Get Approved</a>
					<?php } ?>

					 <?php if ($carfax_link) { ?>
					 	 <a href="<?php echo $carfax_link; ?>" class="carfax_link" target="_blank"><img src="<?php echo $carfax_img; ?>" /></a>
					<?php } ?>
				</div>
			</div>
			<div id="PaymentCalculator" class="loading">
			</div>
			
			
			<div class="col-full col">
					<h5>Vehicle Information</h5>
					<div class="read-less-block">
					<?php
						$cont = get_the_content($id);
						$content = htmlentities( wpautop($cont));
						echo html_entity_decode(wp_trim_words($content, 35, '...<button class="read-more">Read More</button>'));
					?>
					</div>
					<div class="read-more-block hide">
						<?php
							the_content();
						?>
						<button class="read-less">Read Less</button>
					</div>
					<div class="more-info">
						<ul>
							<?php if($type == false) { ?>
								<li>VIN: <?php echo $vin; ?></li>
							<?php } ?>
							<li>Stock #: <?php echo $stock; ?></li>
						</ul>
					</div>
					<div class="buttons">
						<div class="cn-button-container" data-vin="<?php echo $vin; ?>" data-page-type="vdp" data-type="used"></div>
					</div>
			</div>

			
		</div>
		</div><!-- .post-content -->
		<?php
			
			if ($reviews) {
				$gblock = get_post( $reviews );
    			echo apply_filters( 'the_content', $gblock->post_content );
    		}
		?>
		<div class="post-content second-cont">
		<div class="col col-full">
			<?php if(is_array($mechanical) || is_array($safety) || is_array($feature_exterior) || is_array($feature_interior)) { ?>
			<h3 style="color: black;">Features</h3>
			<div class="tabs">
					<?php if (is_array($mechanical) && count($mechanical) > 0) { ?><button data-id="Mechanical" class="active">Mechanical</button><?php } ?>
					<?php if (is_array($safety) && count($safety) > 0) { ?><button data-id="Safety">Safety</button><?php } ?>
					<?php if (is_array($feature_exterior) && count($feature_exterior) > 0) { ?><button data-id="Exterior">Exterior</button><?php } ?>
					<?php if (is_array($feature_interior) && count($feature_interior) > 0) { ?><button data-id="Interior">Interior</button><?php } ?>
			</div>
			<?php } ?>
			<div class="col col-full tabs-children">

				<?php if(is_array($mechanical) && count($mechanical) > 0) { ?>
				<div class="tabcontent accordions active" id="Mechanical">
						<ul class="feature">
						<?php
							for($x = 0; $x < sizeof($mechanical); $x++) {
								$feat = $mechanical[$x];
								echo '<li>' . $feat . '</li>';
							}
						?>
						</ul>
				</div>
				<?php } ?>
				<?php if (is_array($safety) && count($safety) > 0) { ?>
				<div class="tabcontent accordions" id="Safety">
						<ul class="feature">
						<?php
							for($x = 0; $x < sizeof($safety); $x++) {
								$feat = $safety[$x];
								echo '<li>' . $feat . '</li>';
							}
						?>
						</ul>
				</div>
				<?php } ?>
				<?php if(is_array($feature_exterior) && count($feature_exterior)) { ?>
				<div class="tabcontent accordions" id="Exterior">
						<ul class="feature">
						<?php
							for($x = 0; $x < sizeof($feature_exterior); $x++) {
								$feat = $feature_exterior[$x];
								echo '<li>' . $feat . '</li>';
							}
						?>
						</ul>
				</div>
				<?php } ?>
				<?php if(is_array($feature_interior) && count($feature_interior)) { ?>
				<div class="tabcontent accordions" id="Interior">
						<ul class="feature">
						<?php
							foreach($feature_interior as $feat) {
								echo '<li>' . $feat . '</li>';
							}
						?>
						</ul>
				</div>
				<?php } ?>
			</div>
			
		</div>
		<div class="col col-full">
				<a 
					href="javascript;"
					style="margin-left: auto; margin-top: 20px; color: black;"
					data-src="#disclaimer-form" 
					data-fancybox>Disclaimer</a>
			</div>
			<div class="col col-full">
				<a 
					class="wp-block-button__link wp-element-button" 
					href="javascript;" 
					data-src="#modal-form-<?= $modal_form  ?>" 
					data-fancybox>I'm Interested</a>
			</div>
		</div>
	</div><!-- .post-content -->
	<div class="related-posts light-blue">
		<?php
			cls_vehicle_footer($id, 'vehicle', $title = 'Related Inventory');
		?>
	</div>
	</div><!-- .entry-content -->
</article><!-- #post-<?php the_ID(); ?> -->
