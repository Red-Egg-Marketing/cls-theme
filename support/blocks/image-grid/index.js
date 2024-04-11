const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/image-grid', {
	apiVersion: 2,
	title: __( 'Image Grid', 'cls-blocks' ),
	icon: 'id',
	category: 'layout',
	edit: edit,
	save: save,
} );