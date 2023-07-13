const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/bios', {
	title: __( 'Group of Bios', 'cls-blocks' ),
	description: __( 'Group of Bios.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'groups',
	category: 'layout',
	edit: edit,
	save: save,
} );