const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;

const template = [
	['core/heading', {}],
	['core/paragraph', {}],
];

const EditHeader = ( { attributes, setAttributes } ) => {
	  	
		const blockProps = useBlockProps({
			className: 'header triangles-grey'
		});
		
		return (
			<Fragment>
				<header { ...blockProps }>
					<div className="header-wrap">
						<InnerBlocks
							template={ template }
							allowedBlocks={['core/heading', 'core/paragraph']}
						/>
					</div>
				</header>
			</Fragment>
		);
}

export default EditHeader;