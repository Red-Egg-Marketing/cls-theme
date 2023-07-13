const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { useSelect } = wp.data;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Anchor from '../../components/Anchor.js';
import PaddingSelector from '../../components/Padding.js';

const template = [
	['cls-blocks/section-header', {}],
	['cls-blocks/tab-group', {}]
];

const EditTabs = ( { attributes, setAttributes, clientId } ) => {

		const { anchor, padding, blockId } = attributes;

		const blockProps = useBlockProps({
			className: 'tabs'
		});

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'tabs-' + clientId } );
        	}
    	}, [] );
		
		return (


			<Fragment>
				<InspectorControls>
					<Anchor
						setAttributes={ setAttributes }
						anchor={ anchor }
					/>
				</InspectorControls>
				<PaddingSelector
					setAttributes={ setAttributes }
					padding={ padding }
					id={ 'block-' + clientId }
				/>
				<div {...blockProps} id={anchor}>
					<div className="block-wrapper">
						<InnerBlocks
							template={ template }
							allowedBlocks={ ['cls-blocks/tab-group', 'cls-blocks/section-header'] }
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTabs;