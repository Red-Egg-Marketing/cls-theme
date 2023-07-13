const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Modal, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import SearchResources from '../../components/SearchResources.js';
import Header from '../../components/Header.js';
import ResourceCard from '../../components/ResourceCard.js';
import Swiper from 'swiper/bundle';
// import a component

const buttonStyle = {
	"margin-left" : "15px"
}

const styleControls = {
	"margin-bottom" : "15px",
	"padding-top"		: "10px",
	"padding-bottom"		: "10px",
	"text-align"		: "center"
}


const mainControl = {
	"padding-top" : "15px",
	"border-top"	: "1px solid grey",
	"width": "100%"
}

const EditTestimonials = ( { setAttributes, attributes, isSelected } ) => {

		const { testimonials, anchor, totalNotes} = attributes;

		const blockProps = useBlockProps({
			className: 'testimonials'
		});

		const [searchActive, activateSearch] = useState({index: false, active: false});
		const [searchList, activateList] = useState(false);
		const [editCurrent, activateCurrent] = useState({index: false, active: false});
		const [currentSelect, activateSelect] = useState(false);


		let slideShow = false;

		const updateAnchor = (value) => {
			let removeSpace = value.replace(/\s+/g, '-');
			setAttributes({ anchor: removeSpace });
		}

		const addTestimonial = () => {
			let curResources = JSON.parse(JSON.stringify(testimonials));
			let index = testimonials.length;
			let len = testimonials.length == 0 ? 1 : testimonials.length;

			let newResource = {
				resource : []
			};
			let newTotal = parseInt(totalNotes) + 1;
			
			for (var x = 0; x < len; x++) {
				newResource = 0;
				newResource = {
					'testimonial' : 'Testimonial...',
					'person' : 'Test Person...',
				}
			}

			curResources[index] = newResource;

			setAttributes({
				testimonials: curResources,
				totalNotes: newTotal
			});


		}
	
		const deleteTestimonial = (index) => {

			let curNotes = JSON.parse(JSON.stringify(testimonials));
			let newTotal = parseInt(totalNotes) > 0 ? parseInt(totalNotes) - 1 : 0;

			curNotes.splice(index, 1);

			setAttributes({
				testimonials: curNotes,
				totalNotes: newTotal
			});
		}


		const editCurrentResource = (index) => {
			activateCurrent({ index: index, active: !editCurrent.active });
		}

		const updateTestimonial = (value, index) => {
			let curNotes = JSON.parse(JSON.stringify(testimonials));

			curNotes[index].testimonial = value;

			setAttributes({
				testimonials: curNotes
			});
		}

		const updatePerson = (value, index) => {
			let curNotes = JSON.parse(JSON.stringify(testimonials));

			curNotes[index].person = value;

			setAttributes({
				testimonials: curNotes
			});
		}

		const initiateSlider = () => {

			let index = testimonials.length;
			
			slideShow = new Swiper('.swiper', 
				{
					loop: false,
					slidesPerView: 1,
					autoplay: false,
					effect: 'slide',
					spaceBetween: 40,
					speed: 800,
					noSwiping: true,
					simulateTouch: false,
					initialSlide: (index - 1),
					init: true,
					navigation: {
    					nextEl: '.swiper-button-next',
    					prevEl: '.swiper-button-prev',
  					},
  					breakpoints: {
  						768 : {
  							slidesPerView: 2
  						},
  						1400 : {
  							slidesPerView: 3
  						}
  					}
				}
			);

		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
							title={ __( 'HTML Anchor' ) }
							initialOpen={ false }
						>
							<TextControl
								label={ __( 'HTML Anchor' ) }
								value={ anchor }
								onChange={ ( anchor ) => updateAnchor( anchor ) }
								help={__('Enter a word or two — without spaces — to make a unique web address just for this heading, called an “anchor.”')}
							/>
						
					</PanelBody>
				</InspectorControls>
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
														<RichText
															tagName="p"
															value={resourceItem.testimonial}
															className="testimonial"
															onChange={ (value) =>{
																updateTestimonial(value, resourceIndex )
															}}
														/>
														<RichText
															tagName="cite"
															value={resourceItem.person}
															className="citation"
															onChange={ (value) =>{
																updatePerson(value, resourceIndex )
															}}
														/>
													</blockquote>
													<div className="controls">
														<div className="control-row" style={ styleControls }>
															<Button
																isLink
																isDestructive
																isSmall
																onClick={ () => { 
																	deleteTestimonial( resourceIndex );
																}}
															>
																Delete Testimonial
															</Button>
														</div>
													</div>
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
						
							<div className="primary-controls" style={ mainControl }>
								<Button
									isPrimary
									onClick={ addTestimonial }
								>Add Testimonial</Button>
							</div>
						</div>
					</div>
					</div>
				</section>
			</Fragment>
		);
}

export default EditTestimonials;