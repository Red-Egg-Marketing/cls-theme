(function($) {

	function ActivateScrollEffect() {
		var slides = $('.slides-wrap');
		var sObject = [];
		var win = window;
		var width = 768;
		BuildSlider();

		$(document).on("click", "a[href^='#']", scrollToSlide);
		$(window).on("resize", slideDestroyer);

		function slideDestroyer() {
			for (const index in sObject) {
			}
		}

		function scrollToSlide() {
			event.preventDefault();
			let id = $(this).attr("href");
			let navId = $(this).attr("id");
			id = id.replace('#', '');
			if (id.length > 0) {
				GetSlideByID(id);
				ActivateSlideNav(id);
			}
		}

		function BuildSlider() {
			GetIDSlides(slides);
			if (!isEmpty(sObject)) {
				ActivateTimeline();
				AppendSlideActions();
				AppendScrollActions();
				BuildAnchorNav();
			} else {
				return;
			}
		}

		function ActivateSlideNav(id) {
			let activeNav = $('.slide-nav[href="#' + id + '"]');
			let otherNav = $('.slide-nav');

			otherNav.removeClass('active');
			activeNav.addClass('active');
		}


		function checkTimelineProgress() {
		
			for (const index in sObject) {
				let timeline = sObject[index].slider.timeline;
				let progress = timeline.progress();
				let percent = progress * 100;
				let slides = sObject[index].slider.slides;
				let total = slides.length;
				let nav = sObject[index].slider.nav;
				let indicator = $(nav).find('.progress-span');
				let it = index;
				let navPercent = sObject[index].slider.navPercent;
				let slidePercent = 100/total;
				let slideTotal = total * 100;
				indicator.css('height', percent + '%');

				slides.each(function(index, slide){
					let curSlidMax = slidePercent * (index + 1);
					let curSlidMin = slidePercent * (index);
					let curSlideTotal = (100 * (index + 1) - 100);
					let curSlidePercent = (slideTotal * progress) - curSlideTotal;
					let id = $(slide).attr('id');
					

					// this will test for the current slide
					if (percent >= curSlidMin && percent <= curSlidMax) {

						let activeNav = $('.slide-nav[href="#' + id + '"]');
						let otherNav = $('.slide-nav:not([href="#' + id + '"])');
						let curSlide = slide;
						let imgWrap = $(curSlide).find('.img-wrap');
						let slideImg = $(imgWrap).find('img.app-media');
						let content = $(curSlide).find('.text-wrap');
						let innerWrap = $(curSlide).find('.inner-wrap');
						let slideTitle = $(curSlide).find('.slide-title');
						let otherSlides = slides.filter((key, element) => {
							return index != key;
						});
						let animateFill = $(curSlide).find('.animate-fill');
						let scrimPercent = 36 * (curSlidePercent/100);
						let otherWrap = $(otherSlides).find('.inner-wrap');
						let otherSlideImg = $(otherSlides).find('img.app-media');
						let imgPer = 20 * (curSlidePercent/100);

						otherNav.removeClass('active');
						activeNav.addClass('active');

						TweenMax.to(curSlide, 0, {css: { display: "flex", opacity: 1 }} );
						TweenMax.to(otherWrap, 0.75, {css: {opacity : 0}});
						TweenMax.to(otherSlideImg, 3.5, {css: {opacity : 0}});
						TweenMax.to(slideImg, 1.5, {css: {opacity : 1}});
						TweenMax.set(slideImg, { css: { marginLeft: "-" + imgPer + "px"}});

						if (index == 0) {
							TweenMax.set(animateFill, {css: {width: scrimPercent + "%" }});
						} else {
							TweenMax.set(animateFill, {css: {width: "36%" }});
							TweenMax.to(innerWrap, 0.5, {css: {opacity: 1}});
						}
						
						if (curSlidePercent >= 15) {
							let adjsOpacPerc = (curSlidePercent - 15)/85;
							let bgSize = adjsOpacPerc * 50;

							// TweenMax.set(innerWrap, {css: {opacity: adjsOpacPerc}});
							if (index == 0) {
								TweenMax.to(innerWrap, 0.5, {css: {opacity: 1}});
							}
							// TweenMax.set(slideTitle, {css: {backgroundSize: bgSize + "px 5px"}});
						}

						// } else if(curSlidePercent < 15) {
						// 	TweenMax.to(innerWrap, 0.3, {css: {opacity: 0}});
						// } 
						TweenMax.set(otherSlides, { className: "-=active-slide"});
						TweenMax.set(curSlide, { className: "+=active-slide" });
						

					} else {
						// otherNav.removeClass('active');
					}

				});
			}
		}


		function BuildAnchorNav() {
			for (const index in sObject) {
				let slides = sObject[index].slider.slides;
				let id = sObject[index].slider.slideId;
				let wrapper = sObject[index].slider.wrapper;
				let innerWrap = wrapper.find('.inner-wrap');
				let par = wrapper.closest('.block-wrapper');
				let it = index;

				if (slides.length > 0) {
					let $navW = $('<div>', {id: 'navigation-' + id, "class" : "slides-navigation"})
					let $nav = $('<ul>', {"class" : "slides-nav-list"});
					let totSlides = slides.length;
					slides.each(function(index, value){
						let percent = sObject[it].slider.navPercent;
						let top = (percent * (index + 1) - percent);
						let $li = $('<li>', {class: 'slide-item'});
						$li.css('top', top + '%');
						let slideId = slides[index].id;
						let $a = $('<a>', {href: "#" + slideId, id: 'nav-' + slideId + '-' + index, text: "Go To", class: 'slide-nav'});
						$li.append($a);
						$nav.append($li);
					});
					$navW.append($nav);
					innerWrap.append($navW);
					sObject[index].slider.nav = $navW;
				}
			}
		}


		function AppendScrollActions() {
			
			for (const index in sObject) {
				let id = sObject[index].slider.slideId;
				let wrapper = sObject[index].slider.wrapper;
				let par = wrapper.closest('.block-wrapper');
				let parId = par.attr('id');
				let sliderSlides = sObject[index].slider.slides;
				let total = sliderSlides.length;
				let per = (total * 100) - 100;
				let controller = sObject[index].slider.controller;
				let timeline = sObject[index].slider.timeline;
				$(sliderSlides).each(function (index, slide) {
				    let slideParallaxScene = new ScrollMagic.Scene({
				        triggerElement: slide,
				        triggerHook: 0,
				        duration: "100%"
				    })
				    .setTween(timeline)
				    .addTo(controller);

				});
				
				sObject[index].slider.scene = new ScrollMagic.Scene({
					triggerElement: "#" + parId,
					triggerHook: "onLeave",
					duration: per + "%"
				})
				.setPin("#" + parId)
				.setTween(timeline)
				.addTo(controller);

				sObject[index].slider.scene.on("progress", checkTimelineProgress);

				controller.scrollTo(function (newpos) {
    				TweenMax.to(window, .35, {scrollTo: {y: newpos}, ease:Power1.easeInOut});
				});

			}
			
		}

		function AppendSlideActions() {

			for (const index in sObject) {
				let id = sObject[index].slider.slideId;
				sObject[index].slider.wrapper = $('#' + id);
				sObject[index].slider.slides = sObject[index].slider.wrapper.find('.slide');
				sObject[index].slider.total = sObject[index].slider.slides.length;
				sObject[index].slider.percent = (100/sObject[index].slider.total);
				sObject[index].slider.navPercent = Number.parseFloat(100/(sObject[index].slider.total - 1)).toFixed(5);
				sObject[index].slider.width = (100 * sObject[index].slider.total);
				let it = index;
				let wrapper = sObject[index].slider.wrapper;
				let percent = sObject[index].slider.percent;
				let sliderSlides = sObject[index].slider.slides;
				let width = sObject[index].slider.width;

				wrapper.css('width', width + '%');
				sliderSlides.css('width', percent + '%');

				$(sliderSlides).each(function(index){
					let tweenPer = (percent) * (index + 1);
					let tweenValue = "-" + (tweenPer) + "%";
					if (tweenPer != 100) {
						sObject[it].slider.timeline.add([
							TweenMax.to('#' + id, 1, {progress: tweenValue})
						]);
					}
				});
			}
		}

		function ActivateTimeline() {
			for (const index in sObject) {
				sObject[index].slider.timeline = new TimelineMax();
				sObject[index].slider.controller = new ScrollMagic.Controller();
			}
		}


		function GetIDSlides(slides) {
			$(slides).each(function(index){
				let id = $(this).attr('id');
				sObject[index] = {slider: {slideId: id}}
			});
		}

		function isEmpty(obj) {
    		return Object.keys(obj).length === 0;
		}

		function GetSlideByID(id) {
			for (var i=0; i < sObject.length; i++) {
				let slides = sObject[i].slider.slides;
				let percent = sObject[i].slider.navPercent;
				let controller = sObject[i].slider.controller;
				let timeline = sObject[i].slider.timeline;
				let par = $(slides).closest('.slides');
				let parOffset = $(par)[0].offsetTop;
        		for (var z = 0; z < slides.length; z++) {
        			let sId = slides[z].id;
        			let height = $(slides[z]).outerHeight();
        			// let offset = parseInt($('.entry-content').css('margin-top'));

         			if (sId === id) {
        				let newPos = height * z + parOffset;
        				controller.scrollTo(newPos);
        			}
        		}
    		}
		}


	}

	ActivateScrollEffect();
})(jQuery);