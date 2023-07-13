const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/selected-case-study', {
	apiVersion: 2,
	title: __( 'Selected Case Study.', 'cls-blocks' ),
	description: __( 'Block for a selecting a case study.', 'cls-blocks' ),
	icon: 'welcome-write-blog',
	category: 'layout',
	supports: {
		anchor: true
	},
	attributes: {
		resources: {
			type: 'string',
			source: 'html',
			default: ''
		},
		category : {
			type: 'string',
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