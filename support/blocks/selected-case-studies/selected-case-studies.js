require('es6-promise/auto');

(function() {

	function FeatureCaseStudiesLoader() {
		const apiUrl = '/wp-json/cls/v2/case-studies';
		const grids = document.querySelectorAll('.selected-case-studies-grid');

  		if (grids && grids != null) {
  			grids.forEach(function(grid){
  				var append = grid.querySelector('div[data-append]');
  				var cat = append.getAttribute('data-category');
  				loadResources(append, cat);
  			});
  		}

  		// need to fix then for ie
  		function loadResources(append, cat) {
  			wp.apiRequest({ 
  				url: apiUrl + '?category=' + cat + '&html=cards'
  			}).then(function(resourcelist){
          		if (resourcelist != false ) {	
          			append.innerHTML = resourcelist;
          		}
  			});
  		}
  		
	}

	FeatureCaseStudiesLoader();
	
})();