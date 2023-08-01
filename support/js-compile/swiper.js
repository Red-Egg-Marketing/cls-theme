import Swiper from 'swiper/bundle';

(function() {

	new Swiper('.vehicle.swiper', 
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
  			}
		}
	);
	
})();