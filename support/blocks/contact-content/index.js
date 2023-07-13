const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/contact-content', {
	title: __( 'Header Intro in Columns', 'cls-blocks' ),
	description: __( ' Can contain blocks for header and description in column format. Useful for introduction to section.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	parent: ['cls-blocks/contact'],
	category: 'layout',
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: '.header-title',
			default: ''
		},
		content: {
			type: 'string',
			source: 'html',
			selector: '.content',
			default: ''
		},
		subtitle: {
			type: 'string',
			source: 'html',
			selector: '.header-suptitle',
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
		icons : {
			type: 'array',
      		source: 'query',
      		default: [],
      		selector: '.icon-row',
      		query: {
      			title: {
      				type: 'string',
      				source: 'html',
      				selector: '.contact-item',
      				default: ''
      			},
      			icon: {
      				type: 'string',
      				source: 'attribute',
      				default: 'address-book',
      				selector: '.icon-icon',
      				attribute: 'data-icon',
      			},
      			prefix: {
      				type: 'string',
      				source: 'attribute',
      				selector: '.icon-wrap',
      				attribute: 'data-prefix',
      				default: 'far'
      			}
      		}
		}
	},
	edit: edit,
	save: save,
} );