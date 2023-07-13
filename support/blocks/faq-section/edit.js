const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import Columns from '../../components/Columns.js';

const template = [
	['core/heading', {'level' : 2, 'placeholder' : 'Heading...'}],
	['cls-blocks/faq', {}],
	['cls-blocks/faq', {}],
];

const EditFAQSection = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'faq-section'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={['cls-blocks/faq', 'core/heading']}
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditFAQSection;