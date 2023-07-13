require('es6-promise/auto');

(function() {

	function ProgressScroll() {

		var progress = document.querySelectorAll('.progress-block');
		var progObj = [];
		var win = window;
		var winH = win.outerHeight;
		var scrollY = win.pageYOffset;
		var masthead = document.querySelector('#masthead');
		var nav = masthead.querySelector('.main-content-nav');
		var body = document.querySelector('body');
		let winWidth = window.innerWidth;
		var width = 768;

		if (progress.length > 0) {			
			buildScrollSlide();
		}


		function buildScrollSlide() {

			let controller = new ScrollMagic.Controller();
			let navHeight = nav.offsetHeight;
			let scene = null;

			progress.forEach(function(prog, index){
				let id = prog.getAttribute('id');
				let stepCont = prog.querySelector('.steps-container');
				let height = stepCont.offsetHeight;
				let steps = prog.querySelectorAll('.step');
				let offsetTop = stepCont.offsetTop;
				let total = steps.length;
				let stepProg = prog.querySelector('.step-progress span');
				let counter = 0;
				height = height * total;

				steps.forEach(function(step, sIndex){
					let stepContInt = step.querySelectorAll('.step-title');
					stepContInt.forEach(function(para, pIndex){
						// let itemHeight = para.offsetHeight;
						if (para.classList.contains('step-title')) {
							para.addEventListener('click', function(event){
								let percent = (((sIndex)/total)/1);
								percent = percent.toFixed(2);
								let scrollheight = 0;

								scrollheight += percent == 0 ? ((offsetTop - navHeight) + (height * percent)) : ((offsetTop - navHeight) + (height * percent)) + 25;
								
								controller.scrollTo(scrollheight);

							});
						}
					});
					
				});

				if (scene == null && winWidth > width) {
					scene = new ScrollMagic.Scene({
						triggerElement : '#' + id + ' .steps-container',
						triggerHook: 0,
						offset: '-' + navHeight,
						duration: height
					})
					.setPin('#' + id + ' .steps-container')
					.addTo(controller);

					scene.on('progress', function(event){

						let progItem = event.progress;
						let progPercent = progItem * 100;
						let its = 1/(total);
						let current = Math.floor(progItem/its) < total ? Math.floor(progItem/its) : total - 1;
						let stepImg = prog.querySelector('.steps-img img');
						let stepSource = prog.querySelector('.steps-img source');
						stepProg.style.height = progPercent + '%';
						let sCont = steps[current].querySelector('.step-container');
						let sImg = sCont.getAttribute('data-image');
						if (sImg) {
							sImg = JSON.parse(sImg);
							let imgSrc = sImg[0].srcSet.large;
							let shouldTrigger = current == counter ? true : false;
	
							stepImg.setAttribute('src', imgSrc);

							if (stepSource) {
								stepSource.setAttribute('srcset', imgSrc);
							}
						}

					
						steps.forEach(function(step, sIndex){
							if (sIndex != current) {
								step.classList.remove('active');
							}
						});

						steps[current].classList.add('active');

						if (winWidth < 768) {
							scene.destroy(true);
							scene = null;
						}
					});
				}

			});

			window.addEventListener('resize', function(){

				winWidth = window.innerWidth;

				if (winWidth < 768) {
					if (controller != null) {
						controller.destroy(true);
						scene.destroy(true);
						controller = null;
						scene = null;
					}
				} else {
					controller = new ScrollMagic.Controller();
				}
			});
		}
	}

	ProgressScroll();
	
})();