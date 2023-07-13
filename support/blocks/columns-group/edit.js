const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Columns from '../../components/Columns.js';

const template = [
	['cls-blocks/header-intro', {}],
	['cls-blocks/image-text', {}],
];

const EditColumnsGroup = ( { attributes, setAttributes } ) => {

		const onChangeContent = (value) => {
			setAttributes({
				content: value
			});
		}

		const blockProps = useBlockProps({
			className: 'columns-group'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">							
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['cls-blocks/image-text', 'cls-blocks/header-intro'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditColumnsGroup;