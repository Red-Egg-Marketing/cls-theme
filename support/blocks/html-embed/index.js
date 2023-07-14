const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/html-embed', {
	title: __( 'Full Width HTML Embed', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'admin-site',
	category: 'layout',
	edit: edit,
	save: save,
} );