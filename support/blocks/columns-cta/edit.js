const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';

const template = [
	['cls-blocks/column-cta', {}],
	['cls-blocks/column-cta', {}],
];

const EditColumnsCTA = ( { attributes, setAttributes, clientId } ) => {

		const {
			padding, blockId
		} = attributes;

		const blockProps = useBlockProps({
			className: 'columns-cta',
		});

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'columns-cta-' + clientId } );
        	}
    	}, [] );
		
		return (
			<Fragment>
				<PaddingSelector
					setAttributes={ setAttributes }
					padding={ padding }
					id={ 'block-' + clientId }
				/>
				<div {...blockProps}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={ ['cls-blocks/column-cta'] }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditColumnsCTA;