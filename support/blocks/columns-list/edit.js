const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';

const template = [
	[
		'cls-blocks/section-header', {}
	],
	[
		'core/list', {'placeholder' : 'List item..'}
	],
	[
		'core/list', {'placeholder' : 'List item..'}
	],
	[
		'core/list', {'placeholder' : 'List item..'}
	],
];


const EditColumnsList = ( { attributes, setAttributes, clientId } ) => {
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

		const blockProps = useBlockProps({
			className: 'columns-list' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '') + (isNarrow ? ' narrow-width' : ''),
			style: backgroundSettings
		});

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'list-' + clientId } );
        	}
    	}, [] );
		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundSelector
						setAttributes={ setAttributes }
						image={ image }
					/>
					<BackgroundColor
						setAttributes={ setAttributes }
						bgColor={ bgColor }
						bgSlug={ bgSlug }
					/>
					<PanelBody
						title={__("Set Width")}
						initialOpen={ false }
					>
						<ToggleControl
							label="Narrow Width"
							checked={ isNarrow }
            				onChange={ () => {
            				    setAttributes({
            				    	isNarrow: !isNarrow
            				    })
            				} }
						/>
					</PanelBody>
				</InspectorControls>
				<PaddingSelector
					setAttributes={ setAttributes }
					padding={ padding }
					id={ 'block-' + clientId }
				/>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={['cls-blocks/section-header', 'core/list', 'core/heading', 'core/buttons']}
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditColumnsList;