const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	[
		'cls-blocks/table-cell', {
			'template' : [
				['core/paragraph', {'placeholder': 'Header...'}]
			]
		}
	],
	[
		'cls-blocks/table-cell', {
			'template' : [
				['core/paragraph', {'placeholder': 'Header...'}]
			]
		}
	],
	[
		'cls-blocks/table-cell', {
			'template' : [
				['core/paragraph', {'placeholder': 'Header...'}]
			]
		}
	]
];


const EditTableRowHead = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'table-row-head'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks
						template={ template }
						allowedBlocks={['cls-blocks/table-cell']}
						templateLock="all"
					/>
				</div>
			</Fragment>
		);
}

export default EditTableRowHead;