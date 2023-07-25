const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['cls-blocks/section-header', {}],
	['cls-blocks/list-item', {}],
	['cls-blocks/list-item', {}],
	['core/paragraph', {'placeholder' : 'Description...'}],
	['core/buttons', {},[
		['core/button', {'placeholder' : 'Learn More...'}]
	]],
];

const EditNumberedList = ( { attributes } ) => {

		const blockProps = useBlockProps({
			className: 'numbered-list'
		});	
		
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<InnerBlocks
						template={ template }
						allowedBlocks={ ['cls-blocks/list-item', 'cls-blocks/section-header', 'core/buttons', 'core/paragraph'] }
					/>
				</div>
			</div>
		);
}

export default EditNumberedList;