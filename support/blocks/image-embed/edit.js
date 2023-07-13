const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
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


const EditImageEmbed = ( { attributes, setAttributes } ) => {

		const [template, setTemplate] = useState(['core/image']);
  		const [allowBlocks, setBlocks] = useState(['core/image']);

		const { vidOrImg, embed } = attributes;

        const blockProps = useBlockProps({
        	className: 'image-embed'
        });

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

								if (vidOrImg == 'embed') {
									setTemplate(['core/image']);
									setBlocks(['core/image']);
								} else {
									setTemplate(['core/html']);
									setBlocks(['core/html']);
								}
						
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<InnerBlocks
						allowedBlocks={ allowBlocks }
						template={ [template] }
					/>
				</div>
			</Fragment>
		);
}

export default EditImageEmbed;