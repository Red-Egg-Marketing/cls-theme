const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['cls-blocks/section-header', {}],
	['core/shortcode', {}],
];

const EditShortcodeSection = ( { attributes, setAttributes } ) => {

		const { bgSlug, bgColor } = attributes;

		const blockProps = useBlockProps({
			className: 'shortcode-section' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
		});	
		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">							
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['cls-blocks/section-header', 'core/shortcode'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditShortcodeSection;