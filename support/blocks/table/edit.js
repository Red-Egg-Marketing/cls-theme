const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	[
		'cls-blocks/table-row', {}
	],
	[
		'cls-blocks/table-row', {}
	]
];


const EditTableRow = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'table'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks
						template={ template }
						allowedBlocks={['cls-blocks/table-row']}
					/>
				</div>
			</Fragment>
		);
}

export default EditTableRow;