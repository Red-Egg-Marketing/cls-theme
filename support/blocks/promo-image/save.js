const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';

const SaveImageTextFull = ( { attributes } ) => {
		const {
			contentAlign, media, textAlign
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'image-content' + ' ' + contentAlign
		});

		let srcObj = media.srcSet;

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = `
			${srcObj.large} 960w, 
			${srcObj.medium} 480w`;
	
		return (
			<div {...blockProps}>
				<div className={`block-wrapper ${ textAlign }`}>
					<div className={`block-content ${ contentAlign }`}>
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
								<InnerBlocks.Content />							
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default SaveImageTextFull;