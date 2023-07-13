const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	[
		'cls-blocks/table-cell', {
			'template' : [
				['core/paragraph', {'placeholder': 'Table Head'}]
			]
		}
	],
	[
		'cls-blocks/table-cell'
	]
];


const EditTableRow = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'table-row'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks
						template={ template }
						allowedBlocks={['cls-blocks/table-cell']}
					/>
				</div>
			</Fragment>
		);
}

export default EditTableRow;