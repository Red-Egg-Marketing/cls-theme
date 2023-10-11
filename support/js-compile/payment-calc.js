const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
const apiUrl  = '/wp-json/cls/v2/reviews';

const ResourcesRoot = document.getElementById('PaymentCalculator');

const SavePaymentCalc = () => {
	  	const [initialLoad, setLoaded] = useState(false);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [loading, setLoading] = useState(false);
  		const [data, setData] = useState({});
  		const [payment, setPayment] = useState(false);
  		const [totalPrice, setPrice] = useState(false);
  		const [totalMonths, setMonths] = useState(false);
  		const [totalAPR, setAPR] = useState(false);
  		const [down, setDown] = useState(false);
  		const [percent, setPercent] = useState(false);

  		const getValue = (event) => {

  			let target = event.target;
  			let name = target.name;
  			let id = target.id;  		
  			let value = target.value;
  			if (id == 'price_slide') {
  				let newDown = data['price_max'] - (data['price_max'] * value/100);
  				data['down'] = newDown;
  			}
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

  		const calcPercentage = () => {
  			let diff = data['price_max'] - data['down'];
  			let perc = Math.ceil((diff/data['price_max']).toFixed(2) * 100);
  			setPercent(perc);
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
  			if (event) {
  				event.preventDefault();
  			}
  		}

		React.useEffect( () => {
			let form = document.getElementById('Calculator');
			let price = document.getElementById('Price');
			let inputs = form.elements;
			Object.keys(inputs).forEach((key) => {
				let input = inputs[key];
				let name = inputs[key].name;
				let type = inputs[key].type;
				if (name != '') data[name] = input.value;
				input.addEventListener('input', getValue);
				input.addEventListener('input', calcPercentage);
				input.addEventListener('input', calculateSavings);
			});
			
			form.addEventListener('submit', calculateSavings);

			if (initialLoad === false) {
				price = price.getAttribute('data-price');
				data['price_max'] = price;
				data['down'] = Math.ceil(0.15 * price);
				data['apr'] = "7.2";
				data['term'] = "72";
				setPrice(price);
				setAPR("7.2");
				setMonths("72");
				setDown(data['down']);
				calcPercentage();
				setData(data);
				calculateSavings();
				setLoaded(true);
			}

  		}, []);
		
		return (
			<Fragment>
				<div className="resources-grid">
					<form id="Calculator">
						<div className="form-row">
							<div className="inner-row flex">
								<div className="col end text-center center-margin">
									<label>Estimated Payment</label>
									<p id="Payment">${ payment }/<span>mo</span></p>
								</div>
							</div>
							<div className="slide-container" data-percent={ percent }>
								<input 
									type="range"
									id="price_slide"
									name="price_max"
									min="0"
									max="100"
									value={ percent }
								/>
							</div>
						</div>
						<div className="form-row term-row">
							<div className="inner-row flex">
								<div className="col">
									<label for="term">Term</label>
									<select id="term" name="term">
										<option value="12">12 Months</option>
										<option value="24">24 Months</option>
										<option value="36">36 Months</option>
										<option value="48">48 Months</option>
										<option value="60">60 Months</option>
										<option value="72" selected>72 Months</option>
										<option value="84">84 Months</option>
									</select>
								</div>
								<div className="col">
									<label for="term">APR %</label>
									<input
										type="number"
										id="apr"
										placeholder="7.2%"
										value={ data['apr'] }
										name="apr"
										min="0"
										max="100"
										step="0.1"
									/>
								</div>
							</div>
						</div>

					</form>
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

						</table>
					</div>
					{/*{loading == false && resources == false && resourcesEmpty == false && (
						<Fragment>
								<div className="loading">
									<h2>...Loading</h2>
								</div>
						</Fragment>
					)}*/}
				</div>
			</Fragment>
		);
}


if (ResourcesRoot) {
	render(
		<SavePaymentCalc />,
		ResourcesRoot
	);
}
