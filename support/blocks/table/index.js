const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/table', {
	title: __( 'Table', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	category: 'layout',
	parent: ['cls-blocks/table-compare'],
	edit: edit,
	save: save,
} );