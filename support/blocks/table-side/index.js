const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/table-side', {
	title: __( 'Table side-by-side compare with icon.', 'cls-blocks' ),
	description: __( 'Three column table for comparisons.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'grid-view',
	category: 'layout',
	edit: edit,
	save: save,
} );