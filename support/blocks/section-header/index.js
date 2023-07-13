const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/section-header', {
	title: __( 'Section Header', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['cls-blocks/cards-grid', 'cls-blocks/icon-rows', 'cls-blocks/tabs', 'cls-blocks/shortcode-section', 'cls-blocks/columns-list', 'cls-blocks/cards-grid', 'cls-blocks/section-columns', 'cls-blocks/selected-projects', 'cls-blocks/selected-case-study'],
	attributes: {
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
	save: save,
} );