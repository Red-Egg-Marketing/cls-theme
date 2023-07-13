const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/feature-section', {
	title: __( 'Feature Section', 'cls-blocks' ),
	description: __( 'Feature Section with animation features', 'cls-blocks' ),
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
		columnwidth: {
			type: 'string',
			default: 'col-66'
		},
		contentAlign: {
			type: 'string',
			default: 'img-left',
			selector: '.block-content'
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
		}
	},
	edit: edit,
	save: save,
} );