const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';

const template = [
	['core/heading', {'level' : 2, 'placeholder' : 'Section header...'}],
];

const EditSectionHeader = ( { attributes, setAttributes, clientId } ) => {


		const {
			padding, blockId
		} = attributes;

		const blockProps = useBlockProps({
			className: 'section-header'
		});

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'header-' + clientId } );
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
					<InnerBlocks
						template={ template }
						allowedBlocks={ ['core/heading', 'core/paragraph'] }
					/>
				</div>
			</Fragment>
		);
}

export default EditSectionHeader;