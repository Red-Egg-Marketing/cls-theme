const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['gravityforms/form']
];

const EditContactForms = ( { attributes, setAttributes } ) => {
	
		const blockProps = useBlockProps({
			className: 'form-column column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks 
						allowedBlocks={ ['gravityforms/form'] }
						template={ template }
					/>
				</div>
			</Fragment>
		);
}

export default EditContactForms;