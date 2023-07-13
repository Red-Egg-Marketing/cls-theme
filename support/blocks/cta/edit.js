const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Header from '../../components/Header.js';
import PaddingSelector from '../../components/Padding.js';

const template = [
	['core/buttons', {},
		[
			['core/button', { 'placeholder' : 'CTA text...', 'className' : 'is-style-outline-green' }]
		]
	]
];

const EditCTA = ( { attributes, setAttributes, clientId } ) => {

		const {
			content, footer, padding, blockId
		} = attributes;

		const onChangeFooter = (value) => {

			setAttributes({
				footer: value
			});
		}

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
							<div className="content">
								<Header 
									tag="h3"
									title={ content }
									setAttributes={ setAttributes }
									placeholder={ __('CTA header...','cls-blocks/cta')}
									updateProp="content"
								/>
								<Content 
									tag="div"
									content={ footer }
									setAttributes={ setAttributes }
									multiline="p"
									placeholder={ __('CTA description...','cls-blocks/cta')}
									classProp="content-footer"
									updateProp="footer"
								/>
							</div>
							<div className="links">
								<InnerBlocks
									template={ template }
									allowedBlocks={ ['core/buttons'] }
								/>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTA;