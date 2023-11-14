<?php

namespace GSTEAM;

/**
 * GS Team - Layout Filter Two
 * @author GS Plugins <hello@gsplugins.com>
 * 
 * This template can be overridden by copying it to yourtheme/gs-team/gs-team-layout-filter-2.php
 * 
 * @package GS_Team/Templates
 * @version 1.0.4
 */

global $gs_team_loop;

?>

<!-- Container for Team members -->
<div class="gs-containeer cbp-so-scroller">

	<!-- Cat Filters Template -->
	<?php include Template_Loader::locate_template( 'partials/gs-team-layout-cat-filters.php' ); ?>

	<?php if ( $gs_team_loop->have_posts() ): ?>

		<?php do_action( 'gs_team_before_team_members' ); ?>

		<div class="gs-all-items-filter-wrapper gs-roow">

			<?php while ( $gs_team_loop->have_posts() ): $gs_team_loop->the_post();
				
				$designation = get_post_meta( get_the_id(), '_gs_des', true );
				if ( empty($designation) ) $designation = '';

				$designation_slug = sanitize_title( $designation );

				$classes = [
					'gs-filter-single-item single-member-div',
					$designation_slug,
					get_col_classes( $gs_team_cols, $gs_team_cols_tablet, $gs_team_cols_mobile_portrait, $gs_team_cols_mobile ),
					get_member_terms_slugs( 'team_group' ),
					get_member_terms_slugs( 'team_location' ),
					get_member_terms_slugs( 'team_language' ),
					get_member_terms_slugs( 'team_gender' ),
					get_member_terms_slugs( 'team_specialty' )
				];

				if ( $gs_member_link_type == 'popup' ) $classes[] = 'single-member-pop';
				if ( $enable_scroll_animation == 'on' ) $classes[] = 'cbp-so-section';

			?>

			<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>" data-category="<?php echo get_member_terms_slugs( 'team_group' ); ?>">
				
				<!-- Sehema & Single member wrapper -->
				<div class="single-member--wrapper" itemscope itemtype="http://schema.org/Organization">
					<div class="single-member ccbp-so-side ccbp-so-side-left">

						<!-- Content -->
						<?php

						if ( $gs_member_name_is_linked == 'on' ) {
							if ( $gs_member_link_type == 'single_page' ) {
								printf( '<a href="%s">', get_the_permalink() );
							} else if ( $gs_member_link_type == 'popup' ) {
								printf( '<a class="gs_team_pop open-popup-link" data-mfp-src="#gs_team_popup_%s_%s" href="javascript:void(0)">', get_the_ID(), $id );
							}
						}

							do_action( 'gs_team_before_member_content', $gs_team_theme ); ?>

							<!-- Ribbon -->
							<?php include Template_Loader::locate_template( 'partials/gs-team-layout-ribon.php' ); ?>
							
							<!-- Team Image -->
							<div class="gs_team_image__wrapper">
								<?php member_thumbnail( $gs_member_thumbnail_sizes, true ); ?>
							</div>
							<?php do_action( 'gs_team_after_member_thumbnail' ); ?>
							
							<!-- Indicator -->
							<?php if ( $gs_member_name_is_linked == 'on' ) : ?>
								<div class="gs_team_overlay"><i class="fa fa-external-link"></i></div>
							<?php endif; ?>

							<div class="single-member-name-desig cbp-so-side cbp-so-side-right">

								<!-- Single member name -->
								<?php if ( 'on' ==  $gs_member_name ): ?>
									<?php member_name( $id, true, false ); ?>
									<?php do_action( 'gs_team_after_member_name' ); ?>
								<?php endif; ?>
								
						

							</div>

							<?php do_action( 'gs_team_after_member_content' ); ?>

						<?php if ( $gs_member_name_is_linked == 'on' ) echo '</a>'; ?>
						
						<!-- Popup -->
						<?php $_popup_enabled = true; ?>
						<?php include Template_Loader::locate_template( 'popups/gs-team-layout-popup.php' ); ?>
					
					</div>
				</div>

			</div>

			<?php endwhile; ?>

		</div>

		<?php do_action( 'gs_team_after_team_members' ); ?>
		
	<?php else: ?>

		<div class="gs-roow clearfix gs_team">

			<!-- Members not found - Load no-team-member template -->
			<?php include Template_Loader::locate_template( 'partials/gs-team-layout-no-team-member.php' ); ?>

		</div>

	<?php endif; ?>

	<!-- Pagination -->
	<?php if ( 'on' == $gs_member_pagination ) : ?>
		<?php include Template_Loader::locate_template( 'partials/gs-team-layout-pagination.php' ); ?>
	<?php endif; ?>

</div>