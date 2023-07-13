import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, ColorPalette, TextControl } = wp.components;
const { __ } = wp.i18n;

const Anchor = (props) => {

	const { anchor } = props;


	const updateAnchor = (value) => {
		let removeSpace = value.replace(/\s+/g, '-');
		props.setAttributes({ anchor: removeSpace });
	}

	
	return (
		<Fragment>
			<PanelBody
				title={ __( 'HTML Anchor' ) }
				initialOpen={ false }
			>
				<TextControl
					label={ __( 'HTML Anchor' ) }
					value={ anchor }
					onChange={ updateAnchor }
					help={__('Enter a word or two — without spaces — to make a unique web address just for this heading, called an “anchor.”')}
				/>
						
			</PanelBody>
		</Fragment>
	)
}

Anchor.View = (props) => {
	return null;
}

export default Anchor;