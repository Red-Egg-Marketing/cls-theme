const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/table-cell', {
	title: __( 'Table Cell', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	category: 'layout',
	attributes: {
		template: {
			type: 'array',
			default: [['core/list']]
		},
	},
	parent: ['cls-blocks/table-row'],
	edit: edit,
	save: save,
} );