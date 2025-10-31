<?php

add_filter('gform_pre_render', 'cls_add_class_vehicle_selector');

function cls_add_class_vehicle_selector($form) {
    foreach($form["fields"] as &$field) 
        if($field["cssClass"] == "vehicle-selector" && $field["type"] == "text"){
            $field['inputName'] = "VehicleSelector";
            $size = $field['size'];
            $field['size'] = $size . " vehicle-selector";
        }
    

    return $form;
}

add_filter('gform_pre_render', 'cls_populate_member_dropdown');
function cls_populate_member_dropdown($form){

    global $post;
    $post_id = $post->ID;

    //Adding items to field with class of preferred consultant
    foreach($form["fields"] as &$field)
        if($field["cssClass"] == "preferred-consultant" && $field["type"] == "select"){
            $args = [
                "post_type"         => "gs_team",
                "post_status"       => "publish",
                "posts_per_page"    => -1,
                "orderby"           => "title",
                "order"             => "ASC",
                "tax_query"         => [
                    [
                        "taxonomy"  => "gs_team_group",
                        "field"     => "slug",
                        "terms"     => "sales"
                    ]
                ]
            ];

            $bio_query = new WP_Query($args);

            $items = [];

            $items[] = array("text" => "No Preference", "value" => "no preference");

            if ($bio_query->have_posts()) {
                while($bio_query->have_posts()) {
                    $bio_query->the_post();
                    $title = get_the_title();
                    $id = get_the_ID();
                    $selected = $post_id === $id ? true : false;
                    $contact_id = get_post_meta( $id, 'contact_id', true );
                    $value = $contact_id ? $contact_id . ', ' . $title . ', ' . $id : $title . ', ' . $id;

                    $items[] = [
                        "value" => $value,
                        "text"  => $title,
                        "isSelected" => $selected
                    ];
                }
                wp_reset_postdata();
            }


            $field["type"] = "select";
            $field["choices"] = $items;
        }

    return $form;
}

add_filter( 'gform_field_input', 'cls_add_readonly', 10, 5 );
function cls_add_readonly( $input, $field, $value, $lead_id, $form_id ) {
    global $post;
    if ($field['cssClass'] == 'gf_readonly' && $field['type'] == 'text') {
       $classes = $field['size'];
       $id = $field['id'];
       $value = '';       
       $name = 'input_' . $id;
       $id = 'input_'. $form_id . '_' . $id;
       $input = '<input type="text" class="' . $classes . '" name="' . $name .'" id="' . $form_id . '_' . '_' . $field['id'] . '" readonly="readonly" tabindex="0" />';

    }
    return $input;

}


add_filter( 'gform_pre_render', 'cls_set_conditional_requirement' );
add_filter( 'gform_pre_validation', 'cls_set_conditional_requirement' );
function cls_set_conditional_requirement( $form ) {
 
    $value = rgpost( 'input_9' );
    foreach ( $form['fields'] as &$field ) {
        if ($field->cssClass == 'conditional-dep' && $value == '') {
            $field->isRequired = true;
        }
    }

    return $form;
}

add_filter( 'gform_field_input', 'cls_add_oninput', 10, 5 );
function cls_add_oninput( $input, $field, $value, $lead_id, $form_id ) {
    global $post;
    if ($field['cssClass'] == 'vehicle-selector' && $field['type'] == 'text') {
       $classes = $field['size'];
       $id = $field['id'];
       $value = '';
       if ($post && is_single($post->ID) && $post->post_type == 'vehicle') {
            $car = get_the_title($post->ID);
            $year = get_the_terms($post->ID, 'car_year');
            $year = join(', ', wp_list_pluck($year, 'name'));
            $stock = get_post_meta($post->ID, 'stock', true);
            $value = $stock . ', ' . $car . ' ' . $year;
       }
       
       $name = 'input_' . $id;
       $id = 'input_'. $form_id . '_' . $id;
       $input = '<input type="hidden" class="' . $classes . '" name="' . $name .'" id="VehicleSelector_' . $form_id . '_' . '_' . $field['id'] . '" value="' . $value . '" tabindex="0" />';

    }
    return $input;

}

add_filter( 'gform_notification', 'cls_notify_consultant', 10, 3 );
function cls_notify_consultant($notification, $form, $entry) {
    global $post;
    $id = $post->ID;
    $title = get_the_title($id);
    $post_type = get_post_type($id);

    if ($post_type == 'vehicle') {
        $title = 'Inventory';
    } elseif($post_type == 'gs_team') {
        $title = 'Consultant';
    }

    foreach($form["fields"] as &$field) {
        if($field["cssClass"] == "preferred-consultant" && $field["type"] == "select"){
            $f_id = $field["id"];
            $value = rgar($entry, $f_id);
            $value = explode(",", $value);
            $value = end($value);
            $email  = get_post_meta( $value, '_gs_email', true );
            // send consultant an email about client
            if ($email != '' && $notification['name'] == 'Admin Notification') {
                $notification['to'] .= ', ' . $email;
            }

        }
    }

    $notification['message'] .= '<br /> Form Embedded On: ' . $title;

    return $notification;
}

add_filter( 'gform_confirmation_anchor', '__return_true' );