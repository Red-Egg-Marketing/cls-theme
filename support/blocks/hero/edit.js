const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, TextControl, SelectControl, RangeControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';

const VidImg = [
    {
        label: __( 'Image' ),
        value: 'image',
    },
    {
        label: __( 'Embed' ),
        value: 'embed',
    } 
];

const template = [
	['core/heading', {'level': 1}],
	['core/heading', {'level': 3}]
];

const EditHero = ( { attributes, setAttributes } ) => {

		const { media, embed, vidOrImg } = attributes;

        const blockProps = useBlockProps({
        	className: 'hero'
        });

        const updateImageAttr = (media) => {
			let large   = media.url,
			    medium  = media.sizes['medium-small'] ? media.sizes['medium-small'].url : media.url;

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

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'With Image or Embed' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Image or Embed' ) }
							value={ vidOrImg }
							options={ VidImg }
							onChange={ ( selectedVidImg ) => {
								setAttributes( {
									vidOrImg: selectedVidImg,
								} );
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="hero__inner">
							<div className="content-wrap">
								<div className="hero-block-content">
									<div className="hero-block-wrap">
										<InnerBlocks
											allowedBlocks={ ['core/heading', 'core/paragraph'] }
											template={ template }
										/>
									</div>
									<div className="hero-block-image">
										{ vidOrImg == 'image' && (
											<Fragment>
												<ImageComp
													id={ media.id }
													source={ media.srcSet.large }
													updateImageAttr={ updateImageAttr }
													alt={ __( media.alt ) }
												/>
											</Fragment>
										)}
										{ vidOrImg == 'embed' && (
											<Fragment>
												<TextControl
													label="Embed Code"
													value={ embed }
													onChange={ (content) => {
														setAttributes({
															embed: content
														});
													}}
												/>
												<div className="hero-asset"
													dangerouslySetInnerHTML={{ __html: embed }}
												>
												</div>
											</Fragment>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditHero;