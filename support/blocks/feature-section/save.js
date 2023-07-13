const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';

const SaveImageColumns = ( { attributes } ) => {
		const {
			contentAlign, media, title, image,  bgColor, bgSlug, color, vidOrImg, videoID, videoURL, withDrop, videothumb, animateScroll, columnwidth
		} = attributes;

		const imageSize = image.size != '' ? image.size + image.unit : image.sizekey;

		let imagePos = '';

        if (image.bgkeyword == 'keyword') {
        	imagePos = image.position != '' ? image.position : '';
        } else if(image.bgkeyword == 'values') {
        	let unit = image.bgunit;
        	imagePos = image.positionX + unit + ' ' + image.positionY + unit;
        }

    	const backgroundSettings = {
    		"background-image" : image.url != '' ? 'url(' + image.url + ')' : '',
    		"background-repeat" : image.repeat != '' ? image.repeat : '',
    		"background-attachment" : image.attachment != '' ? image.attachment : '',
    		"background-position" : imagePos,
    		"background-size" : imageSize
    	}

		const blockProps = useBlockProps.save({
			className: 'feature-section' + ' ' + contentAlign + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '') + (withDrop == false ? ' no-ds' : ' with-ds') + (animateScroll == true ? ' scroll-activate' : '') + (' ' + columnwidth),
			style: backgroundSettings
		});

		let srcObj = media.srcSet;

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = ``;
	
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className={`block-content ${ contentAlign }`}>
						<div className="image-col column">
							{ vidOrImg == 'image'  && (
								<ImageComp.View
									source={ media.srcSet.large }
									alt={ __( media.alt ) }
									srcSet={ srcSet }
									sizes={ sizes }
								/>
							)}
							{ (videoID && vidOrImg == 'video' ) && (
								<Fragment>
								<button className="custom-video-button">Play</button>
									<video className="hero-asset"
										poster={ videothumb.url }
										playsinline
									>
										<source src={videoURL} className="source" type="video/mp4" />
									</video>
								</Fragment>
							)}
						</div>
						<div className="content-columns column">
							<div className="wrap">
								<InnerBlocks.Content />							
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default SaveImageColumns;