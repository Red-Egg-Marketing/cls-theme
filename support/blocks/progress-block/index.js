const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/progress-block', {
	apiVersion: 2,
	title: __( 'Progress Block', 'cls-blocks' ),
	description: __( 'Block useful for displaying steps or progress of items. Has scroll and lock feature', 'cls-blocks' ),
	icon: 'dashboard',
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
		id : {
			type: 'string',
			default: ''
		},
		items: {
			type: 'array',
			source: 'query',
			default: [],
			selector: '.step',
			query: {
				title : {
					type: 'string',
      				source: 'html',
      				selector: '.step-title',
      				default: ''
				},
				content : {
					type: 'string',
      				source: 'html',
      				selector: '.step-content',
      				default: ''
				},
				media: {
					type: 'string',
					source: 'attribute',
					selector: '.step-container',
					attribute: 'data-image',
					default: ''
				},
			}
		},
		anchor: {
			type: 'string',
			default: ''
		},
	},
	edit: edit,
	save: save
} );