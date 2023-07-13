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
	supports: {
		anchor: true
	},
	attributes: {
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
		embed: {
			type: 'string',
			source: 'html',
			selector: '.hero-asset'
		},
		vidOrImg: {
			type: 'string',
			default: 'image'
		},
	},
	edit: edit,
	save: save,
} );