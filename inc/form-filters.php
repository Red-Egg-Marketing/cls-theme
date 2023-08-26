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

                    $items[] = [
                        "value" => $title,
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