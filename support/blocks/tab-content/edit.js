const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { select, dispatch, useSelect } = wp.data;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, TextControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['core/heading', {'placeholder' : 'Tab Heading...', 'level' : 3}],
	['core/paragraph', {'placeholder' : 'Tab Content...'}],
];

const EditTabContent = ( { attributes, setAttributes, clientId, isSelected } ) => {

		const blockProps = useBlockProps({
			className: 'tab-content content-columns'
		});
		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks
						template={ template }
						allowedBlocks={ ['core/heading', 'core/paragraph', 'core/buttons', 'core/list'] }
					/>
				</div>
				
			</Fragment>
		);
}

export default EditTabContent;