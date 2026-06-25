<?php

add_action('save_post_videos', 'cls_update_video', 10, 3);

function cls_update_video() {
	global $post;
	// required libraries for media_sideload_image
	require_once(ABSPATH . 'wp-admin/includes/file.php');
	require_once(ABSPATH . 'wp-admin/includes/media.php');
	require_once(ABSPATH . 'wp-admin/includes/image.php');

	$id = $post->ID;

	$video = get_field('featured_video', $id);

	preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $video, $matches);

	$video_id = $matches[1];

	// Get Thumbnail
	$file_headers = get_headers( 'http://img.youtube.com/vi/' . $video_id . '/maxresdefault.jpg' );
	$is_404 = $file_headers[0] == 'HTTP/1.0 404 Not Found' || false !== strpos( $file_headers[0], '404 Not Found' );
	$video_thumbnail_url = $is_404 ? 'http://img.youtube.com/vi/' . $youtube_id . '/maxresdefault.jpg' : 'http://img.youtube.com/vi/' . $video_id . '/hqdefault.jpg';


	// load the image
	$result = media_sideload_image($video_thumbnail_url, $id);

	$attachments = get_posts(array('numberposts' => '1', 'post_parent' => $id, 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => 'ASC'));

	if(sizeof($attachments) > 0 && has_post_thumbnail($id) == false){
	    // set image as the post thumbnail
	    set_post_thumbnail($id, $attachments[0]->ID);
	}
}


/**
 * Tell WordPress how to interpret our project URL structure
 *
 * @param array $rules Existing rewrite rules
 * @return array
 */
function cls_vehicle_add_rewrite_rules( $rules ) {
  $new = array();
  $new['vehicle/([^/]+)/(.+)/?$'] = 'index.php?vehicle=$matches[2]';
  $new['vehicle/(.+)/?$'] = 'index.php?make=$matches[1]';

  return array_merge( $new, $rules ); // Ensure our rules come first
}
add_filter( 'rewrite_rules_array', 'cls_vehicle_add_rewrite_rules' );

// rewrite rules for vehicles, use make for url structure

function cls_filter_post_type_link( $link, $post ) {
  if ( $post->post_type == 'vehicle' ) {
  	$make = get_the_terms( $post->ID, 'make' );
    if ($make && ! is_wp_error( $make )) {
      	$link = str_replace( '%make%', current( $make )->slug  , $link );
    } else {
    		$link = str_replace( '%make%', 'unknown', $link );
    }
  }
  
  return $link;
}
add_filter( 'post_type_link', 'cls_filter_post_type_link', 10, 2 );


?>