<?php
/**
* Taxonomy template
 */
global $is_IE;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // No direct access.
}

get_header();
?>

	<main id="primary" class="site-main">
	   <article  <?php post_class(); ?>>
           <div class="entry-content">
                <header class="entry-header">
                    <div class="wrapper">
                        <h1>Blog</h1> 
                    </div>
                </header>
                <div class="post-content">
                     <div class="resources-block">
                         <div class="resources-wrap">
                             <div id="PostsGrid" 
                                 class="resources-grid" 
                                 data-ie="<?= $is_IE; ?>"
                             >
                                <div class="block-wrapper">
                                    <?php 
                                        if ($is_IE == true) {
                                            echo cls_posts_pagination();
                                        }
                                    ?>
                                </div>
                             </div>
                         </div>
                     </div>
                </div><!-- .post-content -->
           </div><!-- .entry-content -->
       </article>
	</main><!-- #main -->

<?php
get_footer();
