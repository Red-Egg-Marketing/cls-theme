import Swiper from 'swiper/bundle';

(function() {

	new Swiper('.testimonials-block .swiper', 
		{
			loop: false,
			slidesPerView: 1,
			autoplay: true,
			effect: 'slide',
			spaceBetween: 0,
			speed: 800,
			navigation: {
    			nextEl: '.swiper-button-next',
    			prevEl: '.swiper-button-prev',
  			}
		}
	);
	
})();