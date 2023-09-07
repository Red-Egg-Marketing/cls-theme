const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'cls-blocks/price-estimator', {
	apiVersion: 2,
	title: __( 'Price Estimator', 'cls-blocks' ),
	description: __( 'Block with filterable list of vehicles', 'cls-blocks' ),
	icon: 'megaphone',
	category: 'layout',
	supports: {
		anchor: true
	},
	edit: edit,
	save: save
} );