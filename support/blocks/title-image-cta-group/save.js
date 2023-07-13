const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';


const SaveTitleImageCTAGroup = ( { attributes } ) => {

		const {
			image, columns
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
			className: 'title-image-group' + ' columns-' + columns,
			style: backgroundSettings
		});

		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="links-wrapper grid">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveTitleImageCTAGroup;