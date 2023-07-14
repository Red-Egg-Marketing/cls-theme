const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['core/cover', {}]
];

const EditColumnCTA = ( { } ) => {

		const blockProps = useBlockProps({
			className: 'column-cta',
		});
		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks
						template={ template }
						allowedBlocks={ ['core/cover'] }
					/>
				</div>
			</Fragment>
		);
}

export default EditColumnCTA;