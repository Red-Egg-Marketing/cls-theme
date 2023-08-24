const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';


const template = [
	['cls-blocks/section-header', {}],
	['core/heading', {'level' : 3, 'placeholder' : 'Section header...'}],
	['core/list', {'placeholder' : 'Section list...'}],
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'Learn more...'}]
		]
	],
	['cls-blocks/callout', {}],
];

const EditSection = ( { attributes, setAttributes } ) => {

		const { bgSlug, bgColor } = attributes;

		const blockProps = useBlockProps({
			className: 'section-block' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
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
				<section {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={ [
							 'cls-blocks/section-header',
							 'core/heading',
							 'core/list',
							 'core/spacer',
							 'core/buttons', 
							 'core/paragraph',
							 'cls-blocks/callout',
							 ] 
							}
						/>
					</div>
				</section>
			</Fragment>
		);
}

export default EditSection;