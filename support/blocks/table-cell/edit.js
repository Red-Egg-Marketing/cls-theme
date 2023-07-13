const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;


const EditTableCell = ( { attributes, setAttributes } ) => {

		const { template } = attributes;

		const blockProps = useBlockProps({
			className: 'table-cell'
		});	
		
		return (
			<Fragment>
				<InnerBlocks
					template={ template }
					allowedBlocks={['core/paragraph', 'core/list']}
					{...blockProps}
				/>
			</Fragment>
		);
}

export default EditTableCell;