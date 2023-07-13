const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import Columns from '../../components/Columns.js';
import PaddingSelector from '../../components/Padding.js';

const template = [
	['cls-blocks/section-header', {}],
	['cls-blocks/text-card', {}],
	['cls-blocks/text-card', {}],
	['cls-blocks/text-card', {}],
];


const EditCTAGrid = ( { attributes, setAttributes, clientId } ) => {

		const {
			columns, bgColor, bgSlug, color, padding, blockId
		} = attributes;

		const onChangeContent = (value) => {
			setAttributes({
				content: value
			});
		}

		const blockProps = useBlockProps({
			className: 'text-cards-grid' + ' columns-' + columns + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
		});	

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'grid-' + clientId } );
        	}
    	}, [] );
		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
					<Columns
						setAttributes={ setAttributes }
						columns={ columns }
					/>
				</InspectorControls>
				<PaddingSelector
					setAttributes={ setAttributes }
					padding={ padding }
					id={ 'block-' + clientId }
				/>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">							
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['cls-blocks/text-card', 'cls-blocks/section-header'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTAGrid;