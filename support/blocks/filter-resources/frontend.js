const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import ResourceCard from '../../components/ResourceCard.js';
import ResourceFilters from '../../components/ResourceLoader.js';
const apiUrl  = '/wp-json/cls/v2/vehicles';

const ResourcesRootNew = document.getElementById('ResourcesWrap');

const SaveResources = ( { attributes } ) => {
	  	
	  	const [resources, selectResources] = useState(false);
	  	const [taxonomy, setTaxes] = useState([]);
  		const [selectTax, setSelectTaxes] = useState([]);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [triggered, setTriggered] = useState(false);
  		const [loading, setLoading] = useState(true);
  		const [data, setData] = useState({});
  		const [toggleFilters, setToggleFilters] = useState({key: '', active: false});
  		let searchParams =  new URLSearchParams(window.location.search);

		document.addEventListener('click', function(event) {
    		let target = event.target;
    		let nodeName = target.nodeName.toLowerCase();

    		if ((target.closest('.filter-items') == null)) {
        		let buttons =  document.querySelectorAll('.tax-filter-button');

        		buttons.forEach( (button) => {
        		    let par = button.parentElement;
        		    par.classList.remove('active');
        		}); 
    		}

  		}, false);

  		const buildQueryString = (data = data) => {
  			let newUrl = '';
  			Object.keys(data).forEach(function(type, key){
        		let tax = type;
        		let value = data[type];
        		
        		if (key == 0) {
        			newUrl += '?'
        		}
        		if (Array.isArray(value)) {
        			let len = value.length;
        			
        			value.forEach((v, key) => {
        				let del = key == len - 1 ? '' : ',';
        				if (newUrl.includes(tax) == false) {
        					newUrl += '&' + tax + '=' + v + del
        				} else {
        					newUrl += v + del
        				}
        			})
        		} else {

        			if (value != '') {
        				if (newUrl.includes(tax) == false) {
        					newUrl += '&' + tax + '=' + value
        				} else {
        					newUrl += value
        				} 
        			} else {
        				newUrl = newUrl.replace('&' + tax + '=', '');
        			}
        		}
        		
        	});

        	newUrl += '&nonce=' + postData.nonce;

        	window.history.pushState({}, 'CLS Vehicle Selectin', newUrl);
        	return newUrl;
  		}

		const sendAPIrequest = (data) => {
			let string = buildQueryString(data);
			setLoading(true);
			wp.apiRequest({
        		url: apiUrl + string,
        		method: 'GET',
    		})
    		.then(resourcelist => {
    			let empty = resourcelist.empty;
    			setEmpty(empty);
    			if (empty === false) {
    				selectResources(resourcelist[0].resources);
    			}
        		setLoading(false);
    		}).catch( error => {
    			console.log(error);
    		});
		}

		const filterMax = (value, id, tax) => {
			if (!data[tax + '_max']) {
				data[tax + '_max'] = '';
			}
			data[tax + '_max'] = id;
		}

		const filterMin = (value, id, tax) => {
			if (!data[tax + '_min']) {
				data[tax + '_min'] = '';
			}
			data[tax + '_min'] = id;
		}

		const searchFilter = (value) => {

			if (!data['search']) {
				data['search'] = '';
			}
			data['search'] = value;
		}

		const orderFilter = (value) => {

			if (!data['order']) {
				data['order'] = '';
			}
			data['order'] = value;
		}


		const filterCats = (value, id, tax) => {
			if (!data[tax]) {
				data[tax] = [];
			}
    		if (value == true) {
    		  if (selectTax.indexOf(id) == -1) {
    		    selectTax.push(id);
    		   
    		    data[tax].push(id);
    		  }
    		} else {
    		  let index = selectTax.indexOf(id);
    		  selectTax.splice(index, 1);
    		  let dataIndex = data[tax].indexOf(id);
    		  data[tax].splice(dataIndex, 1);
    		}
    		let label = tax;
    		setSelectTaxes(selectTax);
    		setData({
    			...data
    		}
    		);
    		sendAPIrequest(data);

	  	}

	  	const toggleCats = (key, item) => {
    		// toggle state and index to determine what is active
    		let allFilt = document.querySelectorAll('.filter-block');
    		let parent = item.parentElement;

    		allFilt.forEach( (filt) => {
    		    if (parent != filt) {
    		      filt.classList.remove('active');
    		    }
    		});
    
    		parent.classList.toggle('active');
    		setData(data);
  		}

  		const buildSearchQueryString = (params) => {
  			params.forEach(function(value, key) {
          		let allValues = value.split(',');
          		let taxKey = Object.keys(taxonomy);
          		taxKey = taxKey.map(function(word){
          			return word.replace(' ', '_').toLowerCase();
          		});

          		allValues.forEach(function(allvalue, allkey){
          			// if (taxKey.includes(key)) {
          				if (allvalue != '') {
          					if (!data[key]) {
          						data[key] = [];
          					}
          					if (!data[key].includes(allvalue)) {
          						data[key].push(allvalue);
          					}

		          		}
          			// }
          		});
  			});

    		setData(data);
  		}

  		const filterFormSubmitted = (event) => {
  			sendAPIrequest(data);
  			event.preventDefault();
  		}

		if (resources === false && triggered == false) {
			let tempstring = window.location.search == '' ? apiUrl + '?nonce=' + postData.nonce :  apiUrl + window.location.search + '&nonce=' + postData.nonce;
    		wp.apiRequest({
    		    url: tempstring,
    		    method: 'GET',
    		}).then(resourcelist => {
    			console.log(resourcelist);
    		    let posts = resourcelist[0].resources;
    		    let taxes = resourcelist[1];

    		    // setTaxes(taxes);
    		    let empty = resourcelist.empty;
    			setEmpty(empty);
    		    setTriggered(true);
    		    setLoading(false);

    			if (empty === false) {
    				selectResources(posts);
    			}
    		    buildSearchQueryString(searchParams);
    		});
  		}

		return (
			<Fragment>
				<form
					className="form-filters"
					onSubmit={ filterFormSubmitted }
				>
				{/*<ResourceFilters
					filterCats={ filterCats }
					taxonomies={ taxonomy }
					toggleCats={ toggleCats }
					currentFilter={ toggleFilters }
					filterMin={ filterMin }
					filterMax={ filterMax }
					searchFilter={ searchFilter }
					orderFilter={ orderFilter }
					selectedValues={ data }
				/>*/}
				<div className="resources-grid">
					{ (resourcesEmpty == false && resources.length > 0 && loading == false) && resources.map((resource, resourceIndex) => {
							return (
								<Fragment>
									{ (resourceIndex == 10) && (
										<div className="alternatives">
											<div className="wrapper">
												<h3>Need to Terminate Your Lease?</h3>
												<div className="wp-block-button">
													<a href="/lease-termination/" className="wp-block-button__link">Learn More</a>
												</div>
											</div>
										</div>
									)}
									{ (resourceIndex == 20) && (
										<div className="alternatives">
											<div className="wrapper">
												<h3>Looking to Sell Your Car?</h3>
												<div className="wp-block-button">
													<a href="/sell-us-your-car/" className="wp-block-button__link">Learn More</a>
												</div>
											</div>
										</div>
									)}
									{/*{ (resourceIndex == 30) && (
										<div className="alternatives">
											<div className="wrapper">
												<h3>Need Extended Service Contract Info?</h3>
												<div className="wp-block-button">
													<a href="/extended-service-agreements/" className="wp-block-button__link">Learn More</a>
												</div>
											</div>
										</div>
									)}*/}
									<ResourceCard.View
										resourceIndex={ resourceIndex }
										resourceURL={ resource.link }
										resourceID={ resource.ID }
										resourceImg={ resource.media_url }
										resourceTitle={ resource.post_title  }
										resourceType={ resource.label  }
										resourcePrice={ resource.price }
										resourceMiles={ resource.miles }
										resourceYear={ resource.year }
									/>
									{ (resourceIndex == resources.length - 1) && (
										<div className="alternatives">
											<div className="wrapper">
												<h3>Can't Find a Car?</h3>
												<div className="wp-block-button">
													<a href="/lease-or-buy-new-vehicle/vehicle-request/" className="wp-block-button__link">Let Us Help</a>
												</div>
											</div>
										</div>
									)}
								</Fragment>
							)
						})
					}
					{loading == true && (
						<Fragment>
							<div className="loading">
								<h2>...Loading</h2>
							</div>
						</Fragment>
					)}
					{ (resourcesEmpty && loading == false) && (
						<Fragment>
							<div className="error">
								<h3>There are no available vehicles matching your filters.</h3>
								<p>Our inventory changes daily and our auto brokers can help find the car you’re looking for.</p>
								<div className="wp-block-button">
									<a href="/lease-or-buy-new-vehicle/vehicle-request/" className="wp-block-button__link">Request a vehicle here!</a>
								</div>
							</div>
						</Fragment>
					)}
				</div>
				</form>
			</Fragment>
		);
}


if (ResourcesRootNew) {
	render(
		<SaveResources />,
		ResourcesRootNew
	);
}
