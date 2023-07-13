const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['cls-blocks/header-intro'],
	['cls-blocks/image-swiper']
];

const displayType = [
	{ label: 'Slideshow', value: 'slideshow'},
	{ label: '3 Columns', value: 'cols'},
];

const EditImageLinks = ( { attributes, setAttributes } ) => {

		const {
			slideshow
		} = attributes;

		const setDisplay = (value) => {
			setAttributes({
				slideshow : value
			});
		}

		const blockProps = useBlockProps({
			className: 'image-links' + ((slideshow == 'slideshow' || typeof slideshow == 'undefined') ? ' slideshow' : ' cols')
		});	
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
							title={ __('Display for Links')}
							initialOpen={ true }
						>
							<SelectControl
								 label={ __('Display for Links')}
								 value={ slideshow }
								 options={
								 	displayType
								 }
								 onChange={ setDisplay }
							/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="links-wrapper">
							<InnerBlocks
								template={ template }
								allowedBlocks={['cls-blocks/header-intro', 'cls-blocks/image-swiper']}
							/>
						</div>	
					</div>
				</div>
			</Fragment>
		);
}

export default EditImageLinks;