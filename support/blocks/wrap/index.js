const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/wrap', {
	apiVersion: 2,
	title: __( 'Wrap', 'cls-blocks' ),
	description: __('Generic Wrap, has no utility/function'),
	attributes: {
		allowBlocks : {
			type: 'array',
			default: []
		}
	},
	icon: 'shortcode',
	category: 'layout',
	edit: edit,
	save: save,
} );