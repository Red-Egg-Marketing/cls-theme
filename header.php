<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package cls
 */

$phone = get_field('business_phone', 'options');
$phone_tag = get_field('phone_tagline', 'options');
$modal_form = get_field('menu_form', 'options');
$global_button = get_field('global_estimate_button', 'options');
$override = get_field('override_menu', 'options');
$menu_class = $override == 'yes' ? ' override' : '';
$blurb = get_field('menu_blurb', 'options');
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'cls' ); ?></a>

	<header id="masthead" class="site-header<?php echo $menu_class; ?>">
		<nav class="secondary-navigation">
			<div class="wrapper">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'menu-2',
						'menu_id'        => 'secondary-menu',					
					)
				);
				?>
			</div><!-- .wrapper -->
		</nav><!-- #site-navigation -->
		<div class="main-content-nav">
		<div class="wrapper main-wrapper">
			<div class="site-branding">
				<?php
				the_custom_logo();
				if ( is_front_page() && is_home() ) :
					?>
					<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
					<?php
				else :
					?>
					<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
					<?php
				endif;
				?>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">
				<?php if($override == 'no' || !$override) { ?>
					<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'cls' ); ?></button>
				<?php

					wp_nav_menu(
						array(
							'theme_location' =>  'menu-1',
							'menu_id'        =>  'primary-menu',
							'container_class'	 =>	 'menu-primary-menu-container'		
						)
					);
	
				} elseif($override == 'yes') {
					echo '<p class="menu-blurb">' . $blurb . '</p>';
				}
				?>
			</nav><!-- #site-navigation -->

		</div><!-- .wrapper -->
		</div>
	</header><!-- #masthead -->
