const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	[
		'cls-blocks/header-intro'
	],
	[
		'cls-blocks/table'
	],
	[
		'core/paragraph'
	]
];


const EditTableComparison = ( { attributes, setAttributes } ) => {

		const {
			withTableHead, width, border
		} = attributes;

		const blockProps = useBlockProps({
			className: 'comparison-table' + (withTableHead ? '' : ' no-head') + (width ? ' narrow-width' : '') + (border ? '' : ' no-border')
		});	
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'With Table Head' ) }
						initialOpen={ false }
					>
						<ToggleControl
        				    label="With Table Head"
        				    checked={ withTableHead }
        				    onChange={ (value) => {
        				       setAttributes({
        				       	withTableHead: !!value
        				       });
        				    } }
        				/>
					</PanelBody>
					<PanelBody
						title={ __( 'Narrow Width' ) }
						initialOpen={ false }
					>
						<ToggleControl
        				    label="Narrow Width"
        				    checked={ width }
        				    onChange={ (value) => {
        				       setAttributes({
        				       	width: !!value
        				       });
        				    } }
        				/>
					</PanelBody>
					<PanelBody
						title={ __( 'With Top Border' ) }
						initialOpen={ false }
					>
						<ToggleControl
        				    label="With Top Border"
        				    checked={ border }
        				    onChange={ (value) => {
        				       setAttributes({
        				       	border: !!value
        				       });
        				    } }
        				/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={['core/paragraph', 'cls-blocks/header-intro', 'cls-blocks/table', 'core/buttons']}
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTableComparison;