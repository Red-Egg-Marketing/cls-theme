<?php
 // enqueue custom blocks
function cls_enqueue_block_editor_assets() {
    wp_enqueue_style('cls-fonts-editor', 'https://use.typekit.net/dly3nlz.css', [], null);
    if (get_post_type() == 'case-studies' || get_post_type() == 'page' || get_post_type() == 'wp_block' && strpos(get_page_template(), 'page-boilerplate.php') == false) {
        $block_path = '/support/assets/js/editor.blocks.js';

        $dependencies = array( 'wp-blocks', 'wp-dom-ready' );

        if( is_object( get_current_screen() ) ){
            if( get_current_screen()->id == 'site-editor' ){
                $dependencies[] = 'wp-edit-site';
            }elseif( get_current_screen()->id == 'widgets' ){
                $dependencies[] = 'wp-edit-widgets';
            }else{
                $dependencies[] = 'wp-edit-post';
            }
        }else{
            $dependencies[] = 'wp-edit-post';
        }
        
        wp_enqueue_script(
            'wp-core-blocks-js',
            get_template_directory_uri() . $block_path,
            [ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-dom-ready', 'lodash' ],
            $dependencies,
            'v1.0.5'
        );
        wp_localize_script(
           'wp-core-blocks-js',
           'cls',
           [
               'template_directory' => get_template_directory_uri()
           ]
        );
        wp_enqueue_style('cls-editor-css', get_template_directory_uri() . '/blocks.editor.css', ['cls-fonts-editor']);
    }

}

add_action('enqueue_block_editor_assets', 'cls_enqueue_block_editor_assets');


function cls_render_filtered_case_studies_callback($block_attributes, $content) {
    $block_content = '';
    $cat = !empty($block_attributes['category']) ? $block_attributes['category'] : '';
    
    $block_content .= '<section class="selected-case-studies-grid">';
       $block_content .= '<div class="resources-block">';
            $block_content .= '<div class="block-wrapper">';
                $block_content .= '<div class="resources-wrap">';
                        $block_content .= '<header class="header">';
                             $block_content .= $content;
                        $block_content .= '</header>';                    
                        $block_content .= '<div class="resources grid" data-append data-category="' . $cat . '">';
                    $block_content .= '</div>';
               $block_content .= '</div>';
            $block_content .= '</div>';
        $block_content .= '</div>';
    $block_content .= '</section>';
    
    return $block_content;
}


function cls_enqueue_main_script() {
    global $post;

    if (!is_admin()) {
        wp_enqueue_script(
            'fancybox',
            get_template_directory_uri() . '/support/js-compile/libraries/fancybox-v4.0.26.js',
            ['jquery'],
            'v1.0.4',
            true
        );
        $front_path = '/support/assets/js/main.js';
        wp_enqueue_script(
            'wp-main-js',
            get_template_directory_uri() . $front_path,
            ['wp-api', 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor'],
            'v1.1.0',
            true
       );

        if ($post) {
        wp_localize_script(
            'wp-main-js',
            'postData' ,
            [
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'id' => $post->ID
            ]
        );
        }
    }

    // register_block_type( 'cls-blocks/selected-case-studies', [
    //         'api_version' => 2,
    //         'script' => 'wp-main-js',
    //         'render_callback' => 'cls_render_filtered_case_studies_callback'
    //     ] 
    // );
}

add_action('wp_enqueue_scripts', 'cls_enqueue_main_script');


function cls_render_filtered_case_study_callback($block_attributes, $content) {

    $block_content = '';
    $cat = !empty($block_attributes['category']) ? $block_attributes['category'] : '';
    $id = !empty($block_attributes['blockId']) ? $block_attributes['blockId'] : '';
    
    $block_content .= '<section class="selected-case-study" id="' . $id . '">';
       $block_content .= '<div class="case-studies-block">';
            $block_content .= '<div class="block-wrapper">';
                $block_content .= '<div class="resources-wrap">';
                    $block_content .= '<header class="header">';
                        $block_content .= $content;
                    $block_content .= '</header>';
                    $block_content .= '<div class="resources" data-append data-category="' . $cat . '">';
                    $block_content .= '</div>';                        
               $block_content .= '</div>';
            $block_content .= '</div>';
        $block_content .= '</div>';
    $block_content .= '</section>';
    
    return $block_content;
}


// function cls_dynamic_case_studies_block() {
    
//     register_block_type( 'cls-blocks/selected-case-study', [
//             'api_version' => 2,
//             'script' => 'wp-main-js',
//             'render_callback' => 'cls_render_filtered_case_study_callback'
//         ] 
//     );

// }

// add_action('init', 'cls_dynamic_case_studies_block');

//remove custom colors from blocks

function cls_gutenberg_disable_custom_styles() {

     // removes the text box where users can enter custom pixel sizes
    add_theme_support('disable-custom-font-sizes',  ['custom'] );

    add_theme_support('disable-custom-font-weight',  ['custom'] );

    // add_theme_support('editor-font-sizes', []);

    add_theme_support( 'editor-color-palette',
        [
            [
                'name' => esc_html('Light Blue', '@@textdomain'),
                'slug' => 'blue',
                'color' => '#00395C'
            ],
            [
                'name' => esc_html('Red', '@@textdomain'),
                'slug' => 'red',
                'color' => '#910035'
            ]
        ]
    );
    add_theme_support( 'disable-custom-colors' );
}
add_action( 'after_setup_theme', 'cls_gutenberg_disable_custom_styles' );


// function cls_progress_block_assets() {

//     wp_enqueue_script(
//         'lottie-script',
//         'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
//         ['jquery'],
//         '1.0.0',
//         true
//     );

//     wp_enqueue_script(
//       'scroll-magic',
//       'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js',
//       ['jquery', 'tweenmax'],
//       '1.0.0',
//       true
//     );

//     wp_enqueue_script(
//         'scrolltrigger',
//         'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/ScrollTrigger.min.js',
//         ['tweenmax'],
//         '1.0.0',
//         true
//     );

//     wp_enqueue_script(
//       'tweenmax',
//       'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/gsap.min.js',
//       ['jquery'],
//       '1.0.0',
//       true
//     );

//     wp_enqueue_script(
//       'tweenmax-animation',
//       'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js',
//       ['jquery', 'tweenmax', 'scroll-magic'],
//       '1.0.0',
//       true
//     );

// }
// add_action( 'enqueue_block_assets', 'cls_progress_block_assets' );
