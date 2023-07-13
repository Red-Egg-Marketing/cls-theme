const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';

// Available alignment control options
const alignOptions = [
	{
        label: __( 'Image Right' ),
        value: 'img-right',
    },
    {
        label: __( 'Image Left' ),
        value: 'img-left',
    },
];


const alignTextOptions = [
	{
        label: __( 'Text Right' ),
        value: 'text-right',
    },
    {
        label: __( 'Text Left' ),
        value: 'text-left',
    },
    {
        label: __( 'Text Center' ),
        value: 'text-center',
    },
];


const template = [
	['core/heading', {'placeholder' : 'Section Title', 'level' : '2', 'className' : 'header-title'}],
	['core/paragraph', {'placeholder' : 'Section paragraph'}],
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'Button Text'}]
		]
	],
];


const EditImageTextFull = ( { attributes, setAttributes } ) => {
		const {
			contentAlign, media, textAlign
		} = attributes;

		const updateImageAttr = (media) => {
			let large   = media.sizes['medium-large'] ? media.sizes['medium-large'].url : media.url,
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

		const blockProps = useBlockProps({
			className: 'image-content' + ' ' + contentAlign
		});	
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody 
						title={ __( 'Align Content' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Align Content' ) }
							value={ contentAlign }
							options={ alignOptions}
							onChange={ ( selectedAlign ) => {
								setAttributes( {
									contentAlign: selectedAlign,
								} );
							} }
						/>
					</PanelBody>
					<PanelBody 
						title={ __( 'Align Text' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Align Text' ) }
							value={ textAlign }
							options={ alignTextOptions}
							onChange={ ( selectedTextAlign ) => {
								setAttributes( {
									textAlign: selectedTextAlign,
								} );
							} }
						/>
					</PanelBody>					
				</InspectorControls>
				<div {...blockProps}>
					<div className={`block-wrapper ${ textAlign }`}>
						<div className={`block-content ${ contentAlign }`}>
							<div className="image-column column">
								<ImageComp
									id={ media.id }
									source={ media.srcSet.large }
									updateImageAttr={ updateImageAttr }
									alt={ __( media.alt ) }
								/>
							</div>
							<div className="content-column column">
								<div className="wrap">
									<InnerBlocks 
										template={ template }
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditImageTextFull;