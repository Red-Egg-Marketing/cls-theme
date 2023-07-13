require('es6-promise/auto');

(function() {


	function ScrollTabColumns() {

		gsap.registerPlugin(ScrollTrigger);

		var columns = document.querySelectorAll('.tabs');

		if (columns.length > 0 ) {
			columns.forEach(function(column, index) {
				let block = column.querySelector('.tab-container');
				let content = column.querySelector('.content-columns');
				let image = column.querySelector('.wp-block-image');
				let classList = column.classList.contains('img-right');
				let x = classList == true ? -15 : 15;

				gsap.set(content,
					{
						opacity: 0,
						x: x + '%'
					}
				);
				gsap.set(image,
					{
						opacity: 0,
					}
				);
				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: block,
						start: "top 100%",
						onUpdate: function(progress) {
							animateFrom(progress, block, x, column);
						},
					}
				});

			});	
		}
	}


	function animateFrom(progress, element, xPos, parent) {
		let prog = (progress.progress * 4) < 1 ? progress.progress * 4 : 1;
		let content = element.querySelector('.content-columns');
		let image = element.querySelector('.wp-block-image');
		let PosNeg = Math.sign(xPos);
		let newX = PosNeg < 0 ? Math.abs(xPos) : -xPos;
		let progX = xPos + (newX * prog);

		gsap.to(content, 
		{
			opacity: prog,
			x: progX + '%'
		});	

		gsap.to(image,
		{
			opacity: prog,
		});

		if (prog > 0.75) {
			parent.classList.add('animate-complete');
		} else {
			parent.classList.remove('animate-complete');
		}

	}

	ScrollTabColumns();
	
})();