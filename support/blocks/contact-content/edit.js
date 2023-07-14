const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;

const template = [
	['core/html']
];

const EditContactContent = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'content-column column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>							
					<InnerBlocks 
						allowedBlocks={ ['core/html'] }
						template={ template }
					/>
				</div>
			</Fragment>
		);
}

export default EditContactContent;