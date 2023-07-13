const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/resources', {
	apiVersion: 2,
	title: __( 'Filterable Resources', 'cls-blocks' ),
	description: __( 'Block with filterable list of Resourcess', 'cls-blocks' ),
	icon: 'megaphone',
	category: 'layout',
	attributes: {
		resources: {
			type: 'array',
			default: []
		},
		taxonomies : {
			type: 'object'
		},
		anchor: {
			type: 'string',
			default: ''
		},
	},
	edit: edit,
	save: save
} );