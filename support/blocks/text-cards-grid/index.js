const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/cards-grid', {
	title: __( 'Text Cards Grid', 'cls-blocks' ),
	description: __( 'Grid of Text Cards', 'cls-blocks' ),
	apiVersion: 2,
	attributes: {
		columns: {
			type: 'string',
			default: '3'
		},
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
		padding: {
			type: 'object',
			default: {
			}
		},
		blockId: {
			type: 'string'
		}
	},
	icon: 'grid-view',
	category: 'layout',
	edit: edit,
	save: save,
} );