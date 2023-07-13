const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';

const SavePromo = ( { attributes } ) => {
		const {
			bgColor, bgSlug, title, content, media
		} = attributes;

		let srcObj = media.srcSet;

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = `
			${srcObj.large} 960w, 
			${srcObj.medium} 480w`;

		const blockProps = useBlockProps.save({
			className: 'promo'
		});

		return (
				<div {...blockProps}>
					<div className={`block-wrapper ${bgSlug != '' ? bgSlug + ' with-bg' : ''}`}>
						<div className="image">
							<ImageComp.View
								source={ media.srcSet.large }
								alt={ __( media.alt ) }
								srcSet={ srcSet }
								sizes={ sizes }
							/>
						</div>
						<div className="content-column">
							<Header.View
								tag="h2"
								title={ title }
							/>
							<Content.View
								tag="div"
								content={ content }
								multiline="p"
								classProp="content"
							/>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
		);
}

export default SavePromo;