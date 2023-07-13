const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Header from '../../components/Header.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['cls-blocks/header-intro-column', {}]
];

const mainControl = {
	"padding-top" : "15px",
	"border-top"	: "1px solid grey",
	"width": "100%"
}

const EditProgress = ( { attributes, setAttributes, clientId } ) => {
		const {
			anchor, items, media, bgSlug, bgColor, id
		} = attributes;

		const [rowNumber, setRownumber] = useState(null);

		const addStep = () => {
			let curItems = JSON.parse(JSON.stringify(items));
			let index = items.length;
			let len = index == 0 ? 1 : items.length;

			let newItem = {};

			for (var x = 0; x < len; x++) {
				newItem = {
					'title' : {'placeholder' : 'Step...'},
					'content': {'placeholder' : 'Step content...'},
					'media'  : ''
				}
			}

			curItems[index] = newItem;

			setAttributes({
				items: curItems
			})

		}

		const removeStep = (index) => {
			let curItems = JSON.parse(JSON.stringify(items));
			let total = curItems.length;

			curItems.splice(index, 1);

			setAttributes({
				items: curItems
			})
		}


		const updateImageAttr = (media, index) => {

			let curItems = JSON.parse(JSON.stringify(items));
			let medium   = media.sizes['medium'] ? media.sizes['medium'].url : media.url,
			    large  = media.sizes['large'] ? media.sizes['large'].url : media.url;

			let updateMedia = [
				{
					srcSet: {
						large : large,
						medium : medium
					},
					id: media.id,
					alt: media.alt
				}
			]

			let updateRow = {
				title : curItems[index].title,
				content : curItems[index].content,
				media: JSON.stringify(updateMedia)
			}

			curItems[index] = updateRow;
            
			setAttributes({
				items: curItems
			})
        }

		const updateStepTitle = (value) => {
			let curItems = JSON.parse(JSON.stringify(items));
			let updateRow = {
				title: value,
				content: curItems[rowNumber].content,
				media: curItems[rowNumber].media
			};

			curItems[rowNumber] = updateRow;

			setAttributes({
				items: curItems
			});
		}

		const updateStepContent = (value) => {
			let curItems = JSON.parse(JSON.stringify(items));
			let updateRow = {
				title: curItems[rowNumber].title,
				content: value,
				media: curItems[rowNumber].media
			};

			curItems[rowNumber] = updateRow;

			setAttributes({
				items: curItems
			});
		}


		let setImg = '';

		React.useEffect(() => {

			return(
				setAttributes({
					id: clientId
				})
			);

		}, []);

		const blockProps = useBlockProps({
			className: 'progress-block' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : ''),
			id: 'progress-' + id
		});

		if (rowNumber != null) {
			if (typeof items[rowNumber] != 'undefined' && typeof items[rowNumber].media != 'undefined' && items[rowNumber].media != '') {
				let tempObj = items[rowNumber].media;
				let tempImg = JSON.parse(tempObj);
				setImg = tempImg[0].srcSet.large;
			}
		}
		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['core/buttons'] }
							/>
						</div>
						<div className="steps-wrapper">
						<div className="steps-container">
						<div className="steps">
							<div className="steps-img">
								{ setImg != '' &&
									<img src={ setImg } />
								}
							</div>
							<div className="steps-col">
								{ items.map((item, index) => {

										let stepTitle = item.title;
										let stepContent = item.content;
										let id = item.media ? item.media.id : 0;
										let image = item.media ? item.media : '';
										let curImg = image != '' ? JSON.parse(image) : '';
										curImg = curImg != '' ? curImg[0].srcSet.large : '';
										let activeClass = index == rowNumber ? 'active' : '';
										return(
											<Fragment>
												<div className={`step ${ activeClass }`}>
													<div className="step-container" data-image={ image }>
														{ curImg != '' &&
															<img className="mobile-image" src={ curImg } />
														}
														<RichText
															tagName="h4"
															value={ stepTitle }
															className="step-title"
															placeholder={__('Step Title...', 'cls')}
															onChange={ updateStepTitle }
															unstableOnFocus={ () => {
					 												setRownumber(index);
					 											}
															}
														/>
														<RichText
															tagName="div"
															value={ stepContent }
															multiline="p"
															className="step-content"
															placeholder={__('Step Content...', 'cls')}
															onChange={ updateStepContent }
															unstableOnFocus={ () => {
					 												setRownumber(index);
					 											}
															}
														/>
														<MediaUpload
															onSelect={ (media) => {
																updateImageAttr(media, index);
															}}
															allowedTypes="image"
															value={ id }
															render={ ( { open } ) => (
																<Button
																	className="button edit-button"
																	onClick={ open }
																>
																	Upload/Change Image
																</Button>
															) }
														/>
														<Button
															className="button edit-button"
															isDestructive
															isSmall
															isLink
															onClick={ () => {
																	removeStep(index);
																}
															}
														>
															Remove Step
														</Button>
													</div>
												</div>
											</Fragment>
										)
									})
								}
								<div className="primary-controls" style={ mainControl }>
									<Button
										isPrimary
										onClick={ addStep }
									>Add Step</Button>
								
								</div>
							</div>
						</div>
						</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditProgress;