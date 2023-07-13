const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/title-image-cta', {
	title: __( 'CTA - Title, Image', 'cls-blocks' ),
	description: __( 'Useful for displaying CTA with title image', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'format-image',
	category: 'layout',
	parent: ['cls-blocks/title-image-cta-group'],
	attributes: {
		introTitle : {
			type: 'string',
			source: 'html',
			selector: '.intro-title',
			default: '',
		},
		title : {
			type: 'string',
			source: 'html',
			selector: '.header-title',
			default: '',
		},
		content : {
			type: 'string',
			source: 'html',
			selector: '.content',
			default: '',
		},
		link : {
			type: 'string',
			source: 'attribute',
			selector: '.container',
			attribute: 'href',
			default: '',
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
	},
	edit: edit,
	save: save,
} );