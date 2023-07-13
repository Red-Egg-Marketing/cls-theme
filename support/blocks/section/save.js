const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Icons from '../../components/Icons.js';

const SaveSection = ( { attributes } ) => {
		const {
			bgColor, bgSlug, icons, image, margin
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'section-block' + ' ' + bgSlug
		});

		const imageSize = image.size != '' ? image.size + '%' : image.sizekey;

		const backgroundSettings = {
    		"background-image" : image.url != '' ? 'url(' + image.url + ')' : '',
    		"background-repeat" : image.repeat != '' ? image.repeat : '',
    		"background-attachment" : image.attachment != '' ? image.attachment : '',
    		"background-position" : image.position != '' ? image.position : '',
    		"background-size" : imageSize,
    		"margin-top" : (margin.margintop == false ? '0' : ''),
			"margin-bottom" : (margin.marginbottom == false ? '0' : ''),
    	}

		return (
			<section {...blockProps} style={ backgroundSettings }>
				<div className="block-wrapper">
					{ icons.length > 0 && (
						<div className="icon-wrapper top-icon">
							<Icons.View
								rows={ icons }
							/>
						</div>
					)}
					<InnerBlocks.Content />
				</div>
			</section>
		);
}

export default SaveSection;