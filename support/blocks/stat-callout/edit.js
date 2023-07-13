const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Header from '../../components/Header.js';

const template = [
	['core/paragraph', {'placeholder': 'Stat description...'}]
];

const EditCTA = ( { attributes, setAttributes } ) => {
		const {
			content, title
		} = attributes;


		const blockProps = useBlockProps({
			className: 'stat-callout'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="stat col">
							<Header 
								tag="h3"
								title={ title }
								setAttributes={ setAttributes }
								placeholder={ __('Stat...','cls-blocks/stat-')}
								updateProp="title"
							/>
							<Content 
								tag="div"
								content={ content }
								setAttributes={ setAttributes }
								multiline="p"
								placeholder={ __('Stat description...','cls-blocks/cta')}
								classProp="content"
								updateProp="content"
							/>
						</div>
						<div className="stat-description col">
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['core/paragraph'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTA;