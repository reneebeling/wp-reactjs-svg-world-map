<?php

/*
  Plugin Name: WP ReactJS SVG World Map
  Plugin URI: https://github.com/reneebeling/wp-reactjs-svg-world-map
  Description: A simple WordPress Plugin to display a svg (world) map on a Wordpress page
  Version: 0.1.0
  Author: Rene Ebeling
  Author URI: http:https://github.com/reneebeling
  License: GPL2
  License URI: https://www.gnu.org/licenses/gpl-2.0.html
  Text Domain: wp-reactjs-svg-world-map
  Domain Path: /languages
 */

// allowed to do s.th.?
if (!defined('ABSPATH') || !function_exists('add_action')) {
    die(-1);
}

// base plugin class
class wp_reactjs_svg_map {

// reused option keys 
    protected const activeCountryColor = 'active_country_color';
    protected const inActiveCountryColor = 'inactive_country_color';
    protected const countryHoverColor = 'country_hover_color';

    public function __construct() {

// Plugin Details
        $this->plugin = new stdClass;
        $this->plugin->name = 'wp-reactjs-svg-world-map'; // Plugin Folder
        $this->plugin->displayName = 'WP ReactJS SVG World Map'; // Plugin Name
        $this->plugin->version = '0.2.1';
        $this->plugin->folder = plugin_dir_path(__FILE__);
        $this->plugin->url = plugin_dir_url(__FILE__);
        $this->plugin->db_welcome_dismissed_key = $this->plugin->name . '_welcome_dismissed_key';

//$this->$debug_output_message = "";
// add base ReactJS script to the public front-end
//add_action('wp_enqueue_scripts', 'map_enqueue_script');

        $my_js_ver = date("ymd-Gis", filemtime(plugin_dir_path(__FILE__) . '/dist/react-svg-world-map.js'));
        wp_enqueue_script('react-svg-world-map-plugin', plugins_url('/dist/react-svg-world-map.js', __FILE__), array(), $my_js_ver, true);

// Hooks
        add_action('admin_notices', array(&$this, 'dashboardNotices'));
        add_action('wp_ajax_' . $this->plugin->name . '_dismiss_dashboard_notices', array(&$this, 'dismissDashboardNotices'));

        add_action('rest_api_init', 'prefix_register_svg_map_data_routes');
    }

    /**
     * Show relevant notices for the plugin
     */
    function dashboardNotices() {
        global $pagenow;

        if (!get_option($this->plugin->db_welcome_dismissed_key)) {
            if (!( $pagenow == 'options-general.php' && filter_input(INPUT_POST, 'page', FILTER_SANITIZE_STRING) == 'wp-reactjs-svg-world-map' )) {
// OLD: $setting_page = admin_url('options-general.php?page=' . $this->plugin->name);
                admin_url('options-general.php?page=' . $this->plugin->name);
// load the notices view
                include_once( $this->plugin->folder . '/views/dashboard-notices.php' );
            }
        }
    }

    /**
     * Dismiss the welcome notice for the plugin
     */
    function dismissDashboardNotices() {
        check_ajax_referer($this->plugin->name . '-nonce', 'nonce');
// user has dismissed the welcome notice
        update_option($this->plugin->db_welcome_dismissed_key, 1);
        exit;
    }

    /**
     * enqueue the react based javascript to visulize a world map.
     */
    public function map_enqueue_script() {
        $my_js_ver = date("ymd-Gis", filemtime(plugin_dir_path(__FILE__) . '/assets/js/react-svg-world-map.js'));
        wp_enqueue_script('react-svg-world-map-plugin', plugins_url('/assets/js/react-svg-world-map.js', __FILE__), array(), $my_js_ver, true);
    }

// initialize some options for custom sass/scss/css
    public static function on_activate_function() {
// default
        /*
          update_option(self::$activeCountryColor, "#f38787"); // pink
          update_option(self::$inActiveCountryColor, "#dadada"); // grey
          update_option(self::$countryHoverColor, "#f30000"); // red
         */
//update_option(self::$debug_prints_enabled, 0); // 0 = false
    }

// default
    public static function on_deactivate_function() {
        
    }

// remove options for custom sass/scss/css
    public static function on_uninstall_function() {
        /*
          delete_option(self::$activeCountryColor);
          delete_option(self::$inActiveCountryColor);
          delete_option(self::$countryHoverColor);
         */
//delete_option(self::$debug_prints_enabled);
    }

}

if (class_exists('wp_reactjs_svg_map')) {
    $_wp_reactjs_svg_map = new wp_reactjs_svg_map();
}

// on activation
register_activation_hook(__FILE__, array('wp_reactjs_svg_map', 'on_activate_function'));

// on deactivation
register_deactivation_hook(__FILE__, array('wp_reactjs_svg_map', 'on_deactivate_function'));

// on uninstall
register_uninstall_hook(__FILE__, array('wp_reactjs_svg_map', 'on_uninstall_function'));

/**
 * This is a callback function that embeds a phrase in a WP_REST_Response
 */
function get_endpoint_svg_map_names_and_links($request) {

    // example default array
    $links = array(
        "DE" => array("name" => 'Deutschland', "url" => '/category/travel/europa/deutschland'),
        "BE" => array("name" => 'Belgien', "url" => '/category/travel/europa/deutschland'),
        "US" => array("name" => 'USA', "url" => '/category/travel/europa/deutschland'),
        "CA" => array("name" => 'Kanada', "url" => '/category/travel/europa/deutschland'),
        "RU" => array("name" => 'Russland', "url" => '/category/travel/europa/deutschland'),
        "ES" => array("name" => 'Spanien', "url" => '/category/travel/europa/spanien'),
    );

    if (isset($request['filter'])) {
        if ($request['filter'] === "en") {
            $links = array(
                "DE" => array("name" => 'Germany', "url" => '/category/travel/europa/deutschland'),
                "BE" => array("name" => 'Belgium', "url" => '/category/travel/europa/deutschland'),
                "US" => array("name" => 'USA', "url" => '/category/travel/europa/deutschland'),
                "CA" => array("name" => 'Canada', "url" => '/category/travel/europa/deutschland'),
                "RU" => array("name" => 'Russia', "url" => '/category/travel/europa/deutschland'),
                "ES" => array("name" => 'Spain', "url" => '/category/travel/europa/spanien'),
            );
        }
    }

    return rest_ensure_response($links);
}

function prefix_filter_arg_validate_callback($value, $request, $param) {
    // If the 'filter' argument is not a string return an error.
    if (!is_string($value)) {
        return new WP_Error('rest_invalid_param', esc_html__('The filter argument must be a string.', 'wp-react-svg-map'), array('status' => 400));
    }

    // Get the registered attributes for this endpoint request.
    $attributes = $request->get_attributes();

    // Grab the filter param schema.
    $args = $attributes['args'][$param];

    // If the filter param is not a value in our enum then we should return an error as well.
    if (!in_array($value, $args['enum'], true)) {
        return new WP_Error('rest_invalid_param', sprintf(__('%s is not one of %s'), $param, implode(', ', $args['enum'])), array('status' => 400));
    }
}

/**
 * This function contains the arguments for available svg map languages endpoints
 * => supported languages for country names
 */
function prefix_get_language_arguments() {
    $args = array();
// schema for the filter argument
    $args['filter'] = array(
        'description' => esc_html__('The filter parameter is used to filter the collection of available languages for country names', 'wp-react-svg-map'),
        'type' => 'string',
        'enum' => array('de', 'en'),
    );
    return $args;
}

/**
 * This function is used to register the routes for additional svg map data endpoints
 */
function prefix_register_svg_map_data_routes() {
    register_rest_route('react-svg-map/data/v1', '/country-names-and-links', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'get_endpoint_svg_map_names_and_links',
        'args' => prefix_get_language_arguments(),
        'validate_callback' => 'prefix_filter_arg_validate_callback',
    ));
}
