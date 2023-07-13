const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';

const SaveProgress = ( { attributes } ) => {
		const {
			anchor, items, bgColor, bgSlug, id
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'progress-block' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : ''),
			id: 'progress-' + id
		});

		let setImg = '';
		if (items.length > 0) {
			let tempObj = items[0].media;
			if (typeof items[0].media != 'undefined') {
				let tempImg = JSON.parse(tempObj);
				setImg = tempImg[0].srcSet.large;
			}
		}
	
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">
							<InnerBlocks.Content />
						</div>
						<div className="steps-wrapper">
						<div className="steps-container">
						<div className="steps">
							<div className="steps-img">
								{ setImg != '' &&
									<img src={ setImg } />
								}
							</div>
							<div className="step-progress">
								<span></span>
							</div>
							<div className="steps-col">
								{items.map((item, index) => {
										let stepTitle = item.title;
										let stepContent = item.content;
										let image = item.media ? item.media : '';
										let curImg = image != '' ? JSON.parse(image) : '';
										curImg = curImg != '' ? curImg[0].srcSet.large : '';
										let activeClass = index == 0 ? 'active' : '';
										return (
											<Fragment>
												<div className={`step ${ activeClass }`}>
													<div className="step-container" data-image={ image }>
														{ curImg != '' &&
															<img className="mobile-image" src={ curImg } />
														}
														<RichText.Content
															tagName="h4"
															className="step-title"
															value={ stepTitle }
														/>
														<RichText.Content
															tagName="div"
															className="step-content"
															multiline="p"
															value={ stepContent }
														/>
													</div>
												</div>
											</Fragment>
										)
									})
								}
							</div>
						</div>
						</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveProgress;