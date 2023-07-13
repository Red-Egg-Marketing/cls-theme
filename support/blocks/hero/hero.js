(function() {
	function heroBlockLoader() {
		var heroBlocks = document.querySelectorAll('.hero');

		if (heroBlocks.length > 0) {
			document.addEventListener('scroll', checkHeroPosition);
		}

		function checkHeroPosition() {
			heroBlocks.forEach(function(block){
				var section = block;
				var sectionHeight = block.offsetHeight;
				var offsetTop = block.offsetTop;
				var percent = 0;
				var top = block.getBoundingClientRect().top;
				var actualPos = Math.abs(top - offsetTop);

				if (actualPos <= sectionHeight){
					// calculate amount scrolled
					percent = Math.floor((actualPos/sectionHeight * 100));
					section.setAttribute('data-scrolled', percent);
				} else {
					return;
				}

			});
		}
	}

	heroBlockLoader();
})();