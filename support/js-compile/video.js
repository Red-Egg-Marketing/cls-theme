(function() {
	function CustomVideoControls() {
		var bttn = document.querySelector('.custom-video-button');
		
		if (bttn != null) {
			var vid = bttn.nextElementSibling;
			var par = bttn.parentNode;

			bttn.addEventListener('click', customPlay);
			vid.addEventListener('pause', customPause);
		}

		function customPause() {
			
			let seek = vid.seeking;
			
			if (seek == false) {
				par.classList.remove('playing');
				vid.setAttribute('controls', false);
				vid.controls = false;
			}
			
		}

		function customPlay() {
			par.classList.add('playing');
			vid.setAttribute('controls', true);
			vid.controls = true;
			vid.play();
		}

	}

	CustomVideoControls();

})();