const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Icons from '../../components/Icons.js';

const SaveImageSwipper = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'image-swiper'
		});

		return (
			<div {...blockProps}>
				<div className="swiper">
					<div className="swiper-wrapper">
						<InnerBlocks.Content />
					</div>
					<div class="swiper-button-prev"></div>
  					<div class="swiper-button-next"></div>
				</div>
			</div>
		);
}

export default SaveImageSwipper;