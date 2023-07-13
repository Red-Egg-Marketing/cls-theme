const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/shortcode-section', {
	title: __( 'Shortcode Section', 'cls-blocks' ),
	description: __( 'Title Block with area for shortcode embedding', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
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
	},
	supports: {
		anchor: true
	},
	edit: edit,
	save: save,
} );