const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Header from '../../components/Header.js';

const template = [
	['cls-blocks/savings-form', {},],
	['cls-blocks/cta', {}]
];

const EditSavingsCalculator = ( { attributes, setAttributes } ) => {
		const {
			content, title
		} = attributes;


		const blockProps = useBlockProps({
			className: 'savings-calculator light-blue'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={ ['cls-blocks/savings-form', 'cls-blocks/cta'] }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditSavingsCalculator;