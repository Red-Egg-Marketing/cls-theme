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
						{ (props.resourceID != 0 && props.updateResourceType != null) && (
            				<RichText
								tagName="h5"
								className="resource-type"
								value={ props.resourceType }
								allowedFormats={ [''] }
								placeholder={ __(
									'Resource type...',
									'emulate-custom'
								) }
								onChange={ (val) => {
									props.updateResourceType(val, props.resourceIndex);
								} }
							/>
						)}
						{ props.updateResourceType == null && (
							<h5
								className="resource-type"
							>
								{ props.resourceType }
							</h5>
						)}
						
						{ (props.resourceID != 0 && (props.updateTitle != null && props.updateTile == true)) && (
            				<RichText
								tagName="h4"
								className="resource-title"
								value={ props.resourceTitle }
								allowedFormats={ ['core/italic'] }
								placeholder={ __(
									'Resource text...',
									'emulate-custom'
								) }
								onChange={ (val) => {
									props.updateResourceText(val, props.resourceIndex);
								} }
							/>
						)}
						{ props.updateResourceText == true && (
							<h3
								className="resource-title"
							>
								{ props.resourceTitle }
							</h3>
						)}
						{ (props.resourceID != 0 && props.updateResourceExcerpt != null) && (
            				<RichText
								tagName="p"
								className="resource-excerpt"
								value={ props.resourceExcerpt }
								allowedFormats={ ['core/italic'] }
								placeholder={ __(
									'Resource excerpt...',
									'emulate-custom'
								) }
								onChange={ (val) => {
									props.updateResourceExcerpt(val, props.resourceIndex);
								} }
							/>
						)}
						{ props.updateResourceExcerpt == null && (
							<p
								className="resource-excerpt"
							>
								{ props.resourceExcerpt }
							</p>
						)}
						<div className="wp-buttons">
							<button className="wp-button">
								{ buttonText }
							</button>
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
	let typeClass= '';
	if (props.resourceType == 'Whitepaper') {
		typeClass = 'whitepaper';
	} else if(props.resourceType == 'Video') {
		typeClass = 'video';
	}
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
						<RichText.Content
							tagName="h5"
							className="resource-type"
							value={
								props.resourceType
							}
						/>
						<RichText.Content
							tagName="h4"
							className="resource-title"
							value={
								props.resourceTitle
							}
						/>
						<RichText.Content
							tagName="p"
							className="resource-excerpt"
							allowedFormats={['']}
							value={
								props.resourceExcerpt
							}
						/>
						<button className="wp-button">
							{ buttonText }
						</button>
					</div>
				</a>
				</div>
			</div>
		</Fragment>
	)
}

export default ResourceCard;