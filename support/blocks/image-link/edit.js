const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';

const EditImageLink = ( { attributes, setAttributes } ) => {
		const {
			media, link, title, button
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
			className: 'image-link swiper-slide'
		});	
		
		return (
			<Fragment>
				<InspectorControls>
					<ToggleControl 
							label={__('With Button?')}
							checked={ !!button }
							onChange={ () => {
									setAttributes({
										button: !button
									});
								}
							}
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div 
						className="text-card"
					>
						<Header
							tag="h3"
							title={ title }
							setAttributes={ setAttributes }
							placeholder={ __('Title...', 'cls-blocks')}
						/>
						<ImageComp
							id={ media.id }
							source={ media.srcSet.large }
							updateImageAttr={ updateImageAttr }
							alt={ __( media.alt ) }
						/>
						{ button && (
							<p>
								<block className="block-level">Learn More</block>
							</p>
						)}
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

export default EditImageLink;