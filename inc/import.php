<?php

// Gives us access to the download_url() and wp_handle_sideload() functions
require_once( ABSPATH . '/wp-admin/includes/file.php' );

function cls_cron_schedules($schedules){
    if(!isset($schedules["30min"])){
        $schedules["30min"] = array(
            'interval' => 30*60,
            'display' => __('Once every 30 minutes'));
    }
    if(!isset($schedules["1hrs"])){
        $schedules["1hrs"] = array(
            'interval' => 1*60*60,
            'display' => __('Once every 1 hour'));
    }
    if(!isset($schedules["2hrs"])){
        $schedules["2hrs"] = array(
            'interval' => 2*60*60,
            'display' => __('Once every 2 hours'));
    }
    if(!isset($schedules["3hrs"])){
        $schedules["3hrs"] = array(
            'interval' => 3*60*60,
            'display' => __('Once every 3 hours'));
    }
    if(!isset($schedules["6hrs"])){
        $schedules["6hrs"] = array(
            'interval' => 6*60*60,
            'display' => __('Once every 6 hours'));
    }
    if(!isset($schedules["12hrs"])){
        $schedules["12hrs"] = array(
            'interval' => 12*60*60,
            'display' => __('Once every 12 hours'));
    }
    if(!isset($schedules["23hrs"])){
        $schedules["23hrs"] = array(
            'interval' => 23*60*60,
            'display' => __('Once every 23 hours'));
    }
    if(!isset($schedules["24hrs"])){
        $schedules["24hrs"] = array(
            'interval' => 24*60*60,
            'display' => __('Once every 24 hours'));
    }
    return $schedules;
}
add_filter('cron_schedules','cls_cron_schedules');

if (!wp_next_scheduled('cls_vehicles_set_vehicle_transient')) {
    wp_schedule_event( time(), '3hrs', 'cls_vehicles_set_vehicle_transient' );
}
add_action ( 'cls_vehicles_set_vehicle_transient', 'test_transient' );

function test_transient() {
    delete_transient('_vehicles_transient');
    $object = wp_remote_post('https://denver.clscars.com/wp-json/cls/v2/vehicles');
    $body = $object['body'];
    set_transient('_vehicles_transient', $body, 21600);
}

if (!wp_next_scheduled('cls_vehicles_csv_hook')) {
    wp_schedule_event( time(), '3hrs', 'cls_vehicles_csv_hook' );
}
add_action ( 'cls_vehicles_csv_hook', 'cls_import_vehicles_from_csv' );


function cls_import_vehicles_from_csv() {
    global $wpdb;

    // Change these to whatever you set
    $vehicle = array(
        "custom-post-type"      =>  "vehicle",
        "vin"                   =>  "vin",
        "stock"                 =>  "stock",
        "type"                  =>  "type",
        "body_style"            =>  "body_style",
        "trim"                  =>  "trim",
        "year"                  =>  "year",
        "model-number"          =>  "model-number",
        "doors"                 =>  "doors",
        "exterior_color"        =>  "exterior_color",
        "interior_color"        =>  "interior_color",
        "engine_cylinders"      =>  "engine_cylinders",
        "engine_displacement"   =>  "engine_displacement",
        "transmission"          =>  "transmission",
        "miles"                 =>  "miles",
        "selling_price"         =>  "selling_price",
        "msrp"                  =>  "msrp",
        "book_value"            =>  "book_value",
        "invoice"               =>  "invoice",
        "certified"             =>  "certified",
        "date_in_stock"         =>  "date_in_stock",
        "options"               =>  "options",
        "categorized_options"   =>  "categorized_options",
        "city_mpg"              =>  "city_mpg",
        "highway_mpg"           =>  "highway_mpg",
        "drivetrain"            =>  "drivetrain",
        "vehicleType"           =>  "vehicleType",
    );

    // Get the data from all those CSVs!
    $posts = function() {
        $data = array();
        $errors = array();

        // Get array of CSV files
        $files = glob( get_home_path() . "/csv/cls.csv" );

        foreach ( $files as $file ) {

            // Attempt to change permissions if not readable
            if ( ! is_readable( $file ) ) {
                chmod( $file, 0744 );
            }

            // Check if file is writable, then open it in 'read only' mode
            if ( is_readable( $file ) && $_file = fopen( $file, "r" ) ) {
                // To sum this part up, all it really does is go row by
                //  row, column by column, saving all the data
                $post = array();

                // Get first row in CSV, which is of course the headers
                $header = fgetcsv( $_file );

                while ( $row = fgetcsv( $_file ) ) {

                    foreach ( $header as $i => $key ) {
                        switch($key) {
                            case 'interiorColor':
                                $post['InteriorColor'];
                                break;
                            case 'modelCode':
                                $post['ModelNumber'];
                                break;
                            case 'KBB_Retail':
                                $post['BookValue'];
                                $post['MSRP'];
                                break;
                            case 'invoice':
                                $post['Invoice'];
                                break;
                            case 'vin':
                                $post['VIN'] = $row[$i];
                                break;
                            case 'year':
                                $post['Year'] = $row[$i];
                                break;
                            case 'make':
                                $post['Make'] = $row[$i];
                                break;
                            case 'model':
                                $post['Model'] = $row[$i];
                                break;
                            case 'body':
                                $post['Body'] = $row[$i];
                                $post['Body'] = $row[$i];
                                break;
                            case 'trim':
                                $post['Trim'] = $row[$i];
                                break;
                            case 'stockNumber':
                                $post['Stock'] = $row[$i];
                                break;
                            case 'internetPrice':
                                $post['SellingPrice'] = $row[$i];
                                break;
                            case 'mileage':
                                $post['Miles'] = $row[$i];
                                break;
                            case 'exteriorColor':
                                $post['ExteriorColor'] = $row[$i];
                                break;
                            case 'engine':
                                $temp = explode(',', $row[$i]);
                                $post['EngineCylinders'] = $temp[0];
                                $post['EngineDisplacement'] = $temp[1];
                                break;
                            case 'drive':
                                $post['Drivetrain'] = $row[$i];
                                break;
                            case 'transmission':
                                $post['Transmission'] = $row[$i];
                                break;
                            case 'newUsed':
                                $post['Type'] = $row[$i];
                                break;
                            case 'age':
                                $post['DateInStock'] = $row[$i];
                                break;
                            case 'description':
                                $post['Description'] = $row[$i];
                                break;
                            case 'options':
                                $post['Options'] = $row[$i];
                                break;
                            case 'imageUrls':
                                $post['ImageList'] = $row[$i];
                                break;
                            case 'mpgCity':
                                $post['CityMPG'] = $row[$i];
                                break;
                            case 'mpgHighway':
                                $post['HighwayMPG'] = $row[$i];
                                break;
                            case 'vehicleType':
                                $post['vehicle_type'] = $row[$i];
                                break;
                            default:
                                $post[$key] = $row[$i];                            
                        }
                    }

                    $title = $post['Year'] . ' ' . $post['Make'] . ' ' . $post['Model'];
                    $post['title'] = $title;
                    $post['images'] = $post['ImageList'];
                    $post['content'] = $post['Description'];
                    $data[] = $post;
                    
                }

                fclose( $_file );

            } else {
                $errors[] = "File '$file' could not be opened. Check the file's permissions to make sure it's readable by your server.";
            }
        }

        if ( ! empty( $errors ) ) {
            // ... do stuff with the errors
            print_r($errors);
        }

        return $data;
    };

    $import_posts = $posts();


    $all_vehicles = function() use ( $wpdb ) {
        $vs = $wpdb->get_results("SELECT post_id, meta_value FROM {$wpdb->postmeta} WHERE meta_key = 'vin'", ARRAY_A);

        return $vs;
    };

    // check all vehicles for vin number, if not in posts array, remove from wordpress
    $remove_vehicles = array_filter($all_vehicles(), function($vehicle) use ($import_posts){
        $truthy = true;
        foreach($import_posts as $post) {
            if ($vehicle['meta_value'] == $post["VIN"]) {
                $truthy = false;
                break;
            }
        }
        return $truthy;
    });

    // remove vehicles that don't have vin in import
    foreach ($remove_vehicles as $vtest) {
        $v_id = $vtest['post_id'];

        wp_delete_post($v_id, false);

    }

    // Simple check to see if the current post exists within the
    //  database. This isn't very efficient, but it works.
    $post_exists = function( $vin_number ) use ( $wpdb ) {

        // check if post exists from vin number
        $posts = $wpdb->get_col( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'vin' && meta_value = '{$vin_number}'" );

        if(!empty($posts)) {
            return $posts[0];
        } else {
            return false;
        }

    };

    $x = 0;

    foreach ( $import_posts as $post ) {

        if ($post["SellingPrice"] == '0') continue;

        // If the post exists, skip this post and go to the next one
        $exists_id = $post_exists( $post["VIN"] );

        $current_images = false;

        $meta_info = [
            "vin" => $post["VIN"],
            "miles" => $post["Miles"],
            "stock" => $post["Stock"],
            "model_number" => $post["ModelNumber"],
            "selling_price" => $post["SellingPrice"],
            "msrp" => $post["MSRP"],
            "year" => $post["Year"],
            "make" => $post["Make"],
            "model" => $post["Model"],
            "book_value" => $post["BookValue"],
            "invoice" => $post["Invoice"],
            "certified" => array_key_exists("Certified", $post) ? $post["Certified"] : false,
            "date_in_stock" => $post["DateInStock"],
            "options" => $post["Options"],
            "categorized_options" => array_key_exists("Categorized Options", $post) ? $post["Categorized Options"] : false,
            "city_mpg" => $post["CityMPG"],
            "highway_mpg" => $post["HighwayMPG"]
        ];

        if ( $exists_id !== false ) {
            // if the vin number exists, update the post
            wp_update_post(
                [
                    "ID" => $exists_id,
                    "post_title" => $post["title"],
                    "post_content" => $post["content"],
                    "post_type" => $vehicle["custom-post-type"],
                    "post_status" => "publish",
                    "meta_input" => $meta_info,
                ]
            );

             // check images meta if post has already been inserted, but updating
            $current_images = get_post_meta($exists_id, 'original_base', true);

            $current_images = json_decode($current_images, true);

        } elseif ($exists_id === false ) {
            // Insert the vehicle into the database
            $post["id"] = wp_insert_post(
                [
                    "post_title" => $post["title"],
                    "post_content" => $post["content"],
                    "post_type" => $vehicle["custom-post-type"],
                    "post_name" => $post['Year'] . ' ' . $post["Model"],
                    "post_status" => "publish",
                    "meta_input" => $meta_info
                ]
            );
        }

        $images = explode(",", $post['images']);

        // Get the path to the upload directory.
        $wp_upload_dir = wp_upload_dir();
        
        $number = 0;
        
        // load images into upload directory
        $i_array = [];

        $base_images = [];

    
        foreach($images as $image) {

                $actual_id = $exists_id !== false ? $exists_id : $post['id'];

                $base = basename($image);

                $number+=1;

                if ($base != '') {

                    array_push($base_images, $base);

                    array_push($i_array, $base);
                }

                if (is_array($current_images) && in_array($base, $current_images)) {
                    // get attachment by base meta and update the order meta
                    $image_meta = $wpdb->get_col( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'base' && meta_value = '{$base}'" );
                    if (is_array($image_meta) && !empty($image_meta)) {
                        update_post_meta($image_meta[0], 'image_order', $number);
                    }
                    continue;
                }

                
                $timeout_seconds = 5;


                $temp_file = download_url( $image, $timeout_seconds );

                if ( !is_wp_error( $temp_file ) ) {

                    $new_base = str_replace(" ", "-", $post["title"]);
                    $base_year = str_replace(" ", "-", $post['Year']);

                    $path_ext = pathinfo($image, PATHINFO_EXTENSION);

                    $image_type = getimagesize($image, $info);

                    list($width, $height) = $image_type;

                    $file = array(
                        'name'     => $new_base . '-' . $base_year . '.' . $path_ext,
                        'type'     => $info['mime'],
                        'tmp_name' => $temp_file,
                        'size'     => filesize( $temp_file ),
                    );

                    $sideload = wp_handle_sideload(
                        $file,
                        array(
                            'test_form'   => false // no needs to check 'action' parameter
                        )
                    );

                    if( empty( $sideload[ 'error' ] ) ) {
                        // you may return error message if you want
                        @unlink($temp_file);

                        $attachment_id = wp_insert_attachment(
                            array(
                                'guid'           => $sideload[ 'url' ],
                                'post_mime_type' => $sideload[ 'type' ],
                                'post_title'     => $post['title'] . ' Image #' . $number,
                                'post_status'    => 'inherit',
                                'post_parent'    => $actual_id
                            ),
                            $sideload[ 'file' ]
                        );

                        if( !is_wp_error( $attachment_id ) || $attachment_id ) {
                            
                            require_once( ABSPATH . '/wp-admin/includes/image.php' );

                            wp_update_attachment_metadata(
                                $attachment_id,
                                wp_generate_attachment_metadata( $attachment_id, $sideload[ 'file' ] )
                            );
                            update_post_meta($attachment_id, 'base', $base);
                            update_post_meta($attachment_id, 'image_order', $number);
                            // if ($number == 1) {
                            //     set_post_thumbnail($actual_id, $attachment_id);
                            // }
                            
                        }
                    }

                }

                
    
        } // end foreach

         
         
        if ( $exists_id !== false && is_array($current_images)) {


            $missing_images = array_filter($current_images, function($image) use ($base_images) {
                if (!in_array($image, $base_images)) {
                    return true;
                }
            });

            $intersect = array_filter($current_images, function($image) use ($base_images) {
                if (in_array($image, $base_images)) {
                    return true;
                }
            });

            wp_update_post(
                [
                    'ID' => $actual_id,
                    'meta_input' => [
                        'a_test' => json_encode($i_array)
                    ]
                ]
            );
            
            // remove missing images

            if (sizeof($missing_images) > 0) {
                $testing = '';
                foreach($missing_images as $missing_image) {

                    // $image_query = $wpdb->get_col( "SELECT ID FROM {$wpdb->posts} WHERE post_type = 'attachment' && post_parent = '{$exists_id}' && post_content = '{$missing_image}'" );
                    $image_query = $wpdb->get_col( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'base' && meta_value = '{$missing_image}'" );
                    foreach($image_query as $temp) {
                        wp_delete_attachment( $temp, true );
                        delete_post_meta( $temp, 'image_order');
                        delete_post_meta( $temp, 'base');
                    }

                    $testing .= $image_query[0] . ',';
                
                }   

                wp_update_post(
                    [
                        'ID' => $actual_id,
                        'meta_input' => [
                            'original_base' => json_encode($i_array),
                            'testing' => $testing
                    ]
                ]);
            } else {
               
                if (sizeof($i_array) == 0) {
                   // delete images if import has no images
                    $attachments = get_attached_media( 'image', $actual_id );

                    foreach ($attachments as $attachment) {
                        wp_delete_attachment( $attachment->ID, true );
                        delete_post_meta( $attachment->ID, 'image_order');
                        delete_post_meta( $attachment->ID, 'base');
                    }  
                }

                wp_update_post(
                    [
                        'ID' => $actual_id,
                        'meta_input' => [
                            'original_base' => json_encode($i_array),
                            'testing' => json_encode($missing_images)
                        ]
                    ]
                );
            }

           
        } elseif($exists_id !== false && !is_array($current_images)){
            wp_update_post(
                    [
                        'ID' => $actual_id,
                        'meta_input' => [
                            'original_base' => json_encode($i_array),
                            'testing' => '3'                    
                    ]
            ]);
        } elseif ( $exists_id === false ) {
            wp_update_post(
                [
                    'ID' => $actual_id,
                    'meta_input' => [
                        'original_base' => json_encode($i_array),
                        'testing' => '4'
                    ]
                ]
            );
             
        } 

        

        $tax_array = [];

        array_push($tax_array, 
            ['make' => $post['Make']],
            ['car_type' => $post['Type']],
            ['model' => $post['Model']],
            ['car_year' => $post['Year']],
            ['body_style' => $post['Body']],
            ['trim' => $post['Trim']],
            ['doors' => array_key_exists('Doors', $post) ? $post['Doors'] : false],
            ['exterior_color' => $post['ExteriorColor']],
            ['interior_color' => $post['InteriorColor']],
            ['engine_cylinder' => $post['EngineCylinders']],
            ['engine_displacement' => $post['EngineDisplacement']],
            ['transmission' => $post['Transmission']],
            ['drivetrain' => $post['Drivetrain']],
            ['vehicle_type' => $post['vehicle_type']],
        );

        // add taxonomies
        foreach($tax_array as $tax) {

            foreach($tax as $key => $tax_value) {
                wp_set_post_terms(
                    $actual_id,
                    $tax_value,
                    $key,
                    false
                );
            }
        }
    
        
    }  
}


function cls_vehicle_set_feature_image($post_id, $post, $update) {
    
    $attachments = get_posts(array(
        'post_parent' => $post_id,
        'post_type' => 'attachment',
        'post_mime_type' => 'image',
        'meta_key' => 'image_order',
        'orderby' => 'meta_value_num',
        'order' => 'ASC',
        'numberposts' => 1
    ));

    foreach($attachments as $attachment) {
         set_post_thumbnail($post_id, $attachment->ID);
    }

}

add_filter('wp_insert_post', 'cls_vehicle_set_feature_image', 10, 3);

function cls_vehicle_trash_attachments( $delete, $post, $force_delete ) {
  // Is it my post type someone is trying to delete?
  if ( 'vehicle' === $post->post_type && ! $force_delete ) {

    $attachments = get_attached_media( 'image', $post->ID );

    foreach ($attachments as $attachment) {
        wp_delete_attachment( $attachment->ID, true );
    }
  }
  return $delete;  
}
add_filter('pre_delete_post', 'cls_vehicle_trash_attachments', 10, 3);
