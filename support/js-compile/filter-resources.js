	require('es6-promise/auto');

(function() {

	function ResourceLoader() {
		const apiUrl = '/wp-json/cls/v2/resources';
		const grid = document.getElementById('ResourcesGrid');
  		var resources = false;
  		var taxonomies = false;
  		var selectTax = [];
  		var archiveId = false;

  		document.addEventListener('click', function(event) {
    		let target = event.target;
    		let nodeName = target.nodeName.toLowerCase();

    		if ((target.closest('.filter-items') == null)) {
        		let buttons =  document.querySelectorAll('.tax-filter-button');

        		buttons.forEach( function(button){
        		    let par = button.parentElement;
        		    par.classList.remove('active');
        		}); 
    		}

  		}, false);

  		if (resources == false && grid != null) {
  			archiveId = grid.hasAttribute('data-tax') ? parseInt(grid.getAttribute('data-tax')) : false;
  			loadResources();
  		}


  		// need to fix then for ie
  		function loadResources() {
  			wp.apiRequest({ 
  				url: apiUrl
  			}).then(function(resourcelist){
  				let posts = resourcelist[0].resources;
          		taxonomies =  resourcelist[1];
          		resources = posts;

          		// let filterPosts = posts.filter(actionFilterPosts, this);
          		if (resources.length > 0) {
          			
          			if (archiveId != false) {
          				// getResourceCards();
          				selectTax.push(archiveId);
          				let filterPosts = posts.filter(actionFilterPosts ,this);
          				resources = filterPosts;
          				getResourceCards();
          			} else {
          				getResourceCards();
          			}
          			resourceFilters();
          		}
  			});
  		}


  		function getResourceCards(replace = false) {
  			let wrap = grid.querySelector('.block-wrapper');

  			if (replace == true) {
  				wrap.innerHTML = '';
  			}
  			
  			if (resources.length > 0) {
  			resources.map(function(resource, index){

  				let media_url = resource.media_url;
  				let link = resource.link;
  				let excerpt = resource.post_excerpt;
  				let typeClass = '';

  				// buld html and then append to wrap
  				let card = document.createElement('div');
  				let title = document.createElement('h3');
  				let contWrap = document.createElement('div');
  				card.setAttribute('class', 'resource-card' + typeClass);
  				title.setAttribute('class', 'resource-title');
  				contWrap.setAttribute('class', 'cont-wrap');
  				let extra = document.createElement('div');
  				extra.setAttribute('class', 'resource-extra');
  				let a = document.createElement('a');
  				a.setAttribute('href', link);
  				let bWrap = document.createElement('div');
  				bWrap.setAttribute('class', 'wp-buttons');
  				if (typeof media_url != 'undefined' && media_url) {
  					let imgCont = document.createElement('div');
  					imgCont.setAttribute('class', 'image-cont');
  					let img = document.createElement('img');
  					img.setAttribute('src', media_url);
  					imgCont.appendChild(img);
  					contWrap.appendChild(imgCont);
  				}

  				let content = document.createElement('div');
  				content.setAttribute('class', 'content');
  			
  				let p = document.createElement('p');
  				p.setAttribute('class', 'resource-excerpt');
  				p.textContent = excerpt;
  				title.textContent = resource.post_title;
  				let button = document.createElement('button');
  				button.setAttribute('class', 'wp-button');
  				let buttonText = 'Read More';
  				button.textContent = buttonText;

  				content.appendChild(title);
  				content.appendChild(p);
  				contWrap.appendChild(content);
  				a.appendChild(contWrap);
  				extra.appendChild(a);
  				a.appendChild(bWrap);
  				bWrap.appendChild(button);
  				card.appendChild(extra);
  				wrap.appendChild(card);
  			});
  			} else {
  				let nothing = document.createElement('h2');
  				nothing.setAttribute('class', 'no-success-header');
  				nothing.textContent = 'No resources found. Try different filters';
  				wrap.appendChild(nothing);
  			}
  		}

  		function newactionFilterPosts(post) {
  			let postTaxes = Object.entries(post.taxonomies);
  			let typePost = post.post_type;
  			let postTruthy = [];
      		let sizeTaxes = selectTax.length;

      		// loop over all selected taxonomies
      		if (selectTax.length > 0) {
      			if (typePost == selectType[0] || selectType[0] == 'all') {
      				selectTax.forEach(function(taxItem) {
            			// loop over each posts' taxonomies
            			// match
            			postTaxes.forEach(function(postTitem) {
            		  		let indTax = postTitem[1];
            		  		indTax.forEach(function(anotherItem) {
            		      		let aTerm_id = anotherItem.term_id;
            		     		if (aTerm_id == taxItem) {
            		        		postTruthy.push(true);
            		      		}
            		  		});
            			});
      				});
      			}
      			return postTruthy.length > 0 ? true : false;
      		} else {
      			if (typePost == selectType[0] || selectType[0] == 'all') {
      				postTruthy.push(true);
      			}
      			return postTruthy.length > 0 ? true : false;
      		}

        }

  		function actionFilterPosts(post) {
  			let postTaxes = Object.entries(post.taxonomies);
  			let postTruthy = [];
      		let sizeTaxes = selectTax.length;

      		// loop over all selected taxonomies
      		if (sizeTaxes > 0) {
      			selectTax.forEach(function(taxItem) {
            		// loop over each posts' taxonomies
            		postTaxes.forEach(function(postTitem) {
            	  		let indTax = postTitem[1];
            	  		indTax.forEach(function(anotherItem) {
            	      		let aTerm_id = anotherItem.term_id;
            	     		if (aTerm_id == taxItem) {
            	        		postTruthy.push(true);
            	      		}
            	  		});
            		});
      			});

      			return postTruthy.length > 0 ? true : false;

      		} else {
      			return true;
      		}
          
  		}

  		function filterCats(e) {
  			let targ = e.currentTarget;
  			let checked = targ.checked;
  			let value = targ.value;

  			if (checked == true) {
  				selectTax.push(value)
  			} else {
  				let index = selectTax.indexOf(value);
      			selectTax.splice(index, 1);
  			}

  			wp.apiRequest({
          		url: apiUrl
      		}).then(function(resourcelist){
          		let posts = resourcelist[0].resources;
          		// Filter based off selected taxonomies. For example, if topic A and topic B are selected. select posts that have both topice A AND topic B.
                let filterPosts = posts.filter(actionFilterPosts, this);
                resources = filterPosts;

                getResourceCards(true);

    		});

  		}

  		function resourceFilters() {
  			let form = document.createElement('form');
  			form.setAttribute('class', 'form-filters');
  			let wrap = document.createElement('div');
  			let total = 0;

  			form.appendChild(wrap);
  			grid.insertBefore(form, grid.children[1]);

	  		Object.entries(taxonomies).map(function(value, key) {
	  			if (value[0] != '') {
	  				let tax = key;
	  				let taxLabel = value[0];
	  				let taxItem = value[1];
	  				let col = document.createElement('div');
	  				col.setAttribute('class', 'col-6 flex align-center filter-block');
	  				let filtButton = document.createElement('button');
	  				filtButton.setAttribute('class', 'tax-filter-button');
	  				let spanTax = document.createElement('span');
	  				spanTax.setAttribute('class', 'filt-icon');
	  				spanTax.textContent = 'Filter By ' + taxLabel;
	  				let taxCont = document.createElement('div');
	  				taxCont.setAttribute('class', 'tax-cont');
	  				let taxWrap = document.createElement('div');
	  				taxWrap.setAttribute('class', 'tax-wrapper');
	  				let closeButton = document.createElement('button');
	  				closeButton.setAttribute('class', 'tax-close');
	  				closeButton.textContent = 'X';
	  				let taxList = document.createElement('ul');
	  				taxList.setAttribute('class', 'tax-list');

	  				Object.entries(taxItem).map(function(intValue, intKey) {
	  					let taxName = intValue[0];
	  					let taxId = intValue[1].tax_id;
	  					let liItem = document.createElement('li');
	  					let checked = (selectTax != undefined && selectTax.includes(taxId) == true) ? true : false;
	  					liItem.setAttribute('class', 'tax-item');
	  					let liWrap = document.createElement('div');
	  					liWrap.setAttribute('class', 'tax-wrap');
	  					let input = document.createElement('input');
	  					input.setAttribute('class', 'checkbox-component');
	  					input.setAttribute('id', 'inspector-control-box-' + taxId);
	  					input.type = "checkbox";
	  					input.value = taxId;
	  					input.checked = checked;
	  					let htmlLabel = document.createElement('label');
	  					htmlLabel.setAttribute('for', 'inspector-control-box-' + taxId);
	  					htmlLabel.innerHTML = taxName;

	  					liWrap.appendChild(input);
	  					liWrap.appendChild(htmlLabel);
	  					liItem.appendChild(liWrap);
	  					taxList.appendChild(liItem);

	  					// attach events
	  					input.addEventListener('change', filterCats);
	  				});

	  				taxWrap.appendChild(closeButton);
	  				taxWrap.appendChild(taxList);
	  				taxCont.appendChild(taxWrap);
	  				filtButton.appendChild(spanTax);
	  				col.appendChild(filtButton);
	  				col.appendChild(taxCont);
	  				wrap.appendChild(col);

	  				// attach events 
	  				filtButton.addEventListener('click', toggleCats);
	  				closeButton.addEventListener('click', toggleCats);
	  				total++;
	  			} // end if	
	  		});

	  		let wClass = total > 1 ? 'wrapper' : 'wrapper one-col';
  			wrap.setAttribute('class', wClass + ' filter-items');
  		}


  		function toggleCats(e)  {
  			let allFilt = document.querySelectorAll('.filter-block');
  			let item = e.currentTarget;
  			let parent = item.parentElement; 

  			allFilt.forEach(function(filt) {
  				if (parent != filt) {
          			filt.classList.remove('active');
        		}
  			});

  			parent.classList.toggle('active');

  			e.preventDefault();

  		}

  		
	}

	ResourceLoader();
	
})();