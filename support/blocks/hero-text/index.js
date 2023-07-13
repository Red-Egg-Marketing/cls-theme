const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/hero-text', {
	apiVersion: 2,
	title: __( 'Hero Text Only', 'cls-blocks' ),
	icon: 'id',
	category: 'layout',
	supports: {
		anchor: true
	},
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
	edit: edit,
	save: save,
} );