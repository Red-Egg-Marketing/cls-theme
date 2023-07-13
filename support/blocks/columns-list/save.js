const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, InspectorControls } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import PaddingSelector from '../../components/Padding.js';

const SaveColumnList = ( { attributes } ) => {
	
		const {
			image, padding, blockId, bgColor, bgSlug, isNarrow
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
			className: 'columns-list' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '') + (isNarrow ? ' narrow-width' : ''),
			style: backgroundSettings,
			id: blockId
		});

		return (
			<Fragment>
				<PaddingSelector.View 
					padding={ padding }
					id={ blockId }
				/>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>
			</Fragment>
		);
}

export default SaveColumnList;