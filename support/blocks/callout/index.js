const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/callout', {
	title: __( 'Callout', 'cls-blocks' ),
	description: __( 'Callout section with title short blurb, and icon.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	attributes: {
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