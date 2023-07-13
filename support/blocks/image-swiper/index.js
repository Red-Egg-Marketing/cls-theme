const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/image-swiper', {
	title: __( 'Image Swiper', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
	parent: ['cls-blocks/image-links'],
	edit: edit,
	save: save,
} );