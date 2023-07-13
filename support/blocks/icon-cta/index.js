const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/icon-cta', {
	title: __( 'Icon or CTA', 'cls-blocks' ),
	description: __( 'Option for CTA (button) or icon and title.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['cls-blocks/icon-rows'],
	attributes: {
		template: {
			type: 'array',
			default: []
		},
		title: {
			type: 'string',
			source: 'text',
			selector: '.header-title',
			default: ''
		},
		link : {
			type: 'string',
			source: 'attribute',
			selector: '.icon-link',
			attribute: 'href',
			default: '',
		},
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
		altSlug: {
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
      				default: 'fal'
      			}
			}
		}
	},
	edit: edit,
	save: save,
} );