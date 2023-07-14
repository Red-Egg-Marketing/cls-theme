const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/section-list', {
	title: __( 'Section with header and numbered list.', 'cls-blocks' ),
	description: __( 'Section with header and numbered list of items. With optional buttons and description text.', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
	edit: edit,
	save: save,
} );