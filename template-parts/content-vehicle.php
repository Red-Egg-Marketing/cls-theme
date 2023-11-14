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
$price = number_format(floatval($orig_price), 0);
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

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">

	<div class="post-content">
		<div class="col flex main-col">
			<header>
			<?php
				the_title( '<h1 class="header-title">', '</h1>' );
				echo '<h2 class="price" id="Price" data-price="' . $orig_price . '"> $' . $price . '</h2>';
			?>
			</header>
		<?php
			$attachments = get_posts(array(
			    'post_parent' => $id,
			    'post_type' => 'attachment',
			    'post_mime_type' => 'image',
			    'orderby' => 'date',
			    'order' => 'ASC',
			    'numberposts' => -1
			));

			if (!empty($attachments)) {
				?>
				<div class="vehicle-gallery">
				<div class="vehicle swiper">
					<div class="swiper-wrapper">
					<?
					foreach($attachments as $attachment) {
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
  						<?
						foreach($attachments as $attachment) {
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
		<?php
			
			$miles = number_format(floatval(get_post_meta($id, 'miles', true)), 0);
			$phone = get_field('business_phone', 'options');
			
		?>
			
			<div class="col car-details flex align-start">
				<div class="flex align-start width-100">
					<p class="attr miles"><? echo $miles; ?> mi</p>
					<p class="attr trim"><? echo $trim; ?></p>
					<?php if($engine || $displace) { ?>
						<p class="attr engine">
							<?php if ($engine) echo $engine . ' Cylinders, ';
							echo $displace 
							?>
						</p>
					<?php } ?>
					<p class="attr trans"><? echo $trans; ?></p>
					<p class="attr drive"><? echo $drive; ?></p>
					<p class="attr exterior">Exterior: <? echo $exterior; ?></p>
					<p class="attr interior">Interior: <? echo $interior; ?></p>
					<?php if($seats) { ?>
						<p class="attr seats"><? echo $seats; ?> Seats</p>
					<?php } ?>
					<p class="attr mpg"><? echo $city . ' City/' . $highway .' Highway MPG'; ?> </p>
				</div>
			</div>
			<div id="PaymentCalculator" class="loading">
			</div>
			<div class="col car-details">
				<a 
					class="wp-block-button__link wp-element-button" 
					href="javascript;" 
					data-src="#modal-form-<?= $modal_form  ?>" 
					data-fancybox>I'm Interested</a>
			</div>
			<div class="col car-details flex-end align-start flex">
				<p class="phone"><? echo $phone; ?></p>
			</div>
			
			<div class="tabs">
				<button data-id="Dealer-Notes" class="active">Vehicle Information</button>
				<button data-id="Features">Features</button>
				<button data-id="Disclaimer">Disclaimer</button>
			</div>

			<div class="col col-full tabs-children">

				<div class="tabcontent active" id="Dealer-Notes">
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
				</div>
				<div class="tabcontent" id="Features">
					<?php
						$cont = get_the_content($id);
						$content = htmlentities( wpautop($cont));
						echo html_entity_decode(wp_trim_words($content, 15));
					?>
				</div>
				<div class="tabcontent" id="Disclaimer">
					<p>Information provided is believed accurate but all specifications, pricing, and availability must be confirmed in writing (directly) with the dealer to be binding. We reserve the right to correct any errors or omissions prior to the final sale of the vehicle. Advertised price includes $225 Documentation Fee. Sales tax, finance charges, cost of emissions test, and other governmental fees or taxes are not included in the quoted price. Transportation costs incurred after the sale to deliver the vehicle to the purchaser at the purchaser's request are not included in the quoted price. RECALL NOTICE: Some vehicles offered for sale may be subject to unrepaired manufacturer safety recalls. To determine the recall status of a vehicle, visit <a href="https://www.nhtsa.gov/" target="_blank">https://www.nhtsa.gov/</a> recalls</p>
				</div>
			
			</div>
		</div>
		<div class="col col-full">
			<a 
				class="wp-block-button__link wp-element-button" 
				href="javascript;" 
				data-src="#modal-form-<?= $modal_form  ?>" 
				data-fancybox>I'm Interested</a>
		</div>
	</div><!-- .post-content -->
	<div class="related-posts light-blue">
		<?php
			cls_vehicle_footer($id, 'vehicle', $title = 'Related Inventory');
		?>
	</div>
	</div><!-- .entry-content -->
</article><!-- #post-<?php the_ID(); ?> -->
