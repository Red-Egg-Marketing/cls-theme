const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/table-row-head', {
	title: __( 'Table Row Head', 'cls-blocks' ),
	parent: ['cls-blocks/table-side'],
	apiVersion: 2,
	icon: 'align-center',
	category: 'layout',
	edit: edit,
	save: save,
} );