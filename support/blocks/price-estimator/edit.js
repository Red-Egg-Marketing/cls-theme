const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;

const template = [
	['cls-blocks/price-header', {}],
	['cls-blocks/price-form', {}],
];

const EditEstimator = ( { attributes, setAttributes } ) => {

		const blockProps = useBlockProps({
			className: 'filter-resources price-estimator'
		});
	
		return (
			<Fragment>
				<div { ...blockProps }>
					<div className="resources-block">
						<div className="block-wrapper">
							<InnerBlocks
								template={ template }
								allowedBlocks={['cls-blocks/price-header', 'cls-blocks/price-form']}
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditEstimator;