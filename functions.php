<?php
/**
 * cls functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package cls
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.1.0.3' );
}

if ( ! function_exists( 'cls_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function cls_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on cls, use a find and replace
		 * to change 'cls' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'cls', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in two locations.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'cls' ),
				'menu-2' => esc_html__( 'Secondary Menu', 'cls' ),
				'menu-12' => esc_html__( 'Footer Menu', 'cls' ),
				'menu-13' => esc_html__( 'Footer Menu #2', 'cls' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'cls_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'cls_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function cls_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'cls_content_width', 640 );
}
add_action( 'after_setup_theme', 'cls_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function cls_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'cls' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'cls' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'cls_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function cls_scripts() {
	global $post;

	wp_enqueue_style('cls-fonts', 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,900&display=swap', [], null);
	wp_enqueue_style( 'cls-style', get_stylesheet_uri(), ['cls-fonts'], _S_VERSION );
	wp_style_add_data( 'cls-style', 'rtl', 'replace' );

	wp_enqueue_script( 'cls-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION . date("U"), true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

}

add_action( 'wp_enqueue_scripts', 'cls_scripts' );


function cls_browser_body_class($classes) {
        global $is_lynx, $is_gecko, $is_IE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone;
        if($is_lynx) $classes[] = 'lynx';
        elseif($is_gecko) $classes[] = 'gecko';
        elseif($is_opera) $classes[] = 'opera';
        elseif($is_NS4) $classes[] = 'ns4';
        elseif($is_safari) $classes[] = 'safari';
        elseif($is_chrome)  $classes[] = 'chrome'; 
        elseif($is_IE) {
                $classes[] = 'ie';
                if(preg_match('/MSIE ([0-9]+)([a-zA-Z0-9.]+)/', $_SERVER['HTTP_USER_AGENT'], $browser_version))
                $classes[] = 'ie'.$browser_version[1];
            	if (!is_admin()) {
            		wp_deregister_script('wp-main-js');
            		wp_enqueue_script('cls-faq-id', get_template_directory_uri() . '/js/faq.js', [], 'v1', true);
            	}
        } else $classes[] = 'unknown';
        if($is_iphone) $classes[] = 'iphone';

        if (array_key_exists('HTTP_USER_AGENT', $_SERVER)) {
        	if ( stristr( $_SERVER['HTTP_USER_AGENT'],"mac") ) {
        	         $classes[] = 'osx';
        	   } elseif ( stristr( $_SERVER['HTTP_USER_AGENT'],"linux") ) {
        	         $classes[] = 'linux';
        	   } elseif ( stristr( $_SERVER['HTTP_USER_AGENT'],"windows") ) {
        	         $classes[] = 'windows';
        	   }
       	}
        return $classes;
}
add_filter('body_class','cls_browser_body_class');



function clslogin_logo() { ?>
    <style type="text/css">

        #login h1 a, .login h1 a {
            background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/img/cls-full-logo.svg);
			height:195px;
			width:300px;
			background-size: 300px 195px;
			background-repeat: no-repeat;
        }
    </style>
<?php }


/**
* Allow additional MIME types
* Use 'text/plain' instead of 'application/json' for JSON because of a current Wordpress core bug
*/

function add_upload_mimes( $types ) { 
	$types['json'] = 'text/plain';
	return $types;
}
add_filter( 'upload_mimes', 'add_upload_mimes' );


add_action( 'login_enqueue_scripts', 'clslogin_logo' );



/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';


/**
 * Custom Blocks
 */
require get_template_directory() . '/support/blocks.php';


/**
 * Custom End Points
 */
require get_template_directory() . '/inc/custom-endpoints.php';


/**
 * Media
 */
require get_template_directory() . '/inc/media.php';



/**
 * Options 
 */
require get_template_directory() . '/inc/options.php';


/**
 * Custom Menu Walkter
 */
require get_template_directory() . '/inc/custom-walker.php';


/**
 * Post saving
 */
require get_template_directory() . '/inc/posts.php';



/**
 * Menu Functions
 */
require get_template_directory() . '/inc/menu-functions.php';


/**
 * Importing Functions and Cron Jobs
 */
require get_template_directory() . '/inc/import.php';


/**
 * Importing Car Fax
 */
require get_template_directory() . '/inc/car-fax.php';

/**
 * Post Filters
 */
require get_template_directory() . '/inc/posts-filter.php';


/**
 * Form Filters
 */
require get_template_directory() . '/inc/form-filters.php';


/**
 * Redirects
 */
require get_template_directory() . '/inc/redirects.php';


/**
 * Shortcodes
 */
require get_template_directory() . '/inc/shortcodes.php';



/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

