<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package cls
 */
if (function_exists('get_field')) {
    
    $company_settings = [
        'phone'         => get_field('business_phone', 'options'),
        'email'         => get_field('business_email', 'options'),
        'street'        => get_field('business_street', 'options'),
        'city'          => get_field('business_city', 'options'),
        'zip'           => get_field('business_zip', 'options'),
        'state'         => get_field('business_state', 'options'),
        'areas'         => get_permalink(get_field('areas_served', 'options')),
        'icons'         => get_field('icons', 'options'),
        'disclaimer'    => get_field('disclaimer', 'options'),
        'logo'          => get_field('footer_logo', 'options')
    ];

?>

    <footer id="colophon" class="site-footer">
        <div class="site-info">
            <div class="wrapper">
                <div class="col">
                    <address>
                        <p style="margin-bottom: 10px">
                            <?= $company_settings['street'] . ', ' . $company_settings['city'] . ', ' . $company_settings['state'] . ' ' . $company_settings['zip'] ?><br />
                        </p>
                        <p>
                            <a href="tel:<?= $company_settings['phone']; ?>" class="contact-link"><?= $company_settings['phone'] ?></a><br />
                        </p>
                    </address>
                     <ul class="social">
                        <?php
                        if (is_array($company_settings['icons']) && sizeof($company_settings['icons']) > 0) {
                            foreach($company_settings['icons'] as $icon) {
                                $src = $icon['social']['link'];
                                $class = $icon['social']['icon_class'];
                                ?>
                                    <li><a href="<?= $src; ?>" class="fa-brands fa-<?= $class; ?>" target="_blank"></a></li>
                                <?php
                            }
                        }
                        ?>
                    </ul>
                </div>
                <div class="col">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="footer-home">
                        <img src="<?= $company_settings['logo']; ?>" alt="<?php bloginfo( 'name' ); ?>" />
                    </a>    
                </div>
                <div class="col">
                    <?php
                    wp_nav_menu(
                        array(
                            'theme_location' => 'menu-13',
                            'menu_id'        => 'footer-menu-2',
                        )
                    );
                    ?>
                </div>
            </div>
            <div class="footer-menu">
                <p>
                       Copyright &copy;<?php echo date("Y"); ?> Members Auto Center powered by Centennial Leasing & Sales
                </p> 
                <?php
                    wp_nav_menu(
                        array(
                            'theme_location' => 'menu-12',
                            'menu_id'        => 'footer-menu',
                            'container'      => ''
                        )
                    );
                ?>
            </div>
        </div><!-- .site-info -->
    </footer><!-- #colophon -->
</div><!-- #page -->

<?php 

} // end if

 if (function_exists('get_field') && (is_singular('gs_team') || is_singular('vehicle'))) {
        $modal_form = get_field('menu_form', 'options');
        if ($modal_form != 0) {
        ?>
        <div style="display: none;">
            <div 
                id="modal-form-<?= $modal_form ?>"
            >
                <div class="wrapper">
                    <h2 class="header-title">Contact Us</h2>
                    <?php echo do_shortcode('[gravityform id="' . $modal_form . '" title="false" description="false" ajax="true"]'); ?>
                </div>
            </div>
        </div>

        <!-- disclaimer -->
        <?php
        }
        ?>
        <div style="display: none;">
            <div 
                id="disclaimer-form"
            >
                <div class="wrapper">
                    <h2 class="header-title">Disclaimer</h2>
                    <?php echo $company_settings['disclaimer']; ?>
                </div>
            </div>
        </div>
        <?php
}
wp_footer(); 

?>

</body>
</html>
