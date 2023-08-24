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
    ];


?>

    <footer id="colophon" class="site-footer">
        <div class="site-info">
            <div class="wrapper">
                <div class="col">
                    <address>
                        <p>
                            <a href="tel:<?= $company_settings['phone']; ?>" class="contact-link"><?= $company_settings['phone'] ?></a><br />
                            <a href="mailto:<?= $company_settings['email']; ?>" class="contact-link"><?= $company_settings['email'] ?></a><br />
                            <?= $company_settings['street']; ?><br />
                            <?= $company_settings['city']; ?>, <?= $company_settings['state']; ?> <?= $company_settings['zip']; ?>
                             
                        </p>
                    </address>
                </div>
                <div class="col">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="footer-home"><?php bloginfo( 'name' ); ?></a>    
                </div>
                <div class="col">
                    <p>
                        <a href="<?= $company_settings['areas']; ?>">Areas Served</a><br />
                    </p>
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
                    <p>
                        &copy;<?php echo date("Y"); ?> Copyright
                    </p> 
                </div>
            </div>
            <div class="footer-menu">
                <?php
                    wp_nav_menu(
                        array(
                            'theme_location' => 'menu-12',
                            'menu_id'        => 'footer-menu',
                        )
                    );
                ?>
            </div>
        </div><!-- .site-info -->
    </footer><!-- #colophon -->
</div><!-- #page -->

<?php 

} // end if

 if (function_exists('get_field')){
        $modal_form = get_field('menu_form', 'options');
        if ($modal_form != 0) {
        ?>
        <div style="display: none;">
        <div 
            id="modal-form-<?= $modal_form ?>"
        >
            <div class="wrapper">
                <?php echo do_shortcode('[gravityform id="' . $modal_form . '" title="true" description="true" ajax="true"]'); ?>
            </div>
        </div>
        </div>
        <?php
        }

}
wp_footer(); 

?>

</body>
</html>
