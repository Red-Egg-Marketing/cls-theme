(function() {

	function faqFunctionality() {
		let faq = document.querySelectorAll('.faq');

		if (faq && faq.length > 0) {

			for (x = 0; x < faq.length; x++) {
				let f = faq[x];
				let head = f.querySelector('.header-title');
				head.addEventListener('click', eventToggleAnswer);
			}

		}

		function eventToggleAnswer() {
			// hide all faq
			for (x = 0; x < faq.length; x++) {
				let f = faq[x];
				let allToggles = f.querySelector('div[data-toggled]');
				allToggles.setAttribute('data-toggled', false);
			}

			let that = this;
			let parent = that.parentElement;
			let toggle = parent.getAttribute('data-toggled');
			toggle = toggle === "false" ? "true" : "false";
			parent.setAttribute('data-toggled', toggle);
			parent.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});

		}
	}

	faqFunctionality();
})();