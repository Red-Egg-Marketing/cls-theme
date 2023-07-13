const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';


const EditBio = ( { attributes, setAttributes } ) => {
		const {
			media, name, title, content
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
			className: 'bio'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
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
								<Header
									tag="h3"
									title={ name }
									updateProp={ "name" }
									setAttributes={ setAttributes }
									placeholder={__('Name...', 'cls')}
								/>
								<Header
									tag="h4"
									title={ title }
									classProp="header-subtitle"
									setAttributes={ setAttributes }
									placeholder={__('Title...', 'cls')}
								/>
								<Content 
									tag="div"
									content={ content }
									multiline="p"
									placeholder={ __('Person Bio...', 'cls')}
									classProp="content"
									setAttributes={ setAttributes }
								/>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditBio;