const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['cls-blocks/image-link'],
	['cls-blocks/image-link'],
	['cls-blocks/image-link'],
];

const EditImageSwiper = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'image-swiper'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="swiper">
						<div className="swiper-wrapper">
							<InnerBlocks
								template={ template }
								allowedBlocks={['cls-blocks/image-link']}
							/>
						</div>
						<div class="swiper-button-prev"></div>
  						<div class="swiper-button-next"></div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditImageSwiper;