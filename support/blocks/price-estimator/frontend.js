const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import ResourceCard from '../../components/ResourceCard.js';
const apiUrl  = '/wp-json/cls/v2/vehicles';

const ResourcesRoot = document.getElementById('PaymentVehicles');

const SaveVehiclesPayment = () => {
	  	const [resources, selectResources] = useState(false);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [loading, setLoading] = useState(false);
  		const [data, setData] = useState({});
  		const [payment, setPayment] = useState(false);
  		const [totalPrice, setPrice] = useState([]);
  		const [totalMonths, setMonths] = useState(false);
  		const [totalAPR, setAPR] = useState(false);
  		const [down, setDown] = useState(false);

  		const sendAPIrequest = (data) => {

  			setLoading(true);
			wp.apiRequest({
        		url: apiUrl + '?nonce=' + postData.nonce,
        		method: 'POST',
        		data: data
    		}).then(resourcelist => {
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

  		const getValue = (event) => {

  			let target = event.target;
  			let name = target.name;
  			let id = target.id;  		
  			let value = target.value;
  			if (id == 'price') {
  				value = parseInt(value);
  				data['price_max'] = value;
  				if (data['down'] > data['price_max']) {
  					let tempDown = document.getElementById('down');
  					tempDown.value = 0;
  				}
  				let replace = data['price_max'];
  				// replace = parseFloat(replace).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,');
  				// target.value = replace;
  			}
  			if (id == 'down') {
  				target.setAttribute('max', data['price_max']);
  				value = parseInt(value);
  				data['down'] = value;
  				if (data['down'] > data['price_max']) {
  					target.value = data['price_max'];
  				}
  			}
  			if (id == 'apr') {
  				data['apr'] = value;
  			}
  			if (id == 'term') {
  				data['term'] = value;
  			}
  			setData(data);

  		}

  		const savingsFormula = (price, down, apr, term) => {
  			let payment = (price - down) * ((apr * Math.pow(1 + apr, term)) / (Math.pow(1 + apr, term) - 1));
  			return payment;
  		}

  		const calculateSavings = (event) => {

  			let price = data['price_max'];
  			let down = data['down'];
  			let apr = data['apr'];
  			let origApr = apr;
  			apr = (apr/100)/12;
  			let term = data['term'];
  			// A=P*(r(1+r)^{n})/((1+r)^{n}-1)
  			let payment = savingsFormula(price, down, apr, term);
  			payment = payment > 0 ? payment : 0;
  			payment = Math.round(payment, 2);
  			payment = new Intl.NumberFormat('en-US').format(payment);
  			price = new Intl.NumberFormat('en-US').format(price);
  			down = new Intl.NumberFormat('en-US').format(down);
  			setPayment(payment);
  			setPrice(price);
  			setMonths(term);
  			setAPR(origApr);
  			setDown(down);
  			sendAPIrequest(data);
  			if (event) {
  				event.preventDefault();
  			}

  		}

		React.useEffect( () => {
			let form = document.getElementById('PriceCalculator');
			let inputs = form.elements;
			Object.keys(inputs).forEach((key) => {
				let input = inputs[key];
				let name = inputs[key].name;
				let type = inputs[key].type;
				if (name != '') data[name] = input.value;
				input.addEventListener('input', getValue);
			});
			form.addEventListener('submit', calculateSavings);

			if (resources === false) {
				data['price_max'] = "30000";
				data['down'] = "1000";
				data['apr'] = postData.interest_rate;
				data['term'] = "72";
				setData(data);
				calculateSavings(event);

    			wp.apiRequest({
        			url: apiUrl + '?nonce=' + postData.nonce,
    			    method: 'POST',
    			    data: data
    			}).then(resourcelist => {
    				let empty = resourcelist.empty;
    			    let posts = resourcelist[0].resources;
    			    selectResources(posts);
    			   
    			});
  			}
  		}, []);
		

		return (
			<Fragment>
				<div className="resources-grid">
					{loading == false && resources == false && (
						<Fragment>
								<div className="loading">
									<h2>...Loading</h2>
								</div>
						</Fragment>
					)}
					{ (payment && resources.length > 0 && loading == false) && (
						<Fragment>
							<div className="payment">
								<div className="payment_interior">
									<div className="payment_main">
										<h5>Estimated Payment</h5>
										<h3>${ payment }/<span>mo</span><sup>*</sup></h3>
									</div>
									<div className="payment_table">
										<table>
											<tr>
												<td>Price</td>
												<td>${ totalPrice }</td>
											</tr>
											<tr>
												<td>Down payment</td>
												<td>${ down }</td>
											</tr>
											<tr>
												<td>APR</td>
												<td>{ totalAPR }%</td>
											</tr>
											<tr>
												<td>Term</td>
												<td>{ totalMonths } Months</td>
											</tr>
										</table>
									</div>
									<div className="small-print">
										<p className="small">*These calculations are for reference purposes only.</p>
									</div>
								</div>
							</div>

							<div className="lead-banner">
								<h3>The following vehicles are good matches</h3>
							</div>
						</Fragment>
					)}
					{ (resourcesEmpty == false && resources.length > 0 && loading == false) && resources.map((resource, resourceIndex) => {
							return (
								<Fragment>
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
										data={ data }
										calculatePrice={ true }
										savingsFormula={ savingsFormula }
									/>
									{ resourceIndex == 1 && (
										<div className="alternatives">
											<div className="wrapper">
												<h3>Don’t see a good match?</h3>
												<p>We can find it! Fill out a vehicle request form here.</p>
												<div className="wp-block-button">
													<a href="/lease-or-buy-new-vehicle/vehicle-request/" className="wp-block-button__link">Click Here</a>
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
								<h3>There are no available vehicles matching your filters. Please try something else.</h3>
							</div>
						</Fragment>
					)}
				</div>
			</Fragment>
		);
}


if (ResourcesRoot) {
	render(
		<SaveVehiclesPayment />,
		ResourcesRoot
	);
}
