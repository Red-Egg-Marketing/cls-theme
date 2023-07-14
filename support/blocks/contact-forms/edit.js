const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;

const template = [
	['cls-blocks/header-intro'],
	['gravityforms/form']
];

const EditContactForms = ( { attributes, setAttributes } ) => {
	
		const blockProps = useBlockProps({
			className: 'form-column column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="form-wrap">
						<InnerBlocks 
							allowedBlocks={ ['gravityforms/form', 'cls-blocks/header-intro'] }
							template={ template }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditContactForms;