const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;

const EditContactContent = ( { attributes, setAttributes } ) => {

		const { template, allowBlocks } = attributes;

		const blockProps = useBlockProps({
			className: 'content-column column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>							
					<InnerBlocks 
						allowedBlocks={ allowBlocks }
						template={ template }
						templateLock={ false }
					/>
				</div>
			</Fragment>
		);
}

export default EditContactContent;