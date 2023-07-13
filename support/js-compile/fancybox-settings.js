require('es6-promise/auto');
(function() {

	Fancybox.defaults.closeButton = 'outside';
	Fancybox.defaults.Carousel = {
		Navigation: {
			prevTpl : '',
			nextTpl : ''
		}
	};

	Fancybox.bind('.wp-block-gallery .wp-block-image a', {
		groupAll : true,
		Carousel : {
			Navigation : {
				prevTpl :
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 5l-7 7 7 7"/><path d="M4 12h16"/></svg>',
				nextTpl:
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12h16"/><path d="M13 5l7 7-7 7"/></svg>',
			}
		}
	});

})();