import Swiper from 'swiper/bundle';

(function() {

	new Swiper('.image-links.slideshow .image-swiper .swiper', 
		{
			loop: false,
			slidesPerView: 1,
			autoplay: true,
			effect: 'slide',
			spaceBetween: 40,
			speed: 800,
			navigation: {
    			nextEl: '.swiper-button-next',
    			prevEl: '.swiper-button-prev',
  			},
  			breakpoints: {
  				768 : {
  					slidesPerView: 3
  				},
  				1400 : {
  					slidesPerView: 4
  				}
  			}
		}
	);
	
})();