const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/table-compare', {
	title: __( 'Comparison Table', 'cls-blocks' ),
	description: __( 'Two column table for comparisons.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	category: 'layout',
	edit: edit,
	save: save,
} );