<?php
/**
* Taxonomy template
 */
global $is_IE;
$author = get_queried_object();
$author_id = $author->ID;
$author_name = $author->data->display_name;

get_header();
?>

	<main id="primary" class="site-main">
	   <article id="taxonomy-<?= $term_id ?>" <?php post_class(); ?>>
           <div class="entry-content">
                <header class="entry-header">
                    <div class="wrapper">
                        <h1>Posts from: <?= $author_name; ?></h1> 
                    </div>
                </header>
                <div class="post-content">
                     <div class="resources-block">
                         <div class="resources-wrap">
                             <div id="PostsGrid" 
                                 class="resources-grid" 
                                 data-author="<?= $author_id; ?>"
                                 data-ie="<?= $is_IE; ?>"
                             >
                                <div class="block-wrapper">
                                    <?php 
                                        if ($is_IE) {
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
