import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, ColorPalette } = wp.components;
const { __ } = wp.i18n;

const defcolors = [
    { name: 'White', color: 'rgba(255, 255, 255, 1)', slug: 'white' },
    { name: 'Red Orange', color: 'rgba(245, 245, 245, 1)', slug: 'red-orange' },
    { name: 'Lime Green', color: 'rgba(145, 201, 86)', slug: 'lime-green' },
    { name: 'Green', color: 'rgba(0, 118, 71)', slug: 'green' },
];

const ColorSelector = (props) => {


	const { color, colors, colorSlug } = props;

	const customColors = colors == null ? defcolors : colors;

	const setColor = (value) => {

		var bgColor = customColors.find(obj => {
			if (obj.color == value) {
				return obj;
			}
		});

		props.setAttributes( {
			colorSlug: value
		});

		props.setAttributes({
			color: bgColor != undefined ? 'has-' + bgColor.slug + '-color' : ''
		});
	}

	
	return (
		<Fragment>
			<PanelBody
				title={__('Color Selector')}
				initialOpen={ true }
			>
				<ColorPalette
            		colors={ customColors }
            		value={ colorSlug }
            		onChange={ setColor }
            		disableCustomColors={ true }
        		/>
			</PanelBody>
		</Fragment>
	)
}

ColorSelector.View = (props) => {
	return null;
}

export default ColorSelector;