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

		if (progress.length > 0) {			
			buildScroll();
		}


		function buildScroll() {
		
			progress.forEach(function(prog, index){
				let controller = new ScrollMagic.Controller();
				let timeline = new TimelineMax();
				let navHeight = nav.offsetHeight;
				let steps = prog.querySelectorAll('.step');
				let id = prog.getAttribute('id');
				let stepCont = prog.querySelector('.steps-container');
				let stepProg = prog.querySelector('.step-progress span');
				let offsetTop = stepCont.offsetTop;
				let total = steps.length;
				let per = (total * 100) - 100;
				let counter = 0;

				steps.forEach(function(step, sIndex){

					let stepScene = new ScrollMagic.Scene({
						triggerElement: step,
						triggerHook: 0,
						duration: "100%"
					})
					.setTween(timeline)
					.addTo(controller);

				});

				let scene = new ScrollMagic.Scene({
					triggerElement : '#' + id + ' .steps-container',
					triggerHook: "onLeave",
					offset: '-' + navHeight,
					duration: per + '%'
				})
				.setPin('#' + id + ' .steps-container')
				.setTween(timeline)
				.addTo(controller);

				scene.on("progress", function(){
					let p = scene.progress();
					let percent = p * 100;
					let slidePercent = 100/total;
					let curItem = Math.ceil((percent/slidePercent)) < total ? Math.ceil((percent/slidePercent)) : total - 1;
					let cur = steps[curItem];
					let active = true;
					let sCont = steps[curItem].querySelector('.step-container');
					let stepImg = prog.querySelector('.steps-img img');
					let sImg = sCont.getAttribute('data-image');
					sImg = JSON.parse(sImg);
					let imgSrc = sImg[0].srcSet.large;
					let shouldTrigger = curItem == counter ? false : true;
					counter = curItem;

					if (shouldTrigger == true) {
					
						TweenMax.to(stepImg, 0.35, {opacity: 0, onComplete: function(){
							stepImg.setAttribute('src', '');
							TweenMax.to(stepImg, 0.35, {opacity: 1, delay: 0.25, onStart: function() {
									stepImg.setAttribute('src', imgSrc);
								}
							});
						
						}});
					}

					stepProg.style.height = percent + '%';

					steps.forEach(function(step, index){
						if (index != curItem) {
							step.classList.remove('active');
							step.classList.remove('first-step');
						}
					});	

					if (!cur.classList.contains('active')) {
						cur.classList.add('active');
						let title = cur.querySelector('.step-title');
						let content = cur.querySelector('.step-content');
						title.classList.add('highlight');
						if (!title.getAttribute('data-title')) {
							title.setAttribute('data-title', title.innerHTML);

						}
						value = title.getAttribute('data-title');

						title.innerHTML = '';
						TweenMax.set(content, {opacity : 0});
						TweenMax.delayedCall(.15, replaceSlideContent, [cur, value]);
					}

					
					
				});
			});

		}


		function replaceSlideContent(step, value) {
			let title = step.querySelector('.step-title');
			let content = step.querySelector('.step-content');
			let valueArray = value.split('');
			let count = 0;
			let length = valueArray.length + 1;

			TweenMax.set(step, {delay: 0.02, onRepeat: function(){
				title.classList.remove('highlight');
				title.classList.add('active');
				let newValue = valueArray.slice(0, count);
				newValue = newValue.join('');
				title.innerHTML = newValue;

				if (count == length - 1) {
					title.classList.remove('active');
					TweenMax.to(content, 0.35, {opacity : 1, delay: 0.25});
				}
				count++;
			}, repeat: length, repeatDelay: 0.02});			
		}

	}

	ProgressScroll();
	
})();