const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InspectorControls, useBlockProps, InnerBlocks, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';


const template = [
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'Learn More'}]
		]
	]
];

const EditTitleImageCTA = ( { attributes, setAttributes } ) => {
		const {
			media, title, content, link, introTitle
		} = attributes;

		const updateImageAttr = (media) => {
			let large   = media.sizes['post-landscape'] ? media.sizes['post-landscape'].url : media.url,
			    medium  = media.sizes['post-landscape-medium'] ? media.sizes['post-landscape-medium'].url : media.url;

            	setAttributes({
            	    media : {
						srcSet: {
							large : large,
							medium : medium
						},
						id: media.id,
						alt: media.alt
					}
            	});
        }

		const setLink = (value) => {
    		setAttributes({
    			link: value
    		});
    	}

    	const setButtonText = (value) => {
    		setAttributes({
    			buttonText: value
    		});
    	}

		const blockProps = useBlockProps({
			className: 'cta-text'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div 
						className="container"
						href={ link  }
					>
						<Header
							tag="h4"
							title={ introTitle }
							allowedFormats={['']}
							classProp="intro-title"
							updateProp="introTitle"
							setAttributes={ setAttributes }
							placeholder={ "CTA Intro Header..." }
						/>
						<ImageComp
							id={ media.id }
							source={ media.srcSet.large }
							updateImageAttr={ updateImageAttr }
							alt={ __( media.alt ) }
							background={ false }
						/>
						<div className="content-cont">
							<Header
								tag="h4"
								title={ title }
								allowedFormats={['']}
								setAttributes={ setAttributes }
								placeholder={ "CTA Header..." }
							/>
							<Content
								tag="div"
								classProp="content"
								content={ content }
								multiline="p"
								setAttributes={ setAttributes }
								placeholder="CTA excerpt..."
							/>
						</div>
					</div>
					<Flex>
						<URLInputButton 
							onChange={ setLink }
							url={ link }
						/>
					</Flex>
				</div>
			</Fragment>
		);
}

export default EditTitleImageCTA;