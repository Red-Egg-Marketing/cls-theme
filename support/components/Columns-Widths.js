import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;

const columnsArray = [
	{
		label: __('50% | 50%'),
		value: 'col-50'
	},
	{
		label: __('33.333% | 66.6666%'),
		value: 'col-66'
	}
];


const ColumnsWidth = (props) => {

	const { columnwidth } = props;
	
	return (
		<Fragment>
			<PanelBody
				title={__('Columns Width')}
				initialOpen={ true }
			>
				<SelectControl
					label={ __( 'Select Column Width' ) }
            		options={ columnsArray }
            		value={ columnwidth }
            		onChange={ ( selectColumn ) => {
            			props.setAttributes({
            				columnwidth: selectColumn
            			});
            		}}
        		/>
			</PanelBody>
		</Fragment>
	)
}

ColumnsWidth.View = (props) => {
	return null;
}

export default ColumnsWidth;