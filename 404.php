<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package cls
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

get_header();
?>

	<main id="primary" class="site-main">
		<article>

		<section class="error-404 not-found">
			<div class="entry-content">

			<div class="page-content">
				<div class="wp-block-cls-blocks-resources filter-resources">
					<div class="resources-block">
						<div class="block-wrapper">
							<header class="header triangles-grey"><div class="header-wrap">
									<h1 class="wp-block-heading">404: Nothing Found</h1>
									<p>Maybe try searching our inventory?</p>
							</div></header>
							<div class="resources-wrap" id="ResourcesWrap"></div>
						</div>
					</div>
				</div>

			</div><!-- .page-content -->
			</div><!-- .entry-content -->
		</section><!-- .error-404 -->
		</article>
	</main><!-- #main -->

<?php
get_footer();
