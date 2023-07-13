const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Header from '../../components/Header.js';
import PaddingSelector from '../../components/Padding.js';

const template = [
	['core/heading', {'level' : 2}],
	['core/paragraph', {'placeholder': 'CTA text...'}],
	['core/buttons', {},
		[
			['core/button', { 'placeholder' : 'CTA text...', 'className' : 'is-style-outline-green' }]
		]
	]
];

const EditCTA = ( { attributes, setAttributes, clientId } ) => {

		const {
			padding, blockId
		} = attributes;

		const blockProps = useBlockProps({
			className: 'cta',
		});

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'cta-' + clientId } );
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
						<div className="block-content">
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['core/heading', 'core/paragraph', 'core/buttons'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTA;