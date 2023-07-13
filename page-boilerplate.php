<?php
/**
* Template Name: Boilerplate (narrow width)
*
*/

get_header();
?>

	<main id="primary" class="site-main">
		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', 'page-boilerplate' );


		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
