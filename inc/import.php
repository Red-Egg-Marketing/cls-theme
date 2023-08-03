<?php

// Gives us access to the download_url() and wp_handle_sideload() functions
require_once( ABSPATH . '/wp-admin/includes/file.php' );
/**
 * Show 'insert posts' button on backend
 */
add_action( "admin_notices", function() {
    echo "<div class='updated'>";
        echo "<p>";
            echo "To insert the posts into the database, click the button to the right.";
            echo "<a class='button button-primary' style='margin:0.25em 1em' href='{$_SERVER["REQUEST_URI"]}&insert_vehicles'>Insert Vehicles</a>";
        echo "</p>";
    echo "</div>";
});
// script for importing car data

add_action( "admin_init", function() {
    global $wpdb;

    if ( ! isset( $_GET["insert_vehicles"] ) ) {
        return;
    }

    // Change these to whatever you set
    $vehicle = array(
        "custom-post-type"      =>  "vehicle",
        "vin"                   =>  "vin",
        "stock"                 =>  "stock",
        "type"                  =>  "type",
        "body"                  =>  "body",
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
    );

    // Get the data from all those CSVs!
    $posts = function() {
        $data = array();
        $errors = array();

        // Get array of CSV files
        $files = glob( __DIR__ . "/cls.csv" );

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
                        $post[$key] = $row[$i];
                    }

                    $title =  $post['Make'] . ' ' . $post['Model'];
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
            // print_r($errors);
        }

        return $data;
    };


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

    foreach ( $posts() as $post ) {
        if ($post["SellingPrice"] == '0') continue;
        
        // If the post exists, skip this post and go to the next one
        $exists_id = $post_exists( $post["VIN"] );

        if ( $exists_id !== false ) {
            // if the vin number exists, update the post
            wp_update_post(
                [
                    "ID" => $exists_id,
                    "post_title" => $post["title"],
                    "post_content" => $post["content"],
                    "post_type" => $vehicle["custom-post-type"],
                    "post_status" => "publish"
                ]
            );

             // check images meta if post has already been inserted, but updating
            $current_images = get_post_meta($exists_id, 'original_base');

        } else {
            // Insert the vehicle into the database
            $post["id"] = wp_insert_post(
                [
                    "post_title" => $post["title"],
                    "post_content" => $post["content"],
                    "post_type" => $vehicle["custom-post-type"],
                    "post_name" => $post['Year'] . ' ' . $post["Model"],
                    "post_status" => "publish",
                    "meta_input" => [
                        "vin" => $post["VIN"]
                    ]
                ]
            );
        }

        $images = explode(",", $post['images']);

        // Get the path to the upload directory.
        $wp_upload_dir = wp_upload_dir();
        
        $number = 1;
        
        // load images into upload directory
        $i_array = [];
        
        foreach($images as $image) {

                if (isset($current_images) && !in_array(basename($image), $current_images)) continue;
                
                $timeout_seconds = 1.5;

                array_push($i_array, basename($image));

                $temp_file = download_url( $image, $timeout_seconds );

                if ( !is_wp_error( $temp_file ) ) {

                    $file = array(
                        'name'     => basename( $image ),
                        'type'     => mime_content_type( $temp_file ),
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
                                'post_content'   => basename($image),
                                'post_status'    => 'inherit',
                                'post_parent'    => $post['id']
                            ),
                            $sideload[ 'file' ]
                        );

                        if( !is_wp_error( $attachment_id ) || $attachment_id ) {
                            
                            require_once( ABSPATH . 'wp-admin/includes/image.php' );

                            wp_update_attachment_metadata(
                                $attachment_id,
                                wp_generate_attachment_metadata( $attachment_id, $sideload[ 'file' ] )
                            );
                            if ($number == 1) {
                                set_post_thumbnail($post['id'], $attachment_id);
                            }

                        }
                    }

                }

                $number++;
    
        } // end foreach

        $tax_array = [];

        array_push($tax_array, 
            ['make' => $post['Make']],
            ['car_type' => $post['Type']],
            ['model' => $post['Model']],
            ['car_year' => $post['Year']],
            ['body' => $post['Body']],
            ['trim' => $post['Trim']],
            ['doors' => $post['Doors']],
            ['exterior_color' => $post['ExteriorColor']],
            ['interior_color' => $post['InteriorColor']],
            ['engine_cylinder' => $post['EngineCylinders']],
            ['engine_displacement' => $post['EngineDisplacement']],
            ['transmission' => $post['Transmission']],
            ['drivetrain' => $post['Drivetrain']],
        );

        // add taxonomies
        foreach($tax_array as $tax) {

            foreach($tax as $key => $tax_value) {
                wp_set_post_terms(
                    $post['id'],
                    $tax_value,
                    $key,
                    false
                );
            }
        }

        
        // add for checking if images are already added
        update_post_meta($post['id'], 'original_base', json_encode($i_array));
        // Update post's custom field with attachment
        update_post_meta( $post['id'], $vehicle["stock"], $post["Stock"]);
        update_post_meta( $post['id'], $vehicle["model_number"], $post["ModelNumber"]);
        update_post_meta( $post['id'], $vehicle["selling_price"], $post["SellingPrice"]);
        update_post_meta( $post['id'], $vehicle["miles"], $post["Miles"]);
        update_post_meta( $post['id'], $vehicle["msrp"], $post["MSRP"]);
        update_post_meta( $post['id'], $vehicle["book_value"], $post["BookValue"]);
        update_post_meta( $post['id'], $vehicle["invoice"], $post["Invoice"]);
        update_post_meta( $post['id'], $vehicle["certified"], $post["Certified"]);
        update_post_meta( $post['id'], $vehicle["date_in_stock"], $post["DateInStock"]);
        update_post_meta( $post['id'], $vehicle["options"], $post["Options"]);
        update_post_meta( $post['id'], $vehicle["categorized_options"], $post["Categorized Options"]);
        update_post_meta( $post['id'], $vehicle["city_mpg"], $post["CityMPG"]);
        update_post_meta( $post['id'], $vehicle["highway_mpg"], $post["HighwayMPG"]);
    
        
    }  
});
