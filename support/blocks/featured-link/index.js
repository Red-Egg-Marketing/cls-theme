const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/featured-link', {
	title: __( 'Featured Link', 'cls-blocks' ),
	description: __( 'Large promo for specific page, post, project, etc.. Has Options for title, super title, image, and description.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'format-image',
	category: 'layout',
	attributes: {
		supTitle : {
			type: 'string',
			source: 'html',
			selector: '.sup-title',
			default: '',
		},
		mainTitle : {
			type: 'string',
			source: 'html',
			selector: '.main-title',
			default: '',
		},
		title : {
			type: 'string',
			source: 'html',
			selector: '.header-title',
			default: '',
		},
		link : {
			type: 'string',
			source: 'attribute',
			selector: '.image-background',
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