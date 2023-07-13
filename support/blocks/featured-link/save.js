const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';

const SaveFeaturedLink = ( { attributes } ) => {
		const {
			media, title, link, mainTitle, supTitle
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'featured-link'
		});

		let srcObj = media.srcSet;

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = `
			${srcObj.large} 960w, 
			${srcObj.medium} 480w`;
	
		return (
			<div {...blockProps}>
				<header>
					<div className="head-cont">
						<Header.View
							tag="h3"
							title={ supTitle }
							classProp="sup-title"
						/>
						<Header.View
							tag="h2"
							title={ mainTitle }
							classProp="main-title"
						/>
					</div>
				</header>
				<div className="image-cont">
					<a 
						className="image-background"
						href={ link  }
					>
						<ImageComp.View
							id={ media.id }
							alt={ media.alt }
							source={ media.srcSet.large }
						/>
						<Header.View
							tag="h4"
							title={ title }
						/>
					</a>
				</div>
			</div>
		);
}

export default SaveFeaturedLink;