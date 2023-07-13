const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import Columns from '../../components/Columns.js';

const template = [
	['cls-blocks/header-intro', {}],
	['cls-blocks/title-image-cta'],
	['cls-blocks/title-image-cta'],
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'View Portfolio...'}]
		]
	],
];

const EditTitleImageCTAGroup = ( { attributes, setAttributes } ) => {

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

		const blockProps = useBlockProps({
			className: 'title-image-group' + ' columns-' + columns,
			style: backgroundSettings
		});	
		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundSelector
						setAttributes={ setAttributes }
						image={ image }
					/>
					<Columns
						setAttributes={ setAttributes }
						columns={ columns }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="links-wrapper">
							<InnerBlocks
								template={ template }
								allowedBlocks={['cls-blocks/title-image-cta', 'cls-blocks/header-intro', 'core/buttons']}
							/>
						</div>	
					</div>
				</div>
			</Fragment>
		);
}

export default EditTitleImageCTAGroup;