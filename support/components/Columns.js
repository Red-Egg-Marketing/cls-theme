import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;

const columnsArray = [
	{
		label: __('Two Columns'),
		value: '2'
	},
	{
		label: __('Three Columns'),
		value: '3'
	}
];


const Columns = (props) => {

	const { columns } = props;
	
	return (
		<Fragment>
			<PanelBody
				title={__('Columns')}
				initialOpen={ true }
			>
				<SelectControl
					label={ __( 'Select Column Width' ) }
            		options={ columnsArray }
            		value={ columns }
            		onChange={ ( selectColumn ) => {
            			props.setAttributes({
            				columns: selectColumn
            			});
            		}}
        		/>
			</PanelBody>
		</Fragment>
	)
}

Columns.View = (props) => {
	return null;
}

export default Columns;