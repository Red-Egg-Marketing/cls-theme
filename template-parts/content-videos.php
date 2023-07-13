<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Morgan_Rosel
 */

$id = get_the_id();

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
	<header class="entry-header">
		<div class="content-wrap">
			<div class="hero-block-content">
				<div class="hero-block-wrap">
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
					?>
				</div>
			</div><!-- .hero-block-content -->
		</div><!-- .content-wrap -->
	</header><!-- .entry-header -->
	<div class="featured-video">
		<?php cls_embed_video($id); ?>
	</div>
	<div class="post-content">
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

		wp_link_pages(
			array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'cls' ),
				'after'  => '</div>',
			)
		);
		?>
	</div><!-- .entry-content -->

	<?php 

		get_template_part( 'template-parts/footer-post');

	?>
	</div>
</article><!-- #post-<?php the_ID(); ?> -->
