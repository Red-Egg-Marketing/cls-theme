import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, ColorPalette } = wp.components;
const { __ } = wp.i18n;

const defcolors = [
    { name: 'Light Blue', color: 'rgba(199, 225, 232)', slug: 'lighter-blue' },
    { name: 'White', color: 'rgba(255, 255, 255)', slug: 'white' },
];

const BackgroundColor = (props) => {

	const { bgColor, bgSlug, colors, title } = props;

	const customColors = colors == null ? defcolors : colors;

	const settitle = title == null ? 'Background Color' : title;

	const setBackgroundColor = (value) => {

		var bgColor = customColors.find(obj => {
			if (obj.color == value) {
				return obj;
			}
		});

		props.setAttributes( {
			bgColor: value
		});

		props.setAttributes({
			bgSlug: bgColor != undefined ? bgColor.slug : ''
		});

	}

	
	return (
		<Fragment>
			<PanelBody
				title={__( settitle )}
				initialOpen={ true }
			>
				<ColorPalette
            		colors={ customColors }
            		value={ bgColor }
            		onChange={ setBackgroundColor }
            		disableCustomColors={ true }
        		/>
			</PanelBody>
		</Fragment>
	)
}

BackgroundColor.View = (props) => {
	return null;
}

export default BackgroundColor;