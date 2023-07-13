const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['cls-blocks/section-header', {}],
	['cls-blocks/image-text', {'level' : 3}],
];

const EditSectionColumns = ( { attributes } ) => {

		const blockProps = useBlockProps({
			className: 'section-columns'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={ ['cls-blocks/section-header', 'cls-blocks/image-text'] }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditSectionColumns;