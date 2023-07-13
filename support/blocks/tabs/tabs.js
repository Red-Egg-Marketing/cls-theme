(function() {

	function tabsFunctionality() {
		let tabs = document.querySelectorAll('.tabs');

		if (tabs && tabs.length > 0) {
			for (x = 0; x < tabs.length; x++) {
				let head = tabs[x].querySelectorAll('.tab');
				let tabFirst = tabs[x].querySelector('.tab:first-of-type');
				let wrap = tabs[x].querySelector('.tabs-wrap');
				let tab = tabs[x].querySelector('.tab');
				let first = tabs[x].querySelector('.tab:first-of-type + .tab-content');
			
				tabFirst.classList.add('active');
				for (z = 0; z < head.length; z++) {
					head[z].addEventListener('click', eventToggleTab);
				}
			}
		}

		function eventToggleTab() {
			let that = this;
			let parent = that.parentElement;
			let allToggles = parent.querySelectorAll('.tab');
			for (x = 0; x < allToggles.length; x++) {
				allToggles[x].classList.remove('active');
			}
			that.classList.add('active');
			let currentToggle = that.nextElementSibling;
		
		}
	}

	tabsFunctionality();

})();