<?php
add_filter('gform_pre_render', 'cls_populate_member_dropdown');
function cls_populate_member_dropdown($form){

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
                        "taxonomy"  => "team_group",
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

                    $items[] = [
                        "value" => $id,
                        "text"  => $title
                    ];
                }
                wp_reset_postdata();
            }


            $field["type"] = "select";
            $field["choices"] = $items;
        }

    return $form;
}

// add_filter( 'gform_field_input', 'cls_add_oninput', 10, 5 );
// function cls_add_oninput( $input, $field, $value, $lead_id, $form_id ) {
//     if ($field['cssClass'] == 'vehicle-selector' && $field['type'] == 'text') {
//         $dom = new DOMDocument();
//         $new_input = $input;
//         @$dom->loadHTML();
//         $x = new DOMXPath($dom);
//         foreach($x->query("//input") as $node)
//         {   
//             $node->setAttribute("style","xxxx");
//         }

//         $input = $dom->saveHtml();

//     }
//     return $input;

// }


add_filter( 'gform_notification', 'cls_notify_consultant', 10, 3 );

function cls_notify_consultant($notification, $form, $entry) {
    foreach($form["fields"] as &$field) {
        if($field["cssClass"] == "preferred-consultant" && $field["type"] == "select"){
            $f_id = $field["id"];
            $value = rgar($entry, $f_id);
            $email  = get_post_meta( $value, '_gs_email', true );
            // send consultant an email about client
            if ($email != '' && $notification['name'] == 'Admin Notification') {
                $notification['to'] = $email;
            }

        }
    }
    return $notification;
}