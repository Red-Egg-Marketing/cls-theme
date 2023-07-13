const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/image-embed', {
	apiVersion: 2,
	title: __( 'Image Embed', 'cls-blocks' ),
	icon: 'id',
	category: 'layout',
	parent: ['cls-blocks/tab'],
	attributes: {
		vidOrImg: {
			type: 'string',
			default: 'image'
		},
		embed: {
			type: 'string',
			source: 'html',
			selector: '.asset'
		},
	},
	edit: edit,
	save: save,
} );