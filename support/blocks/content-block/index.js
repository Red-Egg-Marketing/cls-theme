const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/content', {
	title: __( 'Content Column', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	parent: ['cls-blocks/image-text', 'cls-blocks/grid-image'],
	attributes: {
		template: {
			type: 'array',
			default: [['core/heading'],['core/paragraph']]
		},
		allowBlocks: {
			type: 'array',
			default: ['core/heading', 'core/paragraph', 'core/list', 'core/buttons', 'core/html', 'gravityforms/form']
		}
	},
	category: 'layout',
	edit: edit,
	save: save,
} );