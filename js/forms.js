/**
 * File forms.js - for Whitepaper cookie submission
 */
( function( $ ) {

	let pageID = paths.page_id;
	let initajaxForm = function() {
		$.get(
			paths.ajaxUrl,
			{
				'action' : 'cls_cookie_pick',
				'page_id' : pageID
			},
			function(response) {
				let formCont = $('.form-wrapper-load');
				formCont.html(response);
			}
		);
	}

	window.addEventListener('DOMContentLoaded', initajaxForm);

	$(document).on('gform_confirmation_loaded', function(e, form_id){
		create_whitepaper_cookie('whitepaper-cookie-' + pageID, true, 180);
		$.get(
			paths.ajaxUrl,
			{
				'action' : 'cls_cookie_pick',
				'page_id' : pageID
			},
			function(response) {
				let formCont = $('.form-wrapper-load');
				formCont.html(response);
			}
		);
	});


	function create_whitepaper_cookie(name, value, days) {

		let expires = '';

		if (days) {
			let date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = '; expires=' + date.toUTCString();
		}
		document.cookie = name + '=' + value + expires + '; path=/';

	}

}( jQuery ) );
