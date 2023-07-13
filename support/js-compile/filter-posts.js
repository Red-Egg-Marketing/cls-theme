require('es6-promise/auto');

(function() {

	function PostsLoader() {
		var apiOrigin = '/wp-json/cls/v2/posts/';
		var apiUrl = apiOrigin;
		var grid = document.getElementById('PostsGrid');
  		var resources = false;
  		var taxonomies = false;
  		var selectTax = [];
  		var archiveId = false;
  		var offset = 0;
  		var loadButton = false;
  		var tax = '';
  		var custTax = '';
		var is_ie = grid != null && grid.hasAttribute('data-ie')  ? grid.getAttribute('data-ie') : false;
		if (is_ie == true) {
  			return;
  		}


  		if (resources == false && grid != null) {
  			archiveId = grid.hasAttribute('data-tax') ? parseInt(grid.getAttribute('data-tax')) : false;
  			tax = grid.hasAttribute('data-tax') ? 'category' : '';
  			archiveId = archiveId == false && grid.hasAttribute('data-tag') ? parseInt(grid.getAttribute('data-tag')) : archiveId;
  			tax = grid.hasAttribute('data-tag') ? 'tag' : tax;
  			archiveId = archiveId == false && grid.hasAttribute('data-author') ? parseInt(grid.getAttribute('data-author')) : archiveId;
  			tax = grid.hasAttribute('data-author') ? 'author' : tax;
  			archiveId = archiveId == false && grid.hasAttribute('data-cust-tax') ? parseInt(grid.getAttribute('data-cust-tax')) : archiveId;
  			tax = grid.hasAttribute('data-cust-tax') ? 'custom_tax' : tax;
  			if (tax == 'custom_tax') {
  				custTax = grid.hasAttribute('data-tax-name') ? '&tax_name=' + grid.getAttribute('data-tax-name') : '';
  			}
  			apiUrl += '?' + tax + '=' + archiveId + custTax + '&ppp=20';

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

  			loadResources();
  			loadMoreButton();
  		}


  		// need to fix then for ie
  		function loadResources() {
  			
  			if (offset != 0) {
  				apiUrl = apiOrigin + '?' + tax + '=' + archiveId + '&offset=' + offset + custTax + '&ppp=20';
  			}

  			wp.apiRequest({ 
  				url: apiUrl
  			}).then(function(resourcelist){
  				let posts = resourcelist;
          		resources = posts;
          		if (resources.length > 0) {
          			if (archiveId != false) {
          				// getResourceCards();
          				selectTax.push(archiveId);
          				getResourceCards();
          			} else {
          				getResourceCards();
          			}
          			
          		} else {
          			// deactivate button
          			loadButton.textContent = 'No more posts';
          			loadButton.setAttribute('disabled', true);
          		}
  			});

  		}


  		function loadOffsetPosts() {
  			var button = this;
  			var off = this.getAttribute('data-offset');
  			button.setAttribute('data-offset', parseInt(off) + 20);
  			offset = off;
  			loadResources();
  			
  		}


  		function loadMoreButton() {
  			let div = document.createElement('div');
  			let button = document.createElement('button');
  			let innerWrap = document.createElement('div');

  			div.setAttribute('class', 'button-wrapper');
  			innerWrap.setAttribute('class', 'inner-wrap');
  			div.appendChild(innerWrap)
  			innerWrap.appendChild(button);
  			button.textContent = 'Load More';
  			button.setAttribute('class', 'wp-button is-style-solid-lime');
  			button.setAttribute('data-offset', 20);
  			grid.appendChild(div);

  			loadButton = button;
  			button.addEventListener('click', loadOffsetPosts);
  		}


  		function getResourceCards(replace = false) {
  			let wrap = grid.querySelector('.block-wrapper');

  			if (replace == true) {
  				wrap.innerHTML = '';
  			}
  			
  			if (resources.length > 0) {
  			resources.map(function(resource, index){
  				let link = resource.link;
  				let excerpt = resource.excerpt;
  				let media = resource.featured_image;
  				let typeClass = '';
  				let imgClass = '';

  				// buld html and then append to wrap
  				let card = document.createElement('div');
  				let contWrap = document.createElement('div');
  				let extra = document.createElement('div');
  				contWrap.setAttribute('class', 'cont-wrap');
  				extra.setAttribute('class', 'resource-extra');
  				let a = document.createElement('a');
  				a.setAttribute('href', link);
  				let bWrap = document.createElement('div');
  				bWrap.setAttribute('class', 'wp-buttons');

  				if (media != false) {
  					let imgCont = document.createElement('div');
  					imgCont.setAttribute('class', 'image-cont');
  					let img = document.createElement('img');
  					img.setAttribute('src', media);
  					imgCont.appendChild(img);
  					contWrap.append(imgCont);
  				} else {
  					imgClass = ' no-img';
  				}
  				card.setAttribute('class', 'resource-card' + typeClass + imgClass);
  				

  				let content = document.createElement('div');
  				content.setAttribute('class', 'content');
  				let p = document.createElement('p');
  				p.setAttribute('class', 'resource-excerpt');
  				p.innerHTML = excerpt;
  				let button = document.createElement('button');
  				button.setAttribute('class', 'wp-button');
  				let buttonText = 'Read More';
  				button.textContent = buttonText;

  				content.appendChild(p);
  				contWrap.appendChild(content);
  				a.appendChild(contWrap);
  				
  				bWrap.appendChild(button);
  				extra.appendChild(a);
  				a.appendChild(bWrap);
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
  		
	}

	PostsLoader();
	
})();