import Swiper from 'swiper/bundle';

(function() {

	new Swiper('.related-vehicle.swiper', 
		{
			loop: false,
			slidesPerView: 1,
			autoplay: true,
			effect: 'slide',
			spaceBetween: 20,
			speed: 800,
			navigation: {
    			nextEl: '.swiper-button-next',
    			prevEl: '.swiper-button-prev',
  			},
  			breakpoints: {
  				768: {
  					slidesPerView: 2,
  					spaceBetween: 30
  				},
  				1100: {
  					slidesPerView: 3,
  					spaceBetween: 60
  				}
  			}
		}
	);

	new Swiper('.vehicle.swiper', 
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