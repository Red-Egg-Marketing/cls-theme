<?php
/**
* Taxonomy template
 */
global $is_IE;
$tax = get_queried_object();
$term_id = $tax->term_id;
$term_name = $tax->name;
$tax_name = $tax->taxonomy;
$tax_labels = get_taxonomy($tax_name)->labels->name;

get_header();

?>

	<main id="primary" class="site-main">
	   <article id="taxonomy-<?= $term_id ?>" <?php post_class(); ?>>
           <div class="entry-content">
                <header class="entry-header">
                    <div class="wrapper">
                        <h1><?= $term_name; ?> <?= $tax_labels; ?></h1> 
                    </div>
                </header>
                <div class="post-content">
                     <div class="resources-block">
                         <div class="resources-wrap">
                             <div id="PostsGrid" 
                                 class="resources-grid" 
                                 data-cust-tax="<?= $term_id; ?>"
                                 data-tax-name="<?= $tax_name; ?>"
                                 data-topic="<?= $tax_name; ?>"
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
