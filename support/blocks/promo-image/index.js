const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/promo-image', {
	title: __( 'Promo/Image Offset Card', 'cls-blocks' ),
	description: __( 'Contains Image, Title, Description and Buttons. Has offset display.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'columns',
	category: 'layout',
	attributes: {
		contentAlign: {
			type: 'string',
			default: 'img-right',
			selector: '.block-content'
		},
		textAlign: {
			type: 'string',
			default: 'text-center',
			selector: '.block-wrapper'
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