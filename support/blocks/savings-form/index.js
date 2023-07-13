const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/savings-form', {
	title: __( 'Savings Form', 'cls-blocks' ),
	description: __( 'Savings Form block.', 'cls-blocks' ),
	apiVersion: 2,
	parent: ['cls-blocks/savings-calculator'],
	icon: 'button',
	category: 'layout',
	edit: edit,
	save: save,
} );