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
	['core/heading'],
	['core/paragraph']
];

const allowBlocks = ['core/heading', 'core/paragraph', 'core/list', 'core/buttons'];

const EditContent = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'content-column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks 
						allowedBlocks={ allowBlocks }
						template={ template }
					/>
				</div>
			</Fragment>
		);
}

export default EditContent;