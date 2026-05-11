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
    global $wpdb;
    $company_settings = [
        'phone'                 => get_field('business_phone', 'options'),
        'email'                 => get_field('business_email', 'options'),
        'street'                => get_field('business_street', 'options'),
        'city'                  => get_field('business_city', 'options'),
        'zip'                   => get_field('business_zip', 'options'),
        'state'                 => get_field('business_state', 'options'),
        'areas'                 => get_permalink(get_field('areas_served', 'options')),
        'icons'                 => get_field('icons', 'options'),
        'disclaimer'            => get_field('disclaimer', 'options'),
        'logo'                  => get_field('footer_logo', 'options'),
        'multiple_addresses'    => get_field('multiple_addresses', 'options'),
        'addresses'             => get_field('addresses', 'options')
    ];

     
?>

    <footer id="colophon" class="site-footer">
        <div class="site-info">
            <div class="wrapper">
                <div class="col">
                    <?php if (!$company_settings['multiple_addresses']) { ?>
                    <address>
                        <p style="margin-bottom: 10px">
                            <?= $company_settings['street'] . ', ' . $company_settings['city'] . ', ' . $company_settings['state'] . ' ' . $company_settings['zip'] ?><br />
                        </p>
                        <p>
                            <a href="tel:<?= $company_settings['phone']; ?>" class="contact-link"><?= $company_settings['phone'] ?></a><br />
                        </p>
                    </address>
                    <?php } elseif($company_settings['multiple_addresses'] == true) { 
                        $addresses = $company_settings['addresses'];
                        foreach($addresses as $address) {
                            $title = $address['location_address']['location_title'];
                            $street = $address['location_address']['street'];
                            $zip = $address['location_address']['zip'];
                            $city = $address['location_address']['city'];
                            $state = $address['location_address']['state'];
                            $phone = $address['location_address']['phone'];
                        ?>
                                <address>
                                    
                                    <p style="margin-bottom: 20px;">
                                        <?php if ($title != '') { ?>
                                            <strong><?php echo $title; ?></strong><br />
                                        <?php } ?>
                                        <?php if ($phone != '') { ?>
                                            <a href="tel:<?= $phone ?>" class="contact-link"><?= $phone ?></a>
                                        <?php } ?>
                                        <?= $street . ', <br />' . $city . ', ' . $state . ' ' . $zip ?><br />
                                    </p>
                                </address>
                        <?php
                        }
                     }
                     ?>
                     
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
                    <ul class="social" style="margin-top: 25px;">
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
            </div>
            <div class="footer-menu">
                <p>
                       Copyright &copy;<?php echo date("Y"); ?> Centennial Leasing & Sales
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
        <?php
        }
        $vehicle_form = get_field('vehicle_application', 'options');
        if ($vehicle_form != $modal_form) {
        ?>
        <div style="display: none;">
            <div 
                id="modal-form-<?= $vehicle_form ?>"
            >
                <div class="wrapper">
                    <h2 class="header-title">Vehicle Request</h2>
                    <?php echo do_shortcode('[gravityform id="' . $vehicle_form . '" title="false" description="false" ajax="true"]'); ?>
                </div>
            </div>
        </div>

        <!-- disclaimer -->
        <?php
        }
        ?>
    
        <?php
}
wp_footer(); 

?>

</body>
</html>
