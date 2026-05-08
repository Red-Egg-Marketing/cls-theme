<?php
// Add options page for site

add_filter('acf/format_value', function ($value, $post_id, $field) {
        if (!is_string($value)) return $value;

        $tokens = [
            '%doc_fee%' => get_option('options_doc_fee'),
        ];

        return str_replace(array_keys($tokens), array_values($tokens), $value);
        
}, 20, 3);

if( function_exists('acf_add_options_page') ) {
    
	// Add parent.
    acf_add_options_page(array(
        'page_title'  => __('CLS Site Settings'),
        'menu_title'  => __('CLS Site Settings'),
        'redirect'    => false,
     ));

}