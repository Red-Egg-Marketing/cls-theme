const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/bio', {
	title: __( 'Bio (biography)', 'cls-blocks' ),
	description: __( 'Bio block. Useful for displaying info about a person.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'users',
	category: 'layout',
	parent: ['cls-blocks/bios'],
	attributes: {
		name: {
			type: 'string',
			source: 'text',
			selector: '.header-title',
			default: ''
		},
		title: {
			type: 'string',
			source: 'text',
			selector: '.header-subtitle',
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
	},
	edit: edit,
	save: save,
} );