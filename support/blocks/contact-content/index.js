const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/contact-content', {
	title: __( 'Header Intro in Columns', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	parent: ['cls-blocks/contact'],
	category: 'layout',
	edit: edit,
	save: save,
} );