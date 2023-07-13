<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package cls
 */

$id = get_the_id();
$media_id = get_post_thumbnail_id($id);

$img_class = $media_id == 0 ? 'no-image' : '';

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
	<header class="entry-header <?= $img_class; ?>">

		<?php
			$class = cls_featured_image($id);
		?>

		<div class="content-wrap">
				<div class="hero-block-wrap">
		
				<?php
				if ( 'case-studies' === get_post_type() ) :
					?>
					<div class="entry-meta">
						Case Study
					</div><!-- .entry-meta -->
				<?php 
				

					if ( is_singular() ) :
						the_title( '<h1 class="header-title">', '</h1>' );
					else :
						the_title( '<h2 class="header-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
					endif;
				endif; 
				?>
				</div>
		</div><!-- .content-wrap -->
		
	</header><!-- .entry-header -->

	<div class="post-content">
		<div class="hero-block-content">
					<div class="hero-block-wrap">
					<?php
					if ( 'post' === get_post_type() ) :
						?>
						<div class="entry-meta">
							<?php
							cls_posted_on();
							?>
						</div><!-- .entry-meta -->
					<?php 

						if ( is_singular() ) :
							the_title( '<h1 class="header-title">', '</h1>' );
						else :
							the_title( '<h2 class="header-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
						endif;
					endif;
					?>
					</div>
				</div><!-- .hero-block-content -->
		<?php
		the_content(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'cls' ),
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

	</div><!-- .post-content -->
	<?php 
		if ( 'post' === get_post_type() ) :
			get_template_part( 'template-parts/footer-post');

		endif;

	?>
	</div>
</article><!-- #post-<?php the_ID(); ?> -->
