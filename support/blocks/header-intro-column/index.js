const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/header-intro-column', {
	title: __( 'Header Intro in Columns', 'cls-blocks' ),
	description: __( ' Can contain blocks for header and description in column format. Useful for introduction to section.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	category: 'layout',
	attributes: {
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		},
		color: {
			type: 'string',
			default: ''
		},
		coloroverlay : {
			type: 'boolean',
			default: false
		},
		content: {
			type: 'string',
			source: 'html',
			selector: '.content',
			default: ''
		},
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
	},
	edit: edit,
	save: save,
} );