<?php


if (!wp_next_scheduled('cls_vehicles_carfax_outbound')) {
    wp_schedule_event( strtotime('today midnight'), '24hrs', 'cls_vehicles_carfax_outbound' );
}

add_action ( 'cls_vehicles_carfax_outbound', 'car_fax_ftp_outbound' );

function car_fax_ftp_outbound() {
    global $wpdb;
    $server = 'data.carfax.com';
    $user = 'REDEGGMRKT_get';
    $pass = 'proposed-fast-carriage-agency';
    $date =  date('mdY');
    $filename = 'REDEGGMRKT_cfx_' . $date . '_return_file.txt';
    $conn_id = ftp_connect($server);
    $login_result = ftp_login($conn_id, $user, $pass);
    ftp_pasv($conn_id, true);

    if ($login_result == true) {
       
        $success = ftp_get($conn_id, $filename, $filename, FTP_ASCII);

        if ($success) {
            // parse file
            if ( ! is_readable( $filename ) ) {
                chmod( $filename, 0744 );
            }
            if ($import = fopen($filename,'r')) {
                while (!feof($import)) {
                    $line = fgets($import);
                    $line = explode('|', $line);
                    $vin = array_key_exists(1 , $line) ? $line[1] : false;
                    $link = array_key_exists(2 , $line) ? $line[2] : false;
                    $image = array_key_exists(3 , $line) ? $line[3] : false;

                    if ($vin) {
                        $post = $wpdb->get_col( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'vin' && meta_value = '{$vin}'" );
                        $vehicle = $post[0];
                        $meta_info = [
                            "carfax_image" => $image,
                            "carfax_link" => $link
                        ];

                        wp_update_post(
                            [
                                "ID" => $vehicle,
                                "meta_input" => $meta_info
                            ]
                        );   
                    }

                }
                fclose($import);
            }
        unlink($filename);            
        }
    }
    ftp_close($conn_id);
}


