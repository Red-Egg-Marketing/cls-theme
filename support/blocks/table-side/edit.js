const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	[
		'cls-blocks/header-intro'
	],
	[
		'cls-blocks/table-row-head'
	],
	[
		'cls-blocks/table-row-side'
	],
];


const EditTableSide = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'side-table'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={['core/paragraph', 'cls-blocks/header-intro', 'cls-blocks/table-row-side', 'cls-blocks/table-row-head']}
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTableSide;