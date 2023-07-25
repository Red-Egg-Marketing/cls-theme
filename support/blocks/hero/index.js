const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/hero', {
	apiVersion: 2,
	title: __( 'Hero', 'cls-blocks' ),
	icon: 'id',
	category: 'layout',
	attributes: {
		image : {
			type: 'object',
			default : {
				url : '',
				width : '',
				height : '',
				repeat: 'no-repeat',
				position: 'top left',
				size: '100',
				sizekey: '',
				attachment: 'scroll',
				bgkeyword: 'keyword'
			}
		},
		videoID: {
			type: 'number',
		},
		withArrow: {
			type: 'boolean',
			default: false
		},
		vidOrImg: {
			type: 'string',
			default: 'image'
		},
		videoURL: {
			type: 'string',
			source: 'attribute',
			selector: '.hero-source',
			attribute: 'src',
		},
		anchor: {
			type: 'string',
			default: ''
		},
	},
	edit: edit,
	save: save,
} );