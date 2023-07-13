const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/stat-callout', {
	title: __( 'Stat Callout', 'cls-blocks' ),
	description: __( 'Block with Statistic and short description', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
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
		}
	},
	edit: edit,
	save: save,
} );