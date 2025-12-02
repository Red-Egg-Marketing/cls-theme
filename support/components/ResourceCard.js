import React from 'react';
const { Fragment } = wp.element;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button, PanelBody } = wp.components;
const { __ } = wp.i18n;


const ResourceCard = (props) => {
	let buttonText = props.resourceType == 'Videos' ? 'Watch Video' : 'Read More';
	let slideClass = props.resourceClass != null ? props.resourceClass : '';
	let typeClass= '';
	if (props.resourceType == 'Whitepaper') {
		typeClass = 'whitepaper';
	} else if(props.resourceType == 'Video') {
		typeClass = 'video';
	}

	return (
		<Fragment>
			<div className={ `resource-card ${slideClass} ${typeClass}` } key={ props.resourceIndex }>
				<div className="resource-extra">
				<div className="resource-wrap" href={ props.resourceURL }>
					{ (props.resourceID != 0 && props.updateResourceImage != null) && (
						<Fragment>
							<div className="media-controls">
							<MediaUpload
								onSelect={ (val) => {
									props.updateResourceImage(val, props.resourceIndex);
								}}
								allowedTypes="image"
								value={ props.resourceImgID }
								render={ ({ open }) => (
									<Fragment>
										<Button
											onClick={ open }
											isLink
											isSmall
										>
											Change Image
										</Button>
									</Fragment>
								)}
							/>
							</div>
							{ (props.resourceImg != 'undefined') && (
							<div className="image-cont"
								data-imgid={ props.resourceImgID }
							>
								<img
									className="resource-img"
									src={ props.resourceImg }
								/>
							</div>
							)}
							
						</Fragment>
					)}
					{ (props.updateResourceImage == null && props.resourceImg != false) && (
						<div className="image-cont">
							<img 
								className="resource-image"
								src={ props.resourceImg }
							/>
						</div>
					)}
					<div 
						className="content"
						data-id={ props.resourceID }
					>
            			<div className="top">
							<RichText.Content
								tagName="h4"
								className="resource-title"
								value={
									props.resourceTitle
								}
							/>
							{/*<RichText.Content
								tagName="p"
								className="resource-year"
								value={
									props.resourceYear
								}
							/>*/}
						</div>
						<div className="bottom">
							<RichText.Content
								tagName="p"
								className="resource-miles"
								value={
									props.resourceMiles
								}
							/>
							<RichText.Content
								tagName="p"
								className="resource-price"
								value={
									props.resourcePrice
								}
							/>
						</div>	
					</div>	
				</div>
				</div>
			</div>
		</Fragment>
	)
}

ResourceCard.View = (props) => {
	let buttonText = props.resourceType == 'Videos' ? 'Watch Video' : 'Read More';
	let slideClass = props.resourceClass != null ? props.resourceClass : '';
	let calculate = props.calculatePrice != null ? props.calculatePrice : false;
	let typeClass= '';
	let payment;
	if (props.resourceType == 'Whitepaper') {
		typeClass = 'whitepaper';
	} else if(props.resourceType == 'Video') {
		typeClass = 'video';
	}

	if (calculate == true) {
		let price = props.resourcePrice;
		price = price.replace(',', '');
		price = price.replace('$', '');
		let down = props.data['down'];
		let apr = props.data['apr'];
		apr = (apr/100)/12;
		let term = props.data['term'];
		payment = props.savingsFormula(price, down, apr, term);
		payment = payment > 0 ? payment : 0;
  		payment = Math.round(payment, 2);
  		payment = new Intl.NumberFormat('en-US').format(payment);

	}

	let title = props.resourceTrim != undefined ? props.resourceTitle + ' ' + props.resourceTrim : props.resourceTitle;

	return(
		<Fragment>
			<div className={ `resource-card ${slideClass} ${typeClass}` } key={ props.resourceIndex }>
				<div className="resource-extra">
				<a className="resource-wrap" href={ props.resourceURL }>
					{ props.resourceImg != 'undefined' && (
						<div className="image-cont"
							data-imgid={ props.resourceImgID }
						>
							<img
								className="resource-img"
								src={ props.resourceImg }
							/>
						</div>
					)}
					<div
						className="content"
						data-id={ props.resourceID }
					>
						<div className="top">
							<RichText.Content
								tagName="h4"
								className="resource-title"
								value={
									title
								}
							/>
							{/*<RichText.Content
								tagName="p"
								className="resource-year"
								value={
									props.resourceYear
								}
							/>*/}
						</div>
						<div className="bottom">
							<RichText.Content
								tagName="p"
								className="resource-miles"
								value={
									props.resourceMiles
								}
							/>
							<RichText.Content
								tagName="p"
								className="resource-price"
								value={
									props.resourcePrice
								}
							/>
						</div>
						{ calculate && (
							<div className="bottom price-cont">
								<RichText.Content
									tagName="span"
									className="monthly-est"
									value={__("Est. Payment")}
								/>
								<RichText.Content
									tagName="span"
									className="monthly-price"
									value={ '$' + payment + '/mo' }
								/>
							</div>
						)}
					</div>
				</a>
				</div>
			</div>
		</Fragment>
	)
}

export default ResourceCard;