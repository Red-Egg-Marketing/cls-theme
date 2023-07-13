const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveHeaderIntro = ( { attributes } ) => {
		const {
			image, bgColor, bgSlug, color, coloroverlay
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
			className: 'header-intro-block' + (coloroverlay == true ? ' with-overlay ' : '') + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : ''),
			style: backgroundSettings
		});

		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="block-content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveHeaderIntro;