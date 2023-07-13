const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { useSelect } = wp.data;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Columns from '../../components/Columns.js';
import PaddingSelector from '../../components/Padding.js';

const template = [
	['cls-blocks/tab', {}],
	['cls-blocks/tab', {}],
];

const EditTabGroup = ( { attributes, setAttributes, clientId } ) => {

		const { height, padding, blockId } = attributes;

		let style = {
			'height' : height + 'px'
		}

		const blockProps = useBlockProps({
			className: 'tab-group'
		});

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'list-' + clientId } );
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
						<div className="tabs-wrap"
							style={ style }
						>
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['cls-blocks/tab'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTabGroup;