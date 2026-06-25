<?php
if ( ! wp_next_scheduled( 'cls_vehicles_carfax_outbound' ) ) {
    wp_schedule_event( strtotime( 'today midnight' ), '24hrs', 'cls_vehicles_carfax_outbound' );
}
add_action( 'cls_vehicles_carfax_outbound', 'car_fax_ftp_outbound' );

function car_fax_ftp_outbound() {
    global $wpdb;

    $server = 'data.carfax.com';
    $user   = 'REDEGGMRKT_get';
    $pass   = 'proposed-fast-carriage-agency';

    $date     = date( 'mdY' );
    $filename = 'REDEGGMRKT_cfx_' . $date . '_return_file.txt';
    $local    = trailingslashit( wp_upload_dir()['basedir'] ) . $filename;

    $conn_id = ftp_connect( $server );
    if ( ! $conn_id ) {
        error_log( 'carfax: ftp_connect failed to ' . $server );
        return;
    }
    if ( ! ftp_login( $conn_id, $user, $pass ) ) {
        error_log( 'carfax: ftp_login failed' );
        ftp_close( $conn_id );
        return;
    }
    ftp_pasv( $conn_id, true );

    if ( ! ftp_get( $conn_id, $local, $filename, FTP_ASCII ) ) {
        error_log( 'carfax: ftp_get failed for ' . $filename );
        ftp_close( $conn_id );
        return;
    }
    ftp_close( $conn_id );

    $import = fopen( $local, 'r' );
    if ( ! $import ) {
        error_log( 'carfax: could not open ' . $local );
        return;
    }

    while ( ! feof( $import ) ) {
        $line  = explode( '|', fgets( $import ) );
        $vin   = $line[1] ?? false;
        $link  = $line[2] ?? false;
        $image = $line[3] ?? false;

        if ( ! $vin ) {
            continue;
        }

        $post = $wpdb->get_col( $wpdb->prepare(
            "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'vin' AND meta_value = %s",
            $vin
        ) );

        if ( empty( $post ) ) {
            continue;
        }

        wp_update_post( [
            'ID'         => $post[0],
            'meta_input' => [
                'carfax_image' => $image,
                'carfax_link'  => $link,
            ],
        ] );
    }

    fclose( $import );
    unlink( $local );
}