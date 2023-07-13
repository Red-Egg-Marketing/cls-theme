const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const SaveTestimonials = ( { attributes } ) => {

	const { testimonials, anchor, totalNotes} = attributes;

	const blockProps = useBlockProps.save({
		className: 'testimonials'
	});

	return (
		<section {...blockProps}>
			<div className="testimonials-block">
				<div className="block-wrapper" id={anchor}>
					<div className="testimonials-wrap">
						<div className="testimonials-slides" data-total={ totalNotes }>
							<div className="swiper">
								<div className="swiper-wrapper">
									{ testimonials.map( (resourceItem, resourceIndex) => {
										return(
											<Fragment>
												<div className="testimonial-wrap swiper-slide">
													<blockquote>
														<RichText.Content
															tagName="p"
															value={resourceItem.testimonial}
															className="testimonial"
														/>
														<RichText.Content
															tagName="cite"
															value={resourceItem.person}
															className="citation"
														/>
													</blockquote>
												</div>
											</Fragment>
										);
									 })
									}
								</div>
								<div class="swiper-button-prev"></div>
  								<div class="swiper-button-next"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default SaveTestimonials;