const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/price-form', {
	apiVersion: 2,
	title: __( 'Price Form', 'cls-blocks' ),
	description: __( 'Price Form', 'cls-blocks' ),
	icon: 'megaphone',
	category: 'layout',
	parent: ['cls-blocks/price-estimator'],
	supports: {
		anchor: true
	},
	edit: edit,
	save: save
} );