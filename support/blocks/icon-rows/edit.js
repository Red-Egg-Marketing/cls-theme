const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { useSelect } = wp.data;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['cls-blocks/section-header', {}],
	['cls-blocks/icon-cta', {}],
	['cls-blocks/icon-cta', {}],
	['cls-blocks/icon-cta', {}],
	['cls-blocks/icon-cta', {}],
	['cls-blocks/icon-cta', {}],
];

const EditIconRows = ( { attributes, setAttributes, clientId } ) => {

		const blockProps = useBlockProps({
			className: 'icons-row'
		});	
		
		return (

			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={ ['cls-blocks/icon-cta'] }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditIconRows;