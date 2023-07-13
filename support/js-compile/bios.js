(function() {


	function filterActions() {
		var filters = document.querySelectorAll('.gs-team-filter-cats');

		if (filters.length > 0) {
			filters.forEach(function(filter){
				filterClick(filter);
			})
		}

		function filterClick(filter) {
			var buttons = filter.querySelectorAll('.filter a');
			var grid = filter.nextElementSibling;

			buttons.forEach(function(button){
				button.addEventListener('click', function(){
					var allParents = filter.querySelectorAll('.filter');
					allParents.forEach(function(allParent){
						allParent.classList.remove('special-filter');
					});
					var parent = this.parentElement;
					parent.classList.add('special-filter');
					var cat = button.getAttribute('data-filter');
					cat = cat.replace('.', '');

					var allBios = grid.querySelectorAll('.gs-filter-single-item');
					allBios.forEach(function(single){
						single.classList.remove('active');
					});
					var activeBios = grid.querySelectorAll('.gs-filter-single-item[data-category="' + cat + '"]');
					activeBios.forEach(function(active){
						active.classList.add('active');
					});

				});			
			})
		}
	}

	filterActions();
	
})();