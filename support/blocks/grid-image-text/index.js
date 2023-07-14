const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/grid-image', {
	title: __( 'Grid of Image and Text Cards', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	edit: edit,
	save: save,
} );