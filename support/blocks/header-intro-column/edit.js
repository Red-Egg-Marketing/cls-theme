const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import Content from '../../components/Content.js';

const template = [
			['core/heading', {'level': 2, 'className' : 'header-title'}]
];

const colors = [
    { name: 'White', color: 'rgba(255, 255, 255, 1)', slug: 'white' },
    { name: 'Light Blue', color: 'rgba(237, 245, 255, 1)', slug: 'light-blue' },
];


const EditHeaderIntroCol = ( { attributes, setAttributes } ) => {
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
    		"background-size" : imageSize
    	}

    	const blockProps = useBlockProps({
			className: 'header-intro-column' + (coloroverlay == true ? ' with-overlay ' : '') + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : ''),
			style: backgroundSettings
		});
		
    	const toggleOverlay = (value) => {
    		setAttributes(
    			{
    				coloroverlay: value
    			}
    		);
    	}

		return (
			<Fragment>
				<InspectorControls>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
						colors={ colors }
					/>
					<BackgroundSelector
						setAttributes={ setAttributes }
						image={ image }
					/>
					<PanelBody>
						<ToggleControl
							label={__('Background Overlay')}
							checked={ coloroverlay }
							onChange={ toggleOverlay }
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps} >
					<div className="block-wrapper">
						<div className="block-content">
							<div className="head-col">
								<InnerBlocks
									allowedBlocks={ ['core/heading'] }
									template={ template }
								/>
							</div>
							<div className="content-col">
								<Content 
									tag="div"
									content={ content }
									multiline="p"
									classProp="content"
									setAttributes={ setAttributes }
									placeholder={__('Content...', 'cls')}
								/>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditHeaderIntroCol;