const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	[
		'cls-blocks/table-cell', {
			'template' : [
				['core/paragraph', {'placeholder': 'Description...'}]
			]
		}
	],
	[
		'cls-blocks/table-cell-icon'
	],
	[
		'cls-blocks/table-cell', {
			'template' : [
				['core/paragraph', {'placeholder': 'Description...'}]
			]
		}
	]
];


const EditTableRowSide = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'table-row-side table-row'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks
						template={ template }
						allowedBlocks={['cls-blocks/table-cell', 'cls-blocks/table-cell-icon']}
						templateLock="all"
					/>
				</div>
			</Fragment>
		);
}

export default EditTableRowSide;