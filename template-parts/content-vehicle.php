<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package paint_denver
 */

$id = get_the_id();

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">

	<div class="post-content">
		<div class="col flex">
		<?php
			the_title( '<h1 class="header-title">', '</h1>' );
			$attachments = get_attached_media('image', $id);

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
		<div class="col flex">
		<?php
			$price = number_format(get_post_meta($id, 'selling_price', true), 0);
			$year = get_the_terms($id, 'car_year');
			$year = join(', ', wp_list_pluck($year, 'name'));
			$miles = number_format(get_post_meta($id, 'miles', true), 0);
			$phone = get_field('business_phone', 'options');
			echo '<h2 class="price">$' . $price . '</h2>';
		?>
			<div class="col car-details">
				<a class="wp-block-button__link wp-element-button">I'm Interested</a>
				<p class="year"><? echo $year; ?></p>
				<p class="miles"><? echo $miles; ?> mi</p>
			</div>
			<div class="col car-details">
				<p class="phone"><? echo $phone; ?></p>
			</div>
			<div class="col col-full">
			<?php
			echo '<h4>Dealer Notes</h4>';
			the_content(
				sprintf(
					wp_kses(
						/* translators: %s: Name of current post. Only visible to screen readers */
						__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'paint-denver' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					wp_kses_post( get_the_title() )
				)
			);
			?>
			</div>
		</div>
		<div class="col col-full">
			<a class="wp-block-button__link wp-element-button">I'm Interested</a>
		</div>
	</div><!-- .post-content -->
	<div class="related-posts light-blue">
		<?php
			cls_vehicle_footer($id, 'vehicle', $title = 'Related Inventory');
		?>
	</div>
	</div><!-- .entry-content -->
</article><!-- #post-<?php the_ID(); ?> -->
