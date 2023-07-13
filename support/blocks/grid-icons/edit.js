const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';

const colors = [
    // { name: 'White', color: 'rgba(255, 255, 255, 1)', slug: 'white' },
    { name: 'Green', color: 'rgba(145, 201, 86, 1)', slug: 'green' },
];

const template = [
	['cls-blocks/icon-cta'],
	['cls-blocks/icon-cta'],
	['cls-blocks/icon-cta'],
	['cls-blocks/icon-cta', {'template' :[
		['core/buttons', {},
			[
				['core/button', {'placeholder' : 'Get a Quote'}]
			]
		]
	]}],
];

const EditGridIcons = ( { attributes, setAttributes } ) => {

		const {
			bgColor, bgSlug
		} = attributes;

		const blockProps = useBlockProps({
			className: 'grid-icons' + ' ' + bgSlug
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
						<div className="icon-wrapper">
							<InnerBlocks
								template={ template }
								allowedBlocks={['cls-blocks/icon-cta']}
							/>
						</div>	
					</div>
				</div>
			</Fragment>
		);
}

export default EditGridIcons;