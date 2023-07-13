const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';
import BackgroundColor from '../../components/BackgroundColor.js';


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

const template = [
	[
		'core/buttons', {},
		[
			[
				'core/button'
			]
		]
	]
]


const colors = [
    { name: 'Lime Green', color: 'rgba(145, 201, 86)', slug: 'lime-green' },
    { name: 'Green', color: 'rgba(0, 118, 71)', slug: 'green' },
    { name: 'Red Orange', color: 'rgba(241, 90, 45)', slug: 'red-orange' },
];


const EditPromo = ( { attributes, setAttributes } ) => {
		const {
			bgColor, bgSlug, title, content, media
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
			className: 'promo'
		});	
		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
						colors={ colors }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className={`block-wrapper ${bgSlug != '' ? bgSlug + ' with-bg' : ''}`}>
						<div className="image">
							<ImageComp
								id={ media.id }
								source={ media.srcSet.large }
								updateImageAttr={ updateImageAttr }
								alt={ __( media.alt ) }
							/>
						</div>
						<div className="content-column">
							<Header
								tag="h2"
								title={ title }
								setAttributes={ setAttributes }
								placeholder={__('Promo Header...', 'cls')}
							/>
							<Content 
								tag="div"
								content={ content }
								multiline="p"
								classProp="content"
								setAttributes={ setAttributes }
								placeholder={__('Promo Content...', 'cls')}
							/>
							<InnerBlocks 
								allowedBlocks={ ["gravityforms/form", "core/paragraph"] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditPromo;