const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/icon-rows', {
	title: __( 'Icon Row', 'cls-blocks' ),
	description: __( 'Row of Icons.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	supports: {
		anchor: true
	},
	category: 'layout',
	edit: edit,
	save: save,
} );