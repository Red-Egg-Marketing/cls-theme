const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/savings-calculator', {
	title: __( 'Savings Calculator', 'cls-blocks' ),
	description: __( 'Block for displaying Savings Calculator.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'calculator',
	category: 'layout',
	edit: edit,
	save: save,
} );