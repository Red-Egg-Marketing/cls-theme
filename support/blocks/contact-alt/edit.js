const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;

const template = [
	['cls-blocks/contact-forms'],
	['cls-blocks/contact-content', {
		'template': [
			['core/heading', {'level' : 3, 'placeholder' : 'Contact heading...'}],
			['core/paragraph', {'placeholder' : 'Contact description...'}],
		],
		'allowBlocks': [
			'core/heading', 'core/paragraph', 'core/separator'
		]
	}]
];

const EditContactAlt = ( { attributes, setAttributes } ) => {
	
		const blockProps = useBlockProps({
			className: 'contact-alt-section contact-section'
		});	

		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">
							<InnerBlocks 
								allowedBlocks={ ['cls-blocks/contact-content', 'cls-blocks/contact-forms'] }
								template={ template }
								templateLock="all"
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditContactAlt;