const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, RangeControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;
const template = [
	['cls-blocks/hero'],
	['cls-blocks/hero'],
	['cls-blocks/hero']
];

const EditImageGrid = ( { attributes, setAttributes } ) => {

        const blockProps = useBlockProps({
        	className: 'image-grid'
        });

		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							allowedBlocks={ ['cls-blocks/hero'] }
							template={ template }
							templateLock="all"
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditImageGrid;