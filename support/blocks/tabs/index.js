const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/tabs', {
	apiVersion: 2,
	title: __( 'Tabs', 'cls-blocks' ),
	description: __( 'Block for a tabs', 'cls-blocks' ),
	icon: 'table-col-after',
	category: 'layout',
	attributes: {
		anchor: {
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
	edit: edit,
	save: save
} );