const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex, TextareaControl, TextControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['core/html', {}],
];


const EditHTML = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'html-embed'
		});	
		
		return (
			<div 
				{...blockProps}
			>
				<InnerBlocks
					template={ template }
					allowedBlocks={ ['core/html'] }
				/>
			</div>
		);
}

export default EditHTML;