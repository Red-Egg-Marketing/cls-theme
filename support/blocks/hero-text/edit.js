const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, RangeControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['core/heading', {'level': 1}],
	['core/heading', {'level': 3}]
];

const EditHeroText = ( { attributes, setAttributes } ) => {

	const {
		bgColor, bgSlug
	} = attributes;

        const blockProps = useBlockProps({
        	className: 'hero-text' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
        });

	return (
		<Fragment>
			<InspectorControls>
				<BackgroundColor
					setAttributes={ setAttributes }
					bgColor={ bgColor }
					bgSlug={ bgSlug }
				/>					
			</InspectorControls>
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="hero__inner">
						<div className="content-wrap">
							<div className="hero-block-content">
								<div className="hero-block-wrap">
									<InnerBlocks
										allowedBlocks={ ['core/heading', 'core/paragraph'] }
										template={ template }
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default EditHeroText;