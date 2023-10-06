import Swiper from 'swiper/bundle';

(function() {

	new Swiper('.related-vehicle.swiper', 
		{
			loop: true,
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

	let count = document.querySelectorAll('.vehicle.swiper .swiper-slide');
	count = count.length;

	let vehicles = new Swiper('.vehicle.swiper', 
		{
			loop: true,
			slidesPerView: 1,
			autoplay: false,
			effect: 'slide',
			spaceBetween: 15,
			loopedSlides: count,
			speed: 800,
			navigation: {
    			nextEl: '.swiper-button-next',
    			prevEl: '.swiper-button-prev',
  			}
		}
	);

	let thumbnails = new Swiper('.thumbnails.swiper', 
		{
			loop: true,
			slidesPerView: 6,
			autoplay: false,
			effect: 'slide',
			spaceBetween: 0,
			loopedSlides: count,
			slideToClickedSlide: true,
			spaceBetween: 5,
		}
	);
	
	if (thumbnails.slides || vehicles.slides) {
		thumbnails.controller.control = vehicles;
		vehicles.controller.control = thumbnails;
	}

	
})();