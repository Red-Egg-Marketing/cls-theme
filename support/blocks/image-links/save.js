const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Icons from '../../components/Icons.js';

const SaveImageLinks = ( { attributes } ) => {

		const {
			slideshow
		} = attributes;
	
		const blockProps = useBlockProps.save({
			className: 'image-links' + ((slideshow == 'slideshow' || typeof slideshow == 'undefined') ? ' slideshow' : ' cols')
		});

		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="links-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveImageLinks;