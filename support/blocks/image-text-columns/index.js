const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/image-text', {
	title: __( 'Image & Text Columns', 'cls-blocks' ),
	description: __( 'Contains Image, Title, Description and Buttons. Has offset display.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'columns',
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
		mask: {
			type: 'boolean',
			default: false
		},
		contentAlign: {
			type: 'string',
			default: 'img-right',
			selector: '.block-content'
		},
		columnwidth: {
			type: 'string',
			default: ''
		},
		withDrop: {
			type: 'boolean',
			default: true
		},
		media: {
			type: 'object',
			default: {
				id: '',
				alt: '',
				srcSet: {
					large: '',
					medium: '',
					small: '',
				}
			}
		},
		level: {
			type: 'string',
			default: 2
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
		videothumb : {
			type: 'object',
			default : {
				url: '',
				width: '',
				height: '',
			}
		},
		videoID: {
			type: 'number',
		},
		vidOrImg: {
			type: 'string',
			default: 'image'
		},
		videoURL: {
			type: 'string',
			source: 'attribute',
			selector: '.source',
			attribute: 'src',
		},
		animateScroll: {
			type: 'boolean',
			default: false
		},
		embed: {
			type: 'string',
			source: 'html',
			selector: '.embed-asset'
		},
	},
	supports: {
		anchor: true
	},
	edit: edit,
	save: save,
} );