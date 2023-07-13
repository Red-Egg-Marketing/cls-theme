const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';

const SaveBio = ( { attributes } ) => {
		const {
			media, name, title, content
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'bio'
		});

		let srcObj = media.srcSet;

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = `
			${srcObj.large} 960w, 
			${srcObj.medium} 480w`;
	
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="image-column column">
						<ImageComp.View
							source={ media.srcSet.large }
							alt={ __( media.alt ) }
							srcSet={ srcSet }
							sizes={ sizes }
						/>
					</div>
					<div className="content-column column">
						<div className="wrap">
							<Header.View
								tag="h3"
								title={ name }
							/>
							<Header.View
								tag="h4"
								title={ title }
								classProp="header-subtitle"
							/>				
							<Content.View
								tag="div"
								multiline="p"
								classProp="content"
								content={ content }
							/>		
						</div>
					</div>
				</div>
			</div>
		);
}

export default SaveBio;