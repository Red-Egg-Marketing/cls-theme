const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';


const EditFAQ = ( { attributes, setAttributes } ) => {
		const {
			title, content, open
		} = attributes;

		const [openQuestion, activateQuestion] = useState(false);


        const toggleQuestion = () => {
        	activateQuestion( !openQuestion );
        }

		const blockProps = useBlockProps({
			className: 'faq'
		});	
		
		let visClass = openQuestion == false ? 'hide-this' : '';

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<ToggleControl 
							label={__('Open Answer?')}
							checked={ !!open }
							onChange={ () => {
									setAttributes({
										open: !open
									});
								}
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">
							<div 
								className={`content-column ${ visClass }`}
								data-toggled={ open }
							>
								<div
									className="question-row"
								>
									<Header
										tag="h4"
										title={ title }
										placeholder={__('Question...')}
										setAttributes={ setAttributes }
									/>
									<Button
										isLink
										onClick={ toggleQuestion }
										className="toggle-button"
									>
										Open
									</Button>
								</div>
								<div className="answer">
									<div 
										className="content-col"
									>
										<Content 
											tag="div"
											content={ content }
											placeholder={__('Answer...')}
											setAttributes={ setAttributes }
											multiline="p"
											classProp="content"
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

export default EditFAQ;