const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/columns-cta', {
	title: __( 'Columns of Calls to Action', 'cls-blocks' ),
	description: __( 'Columns of calls to action with background image.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'columns',
	category: 'columns',
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