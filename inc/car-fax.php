<?php

if (!wp_next_scheduled('cls_vehicles_vin_hook')) {
    wp_schedule_event( time(), '23hrs', 'cls_vehicles_vin_hook' );
}

add_action ( 'cls_vehicles_vin_hook', 'retrieve_all_vin_numbers' );

function retrieve_all_vin_numbers() {

    global $wpdb;

    $date =  date('mdY');
    $filename = "REDEGGMRKT_CFXIICR_" . $date . ".txt";
    $filename2 = "REDEGGMRKT_dealerlist_" . $date . ".txt";
    $dealer = "Centennial Leasing";
    $address = "7150 S Joliet St.";
    $address2 = "";
    $city = "Englewood";
    $state = "CO";
    $zip = "80122";
    $phone = "3032332277";
    $output = "";
    $dealer_id = "740362";
    $output2 = "\"" .$dealer_id . "\"|\"" . $dealer . "\"|\"" . $address . "\"|\"" . $address2 . "\"|\"" . $city . "\"|\"" . $state . "\"|\"" . $zip . "\"|\"" . $phone . "\""; 
    // $link = "http://partner.com/search&VIN=";
    $vins = $wpdb->get_results("SELECT post_id, meta_value FROM {$wpdb->postmeta} WHERE meta_key = 'vin'", ARRAY_A);

    if (!empty($vins)) {
        foreach($vins as $vin){
            $id = $vin['post_id'];
            $number = $vin['meta_value'];
            $price = get_post_meta($id, 'selling_price', true);
            $output .= $number . "|" . $dealer_id . "|" . $price . "\r\n";
        }

        $myfile = fopen($filename,'w');
        $myfile2 = fopen($filename2, 'w');
        fwrite($myfile, $output);
        fwrite($myfile2, $output2);

        // ftp to carfax
        car_fax_ftp_inbound([$filename, $filename2]);

        fclose($myfile);
        fclose($myfile2);

        // delete file after upload
        unlink($filename);
        unlink($filename2);
    } else {
        return false;
    }

}


if (!wp_next_scheduled('cls_vehicles_carfax_outbound')) {
    wp_schedule_event( time(), '24hrs', 'cls_vehicles_carfax_outbound' );
}

add_action ( 'cls_vehicles_carfax_outbound', 'car_fax_ftp_outbound' );

function car_fax_ftp_outbound() {
    global $wpdb;
    $server = 'data.carfax.com';
    $user = 'REDEGGMRKT_get';
    $pass = 'proposed-fast-carriage-agency';
    $date =  date('mdY');
    $filename = "REDEGGMRKTar20_cfx_" . $date . "return_file.txt";
    $conn_id = ftp_connect($server);
    $login_result = ftp_login($conn_id, $user, $pass);
    ftp_pasv($conn_id, true);
    if ($login_result == true) {
        $success = ftp_get($conn_id, $filename, $filename, FTP_ASCII);
        if ($success) {
            // parse file

        } else {
            $fail_file = 'fail.txt';
            $fail = fopen($fail_file,'w');
            fwrite($fail, 'result is now  ' . $login_result);
            fclose($fail);
        }
    }
}


function car_fax_ftp_inbound($files = '') {

    if (!empty($files)) {
        $server = 'data.carfax.com';
        $user = 'REDEGGMRKT';
        $pass = 'proposed-fast-carriage-agency';
        $conn_id = ftp_connect($server);
        $login_result = ftp_login($conn_id, $user, $pass);
        ftp_pasv($conn_id, true);

        if ( $login_result == true) {
            foreach($files as $file) {
                ftp_put($conn_id, $file, $file, FTP_ASCII);
                if (ftp_put($conn_id, $file, $file, FTP_ASCII)) {
                    $success_file = 'success.txt';
                    $success = fopen($success_file,'w');
                    fwrite($success, 'result is now the king!! ' . $login_result);
                    fclose($success);
                }
            }
        }

        ftp_close($conn_id);
    } else {
        return false;
    }
}