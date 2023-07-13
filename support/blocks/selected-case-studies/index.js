const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/selected-case-studies', {
	apiVersion: 2,
	title: __( 'Selected Case Studies', 'cls-blocks' ),
	description: __( 'Block for a selecting Case Studies. Displays latest 3 from selected category.', 'cls-blocks' ),
	icon: 'welcome-write-blog',
	category: 'layout',
	attributes: {
		resources: {
			type: 'array',
			default: []
		},
		anchor: {
			type: 'string',
			default: ''
		},
		category : {
			type: 'string',
		},
		mainTitle : {
			type: 'string'
		}
	},
	edit: edit,
	save: save
} );