const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';

const EditFeaturedLink = ( { attributes, setAttributes } ) => {
		const {
			media, title, link, mainTitle, supTitle
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

		const blockProps = useBlockProps({
			className: 'featured-link'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<header>
						<div className="head-cont">
							<Header
								tag="h3"
								title={ supTitle }
								updateProp={ "supTitle" }
								setAttributes={ setAttributes }
								placeholder={__('Super Title...', 'cls')}
								classProp="sup-title"
							/>
							<Header
								tag="h2"
								title={ mainTitle }
								updateProp={ "mainTitle" }
								setAttributes={ setAttributes }
								placeholder={__('Featured Title...', 'cls')}
								classProp="main-title"
							/>
						</div>
					</header>
					<div className="image-cont">
						<div 
							className="image-background"
						>
							<ImageComp
								id={ media.id }
								source={ media.srcSet.large }
								updateImageAttr={ updateImageAttr }
								alt={ __( media.alt ) }
							/>
							<Header
								tag="h4"
								title={ title }
								allowedFormats={['']}
								setAttributes={ setAttributes }
								placeholder={__('Featured Description...', 'cls')}
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

export default EditFeaturedLink;