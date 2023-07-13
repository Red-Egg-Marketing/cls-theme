const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';

const template = [
	['core/paragraph', {'placeholder': 'Case Study Intro...'}]
];

const mainControl = {
	"padding-top" : "15px",
	"border-top"	: "1px solid grey",
	"width": "100%"
}

const style = {
	"position" : "relative",
	"z-index"	: "2"
}

const EditCaseStudy = ( { attributes, setAttributes } ) => {
		const {
			content, title, media, stats, quote, permalink
		} = attributes;

		const [rowNumber, setRownumber] = useState(null);

		const updateImageAttr = (media) => {
			let large   = media.url,
			    medium  = media.sizes['medium-landscape'] ? media.sizes['medium-landscape'].url : media.url;

            	setAttributes({
            	    media : {
						srcSet: {
							large : large,
							medium : medium
						},
						id: media.id,
						alt: media.alt
					}
            	});
            	
        }

        const updateQuoteAttr = (media) => {
			let curQuote = JSON.parse(JSON.stringify(quote));

			let update = {
				name : curQuote.name,
				snippet : curQuote.snippet,
				title: curQuote.title,
				image: media.sizes.thumbnail.url,
				id: media.id
			}

			setAttributes({
				quote: update
			});
        }

        const addStat = () => {
			let curItems = JSON.parse(JSON.stringify(stats));
			let index = stats.length;
			let len = index == 0 ? 1 : stats.length;

			let newItem = {};

			for (var x = 0; x < len; x++) {
				newItem = {
					'title' : {'placeholder' : 'Stat...'},
					'content': {'placeholder' : 'Stat content...'},
				}
			}

			curItems[index] = newItem;

			setAttributes({
				stats: curItems
			})

		}

		const removeStat = (index) => {
			let curItems = JSON.parse(JSON.stringify(stats));
			let total = curItems.length;

			curItems.splice(index, 1);

			setAttributes({
				stats: curItems
			})
		}

		const updateQuote = (value) => {
			let curQuote = JSON.parse(JSON.stringify(quote));

			let update = {
				name : curQuote.name,
				snippet : value,
				title: curQuote.title,
				image: curQuote.image,
				id: curQuote.id
			}

			setAttributes({
				quote: update
			});
		}

		const updateName = (value) => {
			let curQuote = JSON.parse(JSON.stringify(quote));

			let update = {
				name : value,
				snippet : curQuote.snippet,
				title: curQuote.title,
				image: curQuote.image,
				id: curQuote.id
			}

			setAttributes({
				quote: update
			});
		}


		const updateTitle = (value) => {
			let curQuote = JSON.parse(JSON.stringify(quote));

			let update = {
				name : curQuote.name,
				snippet : curQuote.snippet,
				title: value,
				image: curQuote.image,
				id: curQuote.id
			}

			setAttributes({
				quote: update
			});
		}

		const updateStatTitle = (value) => {
			let curItems = JSON.parse(JSON.stringify(stats));
			let updateRow = {
				title: value,
				content: curItems[rowNumber].content,
			};

			curItems[rowNumber] = updateRow;

			setAttributes({
				stats: curItems
			});
		}

		const updateStatContent = (value) => {
			let curItems = JSON.parse(JSON.stringify(stats));
			let updateRow = {
				title: curItems[rowNumber].title,
				content: value,
			};

			curItems[rowNumber] = updateRow;

			setAttributes({
				stats: curItems
			});
		}



		React.useEffect(() => {
			let link = wp.data.select('core/editor').getPermalink();

			return(
				setAttributes({
					permalink: link
				})
			);

		}, []);


		const blockProps = useBlockProps({
			className: 'case-study swiper-slide'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="stat-description col">
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['core/paragraph'] }
							/>
							<div className="media-controls" style={ style }>
								<MediaUpload
									onSelect={ updateImageAttr }
									allowedTypes="image"
									value={ media.id }
									render={ ( { open } ) => (
										<Button
											className="button"
											onClick={ open }
										>
											Upload/Change Image
										</Button>
									) }
								/>
							</div>
							<img
								id={ media.id }
								src={ media.srcSet.medium }
								alt={ __( media.alt ) }
							/>
							<div className="quote">
								<div className="image">
									<ImageComp
										id={ quote.id }
										source={ quote.image }
										updateImageAttr={ updateQuoteAttr }
										alt={ __( 'Quote from ' + quote.name) }
									/>
								</div>
								<div className="content">
									<RichText 
										tagName="p"
										value={ quote.snippet }
										className="quote-snippet"
										placeholder={ __('Quote...','cls-blocks')}
										onChange={ updateQuote }
									/>
									<RichText 
										tagName="p"
										value={ quote.name }
										className="quote-name"
										placeholder={ __('Name...','cls-blocks')}
										onChange={ updateName }
									/>
									<RichText 
										tagName="p"
										value={ quote.title }
										className="quote-title"
										placeholder={ __('Title...','cls-blocks')}
										onChange={ updateTitle }
									/>
								</div>
							</div>
						</div>

						<div className="stats">
			
							{ stats.length > 0 && stats.map((stat, index) => {
									let title = stat.title;
									let content = stat.content;
									return (
										<Fragment>
											<div className="stat col">
												<RichText 
													tagName="h3"
													value={ title }
													className="header-title"
													placeholder={ __('Stat...','cls-blocks')}
													onChange={ updateStatTitle }
													unstableOnFocus={ () => {
					 										setRownumber(index);
					 									}
													}
												/>
												<RichText 
													tagName="div"
													value={ content }
													multiline="p"
													className="description"
													placeholder={ __('Stat description...','cls-blocks')}
													onChange={ updateStatContent }
													unstableOnFocus={ () => {
					 										setRownumber(index);
					 									}
													}
												/>
												<Button
													className="button edit-button"
													isDestructive
													isSmall
													isLink
													onClick={ () => {
															removeStat(index);
														}
													}
												>
															Remove Stat
												</Button>
											</div>
										</Fragment>
									)
								})
							}
							<div className="primary-controls" style={ mainControl }>
									<Button
										isPrimary
										onClick={ addStat }
									>Add Stat</Button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCaseStudy;