const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/tab-content', {
	title: __( 'Tab', 'cls-blocks' ),
	description: __( 'Tab', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['cls-blocks/tab'],
	edit: edit,
	save: save,
} );