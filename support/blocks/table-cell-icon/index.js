const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/table-cell-icon', {
	title: __( 'Table Cell Icon', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	category: 'layout',
	parent: ['cls-blocks/table-row-side'],
	attributes: {
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		},
		iconSlug: {
			type: 'string',
			default: ''
		},
		iconColor: {
			type: 'string',
			default: ''
		},
		altSlug: {
			type: 'string',
			default: ''
		},
		width: {
			type: 'string',
			default: ''
		},
		link : {
			type: 'string',
			source: 'attribute',
			selector: '.wp-button',
			attribute: 'href',
			default: '',
		},
		content : {
			type: 'string',
			source: 'html',
			selector: '.content',
			default: ''
		},
		buttonText : {
			type: 'string',
			default: 'Learn More'
		},
		icons : {
			type: 'array',
			source: 'query',
			default: [],
			selector: '.icon-row',
			query: {
				icon: {
					type: 'string',
      				source: 'attribute',
      				default: 'address-book',
      				selector: '.icon-icon',
      				attribute: 'data-icon'
      			},
      			prefix: {
      				type: 'string',
      				source: 'attribute',
      				selector: '.icon-wrap',
      				attribute: 'data-prefix',
      				default: 'fad'
      			}
			}
		}
	},
	edit: edit,
	save: save,
} );