const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;

const EditContent = ( { attributes, setAttributes } ) => {

		const { template, allowBlocks } = attributes;

		const blockProps = useBlockProps({
			className: 'content-column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks 
						allowedBlocks={ allowBlocks }
						template={ template }
					/>
				</div>
			</Fragment>
		);
}

export default EditContent;