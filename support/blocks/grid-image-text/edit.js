const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;

const template = [
	['cls-blocks/content',
		{
			'template' : [
				['core/image'],
				['core/heading', {'level' : 3, 'placeholder' : 'Card Title...'}],
				['core/paragraph', {'placeholder' : 'Card Description...'}],
				['core/buttons', {},
					[
					 ['core/button', {'placeholder' : 'Card Button'}]
					]
				],
			],
			'allowBlocks' : ['core/image', 'core/heading', 'core/paragraph', 'core/buttons']
		}
	],
	['cls-blocks/content',
		{
			'template' : [
				['core/image'],
				['core/heading', {'level' : 3, 'placeholder' : 'Card Title...'}],
				['core/paragraph', {'placeholder' : 'Card Description...'}],
				['core/buttons', {},
					[
					 ['core/button', {'placeholder' : 'Card Button'}]
					]
				],
			],
			'allowBlocks' : ['core/image', 'core/heading', 'core/paragraph', 'core/buttons']
		}
	],
	['cls-blocks/content',
		{
			'template' : [
				['core/image'],
				['core/heading', {'level' : 3, 'placeholder' : 'Card Title...'}],
				['core/paragraph', {'placeholder' : 'Card Description...'}],
				['core/buttons', {},
					[
					 ['core/button', {'placeholder' : 'Card Button'}]
					]
				],
			],
			'allowBlocks' : ['core/image', 'core/heading', 'core/paragraph', 'core/buttons']
		}
	],
];

const allowBlocks = ['cls-blocks/content'];

const EditGrid = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'grid-text-cards'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks 
							allowedBlocks={ allowBlocks }
							template={ template }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditGrid;