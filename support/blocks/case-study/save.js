const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';

const SaveCaseStudy = ( { attributes } ) => {
		const {
			content, title, media, stats, quote, permalink
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'case-study swiper-slide'
		});

		let srcObj = media.srcSet;

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = `
			${srcObj.large} 960w, 
			${srcObj.medium} 480w`;
	
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="stat-description col">
						<InnerBlocks.Content />
						<picture>
							<source type="image/webp" srcSet={ `${ media.srcSet.medium }.webp`} />
							<img
								src={ media.srcSet.medium }
								alt={ __( media.alt ) }
							/>
						</picture>
						<div className="quote">
							<div className="image">
								<ImageComp.View
									source={ quote.image }
									alt={ __( 'Quote from ' + quote.name) }
								/>
							</div>
							<div className="content">
								<RichText.Content
									tagName="p"
									value={ quote.snippet }
									className="quote-snippet"
								/>
								<RichText.Content
									tagName="p"
									value={ quote.name }
									className="quote-name"
								/>
								<RichText.Content
									tagName="p"
									value={ quote.title }
									className="quote-title"
								/>
							</div>
						</div>
					</div>
					<div className="stats">
						{stats.map((stat, index) => {
								let title = stat.title;
								let content = stat.content;
								return (
									<Fragment>
										<div className="stat col">
											<RichText.Content
												tagName="h3"
												value={ title }
												className="header-title"
												origValue={ title }
											/>
											<RichText.Content
												tagName="div"
												value={ content }
												multiline="p"
												className="description"
											/>
										</div>
									</Fragment>
								)
							})
						}
						{permalink != '' && (
							<div className="wp-block-button">
								<a href={permalink} className="wp-block-button__link">Read More</a>
							</div>
						)}
					</div>
				</div>
			</div>
		);
}

export default SaveCaseStudy;