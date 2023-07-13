<?php

	function acf_location_rules_types($choices) {
	    $choices['Menu']['menu_level'] = 'Primary Menu';
	    return $choices;
	}

	add_filter('acf/location/rule_types', 'acf_location_rules_types');

	add_filter('acf/location/rule_values/menu_level', 'acf_location_rule_values_level');
	function acf_location_rule_values_level($choices) {
	    $choices[0] = '0';
	    $choices[1] = '1';
	    $choices[2] = '2';
	
	    return $choices;
	}
	add_filter('acf/location/rule_match/menu_level', 'acf_location_rule_match_level', 10, 4);

	function acf_location_rule_match_level($match, $rule, $options, $field_group) {

		if (function_exists('get_current_screen')) {
	    	$current_screen = get_current_screen();
	
	    	if ($current_screen->base == 'nav-menus') {
	    	    if ($rule['operator'] == "==" && !empty($options['nav_menu_item_depth'])) {
	    	        $match = ($options['nav_menu_item_depth'] == $rule['value']);
	    	    }
	    	}
	    	return $match;
		}
	}


	add_filter('wp_nav_menu_objects', 'my_wp_nav_menu_objects', 10, 2);

	function my_wp_nav_menu_objects( $items, $args ) {
	
		// loop
		foreach( $items as &$item ) {
			// vars
			$icon = get_field('menu_icon', $item);
			// append icon
			if( $icon ) {
				$url = $icon;
			
				$item->title = '<span class="menu-icon"><img src="' . $url . '" /></span> ' . $item->title;
			
			}
		
		}
	
	
		// return
		return $items;
	
	}

?>