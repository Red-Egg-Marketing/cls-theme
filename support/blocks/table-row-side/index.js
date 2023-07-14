const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/table-row-side', {
	title: __( 'Table Row Side', 'cls-blocks' ),
	parent: ['cls-blocks/table-side'],
	apiVersion: 2,
	icon: 'grid-view',
	category: 'layout',
	edit: edit,
	save: save,
} );