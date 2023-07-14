const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['cls-blocks/header-intro', {}],
	['cls-blocks/numbered-list', {}],
	['core/paragraph', {'placeholder' : 'Numbered List Footer Description...'}],
	['core/buttons', {},
		[
			['core/button', {'placeholder': 'CTA button...'}]
		]
	],
];

const EditSectionList = ( { attributes } ) => {

		const blockProps = useBlockProps({
			className: 'section-list'
		});	
		
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<InnerBlocks
						template={ template }
						allowedBlocks={ ['cls-blocks/section-header', 'cls-blocks/numbered-list', 'core/buttons', 'core/paragraph'] }
					/>
				</div>
			</div>
		);
}

export default EditSectionList;