const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';

const SaveImageLink = ( { attributes } ) => {
		const {
			media, link, title, button
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'image-link swiper-slide'
		});

		let srcObj = media.srcSet;

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = `
			${srcObj.large} 960w, 
			${srcObj.medium} 480w`;
	
		return (
			<div {...blockProps}>
				<a 
					className="text-card"
					href={ link  }
				>
					<Header.View
						tag="h3"
						title={ title }
					/>
					<ImageComp.View
						id={ media.id }
						alt={ media.alt }
						source={ media.srcSet.large }
					/>
					{ button && (
						<p>
							<block className="block-level">Learn More</block>
						</p>
					)}
				</a>
			</div>
		);
}

export default SaveImageLink;