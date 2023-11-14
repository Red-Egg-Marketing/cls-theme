/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {

	var siteNavigation = document.getElementById( 'site-navigation' );
	var body = document.getElementsByTagName( 'body' )[ 0 ];
	var isTouch = typeof window.ontouchstart == 'undefined' ? false : true;
	var navWrapper = document.getElementById( 'masthead' );
	var numbers = document.getElementsByClassName(' wppro_badge1_SPAN_15 ');
	var readMore = document.querySelectorAll('.read-less-block .read-more')
	var readLess = document.querySelectorAll('.read-more-block .read-less')
	var tabs = document.querySelectorAll('.tabs button');

	for (var x = 0; x < tabs.length; x++) {
		let tab = tabs[x];
		tab.addEventListener('click', function(){
			let dataId = this.getAttribute('data-id');
			let siblingTabs = this.parentElement.querySelectorAll('button');
			let selectTab = document.getElementById(dataId);
			let childTabs = tab.parentElement.nextElementSibling.querySelectorAll('.tabcontent');
			siblingTabs.forEach((siblingTab) => {
				siblingTab.classList.remove('active');
			});
			childTabs.forEach((childTab) => {
				childTab.classList.remove('active')
			});
			selectTab.classList.add('active');
			this.classList.add('active');
		});
	}

	for(var x = 0; x < readMore.length; x++) {
		let read = readMore[x];
		read.addEventListener('click', function(){
			let grand = read.parentElement.parentElement;
			let more = grand.nextElementSibling;
			grand.classList.add('hide');
			more.classList.remove('hide');
		});
	}

	for(var x = 0; x < readLess.length; x++) {
		let read = readLess[x];
		read.addEventListener('click', function(){
			let grand = read.parentElement;
			let more = grand.previousElementSibling;
			grand.classList.add('hide');
			more.classList.remove('hide');
		});
	}



	for(var x = 0; x < numbers.length; x++) {
		var number = numbers[0].innerText;

		var newNum = new Intl.NumberFormat().format(number);

		numbers[0].innerText = newNum;

	}



	if (isTouch == true) {
		document.addEventListener('touchend', removeMenuToggle);
		document.navigation = siteNavigation;
	}

	// Return early if the navigation don't exist.
	if ( ! siteNavigation ) {
		return;
	}

	var button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];


	var subButtons = siteNavigation.getElementsByClassName( 'toggle-menu' );


	if ('undefined' !== typeof subButtons) {
		for (var subButton of subButtons) {
			subButton.addEventListener('click', function(){
				let parent = this.parentElement;
				
				parent.classList.toggle('active');
			});
		}
	}

	// Return early if the button don't exist.
	if ( 'undefined' === typeof button ) {
		return;
	}

	var menu = siteNavigation.getElementsByTagName( 'ul' )[ 0 ];


	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( ! menu.classList.contains( 'nav-menu' ) ) {
		menu.classList.add( 'nav-menu' );
	}

	window.addEventListener('scroll', function(){
		let navheight = navWrapper.clientHeight;
		let scrollY = window.pageYOffset;
		let page = document.getElementById('page');

		if (scrollY > navheight) {
			navWrapper.classList.add('fixed');
			page.style.paddingTop = navheight + 'px';
			
		} else {
			navWrapper.classList.remove('fixed');
			page.style.paddingTop = '0px';
		}

	});

	// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
	button.addEventListener( 'click', function() {
		siteNavigation.classList.toggle( 'toggled' );

		body.classList.toggle( 'nav-active' );

		if ( button.getAttribute( 'aria-expanded' ) === 'true' ) {
			button.setAttribute( 'aria-expanded', 'false' );
		} else {
			button.setAttribute( 'aria-expanded', 'true' );
		}
	} );

	// Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
	document.addEventListener( 'click', function( event ) {
		var isClickInside = siteNavigation.contains( event.target );

		if ( ! isClickInside ) {
			siteNavigation.classList.remove( 'toggled' );
			body.classList.remove( 'nav-active' );
			button.setAttribute( 'aria-expanded', 'false' );
		}
	} );

	// Get all the link elements within the menu.
	var links = menu.getElementsByTagName( 'a' );

	// Get all the link elements with children within the menu.
	var linksWithChildren = menu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

	// Toggle focus each time a menu link is focused or blurred.
	for ( var link of links ) {
		link.addEventListener( 'focus', toggleFocus, true );
		link.addEventListener( 'blur', toggleFocus, true );
	}

	// Toggle focus each time a menu link with children receive a touch event.
	for ( var link of linksWithChildren ) {
		link.addEventListener( 'touchstart', toggleFocus, false );
	}


	function removeMenuToggle(event) {

		var target = event.target;
		var nav = event.currentTarget.navigation;
		var isChild = nav != null ? nav.contains( target ) : false;

		if (isChild == false) {
			var children = siteNavigation.querySelectorAll('.menu-item-has-children');

			children.forEach(child => {
				child.classList.remove('focus');
			});

		}

	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		if ( event.type === 'focus' || event.type === 'blur' ) {
			let self = this;
			// Move up through the ancestors of the current link until we hit .nav-menu.
			while ( ! self.classList.contains( 'nav-menu' ) ) {
				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					self.classList.toggle( 'focus' );
				}
				self = self.parentNode;
			}
		}

		if ( event.type === 'touchstart' ) {
			
			var menuItem = this.parentNode;
			var current = event.currentTarget

			current.addEventListener('touchstart', function(event){
				return true;
			});

			for ( var link of menuItem.parentNode.children ) {
				if ( menuItem !== link ) {
					link.classList.remove( 'focus' );
				}
			}
			menuItem.classList.toggle( 'focus' );

			return false;
		}
	}

	document.querySelectorAll('a').forEach(anchor => {

		if (anchor.hash != '') {
			var baseUrl = window.location.origin + window.location.pathname;
			var anchorLink = anchor.href.replace(anchor.hash, '');
			var isModal = anchor.hasAttribute('data-fancybox') != null ? true : false;
		
			if (anchorLink == baseUrl) {
   				anchor.addEventListener('click', function (e) {

    			   	e.preventDefault();
    			   	document.querySelector(anchor.hash).scrollIntoView({
    			       	behavior: 'smooth'
    			   	});
    			});

   			}

   		}
   		
	});

}() );
