const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/content', {
	title: __( 'Content Column', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	parent: ['cls-blocks/image-text'],
	category: 'layout',
	edit: edit,
	save: save,
} );