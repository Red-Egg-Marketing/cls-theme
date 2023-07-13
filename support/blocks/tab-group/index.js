const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/tab-group', {
	title: __( 'Tab Group', 'cls-blocks' ),
	description: __( 'Group of tabs.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	parent: ['cls-blocks/tabs'],
	attributes: {
		height : {
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
	category: 'layout',
	edit: edit,
	save: save,
} );