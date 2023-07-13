import React from 'react';
const { Fragment } = wp.element;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button, PanelBody } = wp.components;
const { __ } = wp.i18n;


const style = {
	"position" : "relative",
	"z-index"	: "2"
}

const ImageComp = (props) => {

	return (
		<Fragment>
			<div className="media-controls" style={ style }>
				<MediaUpload
					onSelect={ props.updateImageAttr }
					allowedTypes="image"
					value={ props.id }
					render={ ( { open } ) => (
						<Button
							className="button"
							onClick={ open }
						>
							Upload/Change Image
						</Button>
					) }
				/>
			</div>
			{ (props.source != '' && props.background !== true) &&
				(
					<div className="img-container">
						<img
							src={ props.source }
							className="image-comp"
							loading="eager"
							alt={ __( props.alt ) }
						/>
					</div>
				) }
		</Fragment>
	)
}

ImageComp.View = (props) => {
	return(
		<Fragment>
			{ (props.source != '' && props.background !== true )  && 
				(
					<div className="img-container">
						<img 
							src={ props.source }
							className="image-comp"
							loading="lazy"
							srcSet={ props.srcSet }
							alt={ __( props.alt ) }
							sizes={ props.sizes }
						/>
					</div>
				)}
		</Fragment>
	)
}

export default ImageComp;