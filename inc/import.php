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
    // I'd recommend replacing this with your own code to make sure
    //  the post creation _only_ happens when you want it to.
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
        "city_mpg"              =>  "city_mpg",
        "highway_mpg"           =>  "highway_mpg",
        "drivetrain"            =>  "drivetrain",
    );

    // Get the data from all those CSVs!
    $posts = function() {
        $data = array();
        $errors = array();

        // Get array of CSV files
        $files = glob( __DIR__ . "/*.csv" );

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

                    $title =  $post['Make'] . ' ' . $post['Model'] . ' ' . $post['Year'];
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


    // Simple check to see if the current post exists within the
    //  database. This isn't very efficient, but it works.
    $post_exists = function( $title ) use ( $wpdb, $vehicle ) {

        // Get an array of all posts within our custom post type
        $posts = $wpdb->get_col( "SELECT post_title FROM {$wpdb->posts} WHERE post_type = '{$vehicle["custom-post-type"]}'" );

        // Check if the passed title exists in array
        return in_array( $title, $posts );
    };

    foreach ( $posts() as $post ) {
        // If the post exists, skip this post and go to the next one
        if ( $post_exists( $post["title"] ) ) {
            continue;
        }

        // Insert the post into the database
        $post["id"] = wp_insert_post( array(
            "post_title" => $post["title"],
            "post_content" => $post["content"],
            "post_type" => $vehicle["custom-post-type"],
            "post_status" => "publish"
        ));


        $images = explode(",", $post['images']);

        // Get the path to the upload directory.
        $wp_upload_dir = wp_upload_dir();
        $x = 0;
        
        foreach($images as $image) {
            
                $timeout_seconds = 5;

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

                        $attachment_id = wp_insert_attachment(
                            array(
                                'guid'           => $sideload[ 'url' ],
                                'post_mime_type' => $sideload[ 'type' ],
                                'post_title'     => basename( $sideload[ 'file' ] ),
                                'post_content'   => '',
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
                            if ($x == 0) {
                                set_post_thumbnail($post['id'], $attachment_id);
                            }
                            $x++;

                        }
                    }
                }
    
        }

        // insert media into post
        
        // Update post's custom field with attachment
        update_field( $vehicle["vin"], $post["VIN"], $post["id"] );
        update_field( $vehicle["stock"], $post["Stock"], $post["id"] );
        update_field( $vehicle["type"], $post["Type"], $post["id"] );
        update_field( $vehicle["body"], $post["Body"], $post["id"] );
        update_field( $vehicle["trim"], $post["Trim"], $post["id"] );
        update_field( $vehicle["model_number"], $post["ModelNumber"], $post["id"] );
        update_field( $vehicle["doors"], $post["Doors"], $post["id"] );
        update_field( $vehicle["exterior_color"], $post["ExteriorColor"], $post["id"] );
        update_field( $vehicle["interior_color"], $post["InteriorColor"], $post["id"] );
        update_field( $vehicle["engine_cylinders"], $post["EngineCylinders"], $post["id"] );
        update_field( $vehicle["engine_displacement"], $post["EngineDisplacement"], $post["id"] );
        update_field( $vehicle["engine_displacement"], $post["EngineDisplacement"], $post["id"] );
        update_field( $vehicle["transmission"], $post["Transmission"], $post["id"] );
        update_field( $vehicle["miles"], $post["SellingPrice"], $post["id"] );
        update_field( $vehicle["msrp"], $post["MSRP"], $post["id"] );
        update_field( $vehicle["book_value"], $post["BookValue"], $post["id"] );
        update_field( $vehicle["invoice"], $post["Invoice"], $post["id"] );
        update_field( $vehicle["certified"], $post["Certified"], $post["id"] );
        update_field( $vehicle["date_in_stock"], $post["DateInStock"], $post["id"] );
        update_field( $vehicle["options"], $post["Options"], $post["id"] );
        update_field( $vehicle["city_mpg"], $post["CityMPG"], $post["id"] );
        update_field( $vehicle["highway_mpg"], $post["HighwayMPG"], $post["id"] );
        update_field( $vehicle["drivetrain"], $post["Drivetrain"], $post["id"] );
    
        
    }  
});
