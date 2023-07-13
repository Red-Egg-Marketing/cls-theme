const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';

const SaveHeaderIntroCol = ( { attributes } ) => {
		const {
			image, bgColor, bgSlug, color, coloroverlay, content
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
    		"background-size" : imageSize,
    	}

    	const blockProps = useBlockProps.save({
			className: 'header-intro-column' + (coloroverlay == true ? ' with-overlay ' : '') + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : ''),
			style: backgroundSettings
		});

		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="block-content">
						<div className="head-col">
							<InnerBlocks.Content />
						</div>
						<div className="content-col">
							<Content.View
								tag="div"
								content={ content }
								multiline="p"
								classProp="content"
							/>
						</div>
					</div>
				</div>
			</div>
		);
}

export default SaveHeaderIntroCol;