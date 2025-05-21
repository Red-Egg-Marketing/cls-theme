const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/contact-content', {
	title: __( 'Contact Column', 'cls-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	parent: ['cls-blocks/contact', 'cls-blocks/contact-alt'],
	attributes: {
		template: {
			type: 'array',
			default: [['core/html']]
		},
		allowBlocks : {
			type: 'array',
			default: [['core/html', 'core/buttons']]
		}
	},
	category: 'layout',
	edit: edit,
	save: save,
} );