<?php
// add custom image sizes

add_image_size('whitepaper-poster', 280, 390, array('center', 'center'), true);
add_image_size('post-landscape-tiny', 85, 65, false);
add_image_size('post-landscape', 580, 446, false);
add_image_size('post-landscape-medium', 348, 267, false);
add_image_size('image-text-block-small', 480, 250, array('center', 'center'), true);
add_image_size('image-text-block', 960, 500, array('center', 'center'), true);
add_image_size('hero-landscape-large', 1920, 729, array('center', 'center'), true);
add_image_size('hero-landscape-medium', 1280, 486, array('center', 'center'), true);
add_image_size('hero-landscape', 960, 364, array('center', 'center'), true);
add_image_size('medium-large', 700, 700, array('center', 'center'), true);
add_image_size('medium-landscape', 920, 460, array('center', 'center'), true);
add_image_size('medium-small', 350, 350, array('center', 'center'), true);

add_filter( 'image_size_names_choose', 'emulate_custom_sizes' );
 
function emulate_custom_sizes( $sizes ) {
    return array_merge( $sizes, array(
        'whitepaper-poster' => ('Whitepaper Poster'),
        'post-landscape' => ('Landscape'),
        'post-landscape-medium' => ('Landscape Medium'),
        'hero-landscape-large' => ('Hero Large'),
        'hero-landscape-medium' => ('Hero Medium'),
        'hero-landscape' => ('Hero'),
        'image-text-block' => ('Image & Text Block'),
        'image-text-block-small' => ('Image & Text Block Small'),
        'medium-large' => ('Medium/Large Image'),
    ) );
}

/**
 * SVG Upload support
 **/
function cls_svgs_disable_real_mime_check( $data, $file, $filename, $mimes ) {
   $wp_filetype = wp_check_filetype( $filename, $mimes );
   $ext = $wp_filetype['ext'];
   $type = $wp_filetype['type'];
   $proper_filename = $data['proper_filename'];
   return compact( 'ext', 'type', 'proper_filename' );
}
add_filter( 'wp_check_filetype_and_ext', 'cls_svgs_disable_real_mime_check', 10, 4 );

function cls_mime_types($mimes) {
 $mimes['svg'] = 'image/svg+xml';
 return $mimes;
}
add_filter('upload_mimes', 'cls_mime_types');


add_filter( 'wp_get_attachment_image_src', 'fix_wp_get_attachment_image_svg', 10, 4 );

function fix_wp_get_attachment_image_svg($image, $attachment_id, $size, $icon) {
    if (is_array($image) && preg_match('/\.svg$/i', $image[0]) && $image[1] <= 1) { if(is_array($size)) { $image[1] = $size[0]; $image[2] = $size[1]; } elseif(($xml = simplexml_load_file($image[0])) !== false) { $attr = $xml->attributes();
            $viewbox = explode(' ', $attr->viewBox);
            $image[1] = isset($attr->width) && preg_match('/\d+/', $attr->width, $value) ? (int) $value[0] : (count($viewbox) == 4 ? (int) $viewbox[2] : null);
            $image[2] = isset($attr->height) && preg_match('/\d+/', $attr->height, $value) ? (int) $value[0] : (count($viewbox) == 4 ? (int) $viewbox[3] : null);
        } else {
            $image[1] = $image[2] = null;
        }
    }
    return $image;

}

?>