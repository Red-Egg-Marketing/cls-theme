const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/case-study', {
	title: __( 'Case Study Block', 'cls-blocks' ),
	description: __( 'Block with Statistics, short description, quote, and image', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: '.header-title',
			default: ''
		},
		content: {
			type: 'string',
			source: 'html',
			selector: '.content',
			default: ''
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
		permalink : {
			type: 'string',
			default: '',
		},
		quote: {
			type: 'object',
			default: {
				'name': '',
				'snippet': '',
				'title': '',
				'image': '',
				'id': ''
			}
		},
		stats: {
			type: 'array',
			source: 'query',
			default: [],
			selector: '.stat',
			query: {
				title : {
					type: 'string',
      				source: 'html',
      				selector: '.header-title',
      				default: ''
				},
				content : {
					type: 'string',
      				source: 'html',
      				selector: '.description',
      				default: ''
				},
			}
		},
	},
	edit: edit,
	save: save,
} );