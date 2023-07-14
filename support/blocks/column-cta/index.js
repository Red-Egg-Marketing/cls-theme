const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/column-cta', {
	title: __( 'Column with Call to Action', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'button',
	parent: ['cls-blocks/columns-cta'],
	category: 'columns',
	edit: edit,
	save: save,
} );