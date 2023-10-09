const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
const apiUrl  = '/wp-json/cls/v2/reviews';

const ResourcesRoot = document.getElementById('BioReviews');

const SaveBioReviews = () => {
	  	const [resources, selectResources] = useState(false);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [loading, setLoading] = useState(false);
  		const [data, setData] = useState({});
  		const [payment, setPayment] = useState(false);
  		const [totalPrice, setPrice] = useState([]);
  		const [totalMonths, setMonths] = useState(false);
  		const [totalAPR, setAPR] = useState(false);
  		const [down, setDown] = useState(false);
  		const [shit, setShit] = useState({});

  		const sendAPIrequest = (data) => {

  			setLoading(true);
			wp.apiRequest({
        		url: apiUrl,
        		method: 'POST',
        		data: data
    		}).then(resourcelist => {
    			let empty = resourcelist.empty;
    			setEmpty(empty);
    			if (empty === false) {
    				selectResources(resourcelist[0].resources);
    			}
    			setLoading(false);
        
    		}).catch( error => {
    			console.log(error);
    		});

		}

		React.useEffect( () => {
			
			if (resources === false) {
				data['post_id'] = postData.id;
				setData(data);

    			wp.apiRequest({
        			url: apiUrl,
    			    method: 'POST',
    			    data: data
    			}).then(resourcelist => {
    			    let posts = resourcelist;
    			    let empty = resourcelist.length > 0 ? true : false;
    				setEmpty(empty);
    				if (empty === true) {
    			    	selectResources(posts);
    			    }
    			 	setLoading(true);

    			});
  			}
  		}, []);
		
		return (
			<Fragment>
				<div className="resources-grid">
					{loading == false && resources == false && resourcesEmpty == false && (
						<Fragment>
								<div className="loading">
									<h2>...Loading</h2>
								</div>
						</Fragment>
					)}
		
					{ (resourcesEmpty == true && resources.length > 0 && loading == true) && resources.map((resource, resourceIndex) => {
							let rating = parseInt(resource.rating);
							let text = resource.review_text;
							text = text.split(" ");
							let intro = text.slice(0, 25);
							intro = intro.join(" ") + '...';
							let more = text.slice(25);
							more = more.join(" ");
							let name = resource.reviewer_name;
							let image = resource.userpic;
							let ratingArray = Array.from({ length: rating }, (value, index) => index);
							let style = {
								"display" : "none"
							}
							if (rating >= 4) {
							return (
								<Fragment>
									<div className="wprevpro_t1_DIV_1 w3_wprs-col outerrevdiv">
										<div className="indrevdiv wprevpro_t1_DIV_2 wprev_preview_bg1_T1 wprev_preview_bradius_T1">
											<div className="wprevpro_t1_P_3 wprev_preview_tcolor1_T1">
												<span className="wprevpro_star_imgs_T1">
													<span className="starloc1 wprevpro_star_imgs wprevpro_star_imgsloc1">
													{ ratingArray.map((item, index) => {
														return(
															<span
																className="svgicons svg-wprsp-star"
															>
															</span>
														);
													})}
													</span>
												</span>
												<span className="wprs_rd_more_1">{intro}</span>
												<span className="wprs_rd_more"> read more</span>
												<span className="wprs_rd_more_text" style={ style }>{intro}{ more }</span>
												<span className="wprs_rd_less" style={ style }> read less</span>
											</div>
										</div>
										{ image && (
											<span className="wprevpro_t1_A_8">
												<img loading="lazy" src={ image } alt={`${ name } Avatar`} className="wprevpro_t1_IMG_4 wprevpro_avatarimg" />
											</span>
										)}
										<div className="wprevpro_t1_SPAN_5 wprev_preview_tcolor2_T1">
											<div class="wprevpro_t1_rname wprevname">{ name }</div>
										</div>
									</div>
								</Fragment>
							)
							}
						})
					}
				
					{ (resourcesEmpty == false && loading == true) && (
						<Fragment>
							<div className="error">
								<p>No current reviews</p>
							</div>
						</Fragment>
					)}
				</div>
			</Fragment>
		);
}


if (ResourcesRoot) {
	render(
		<SaveBioReviews />,
		ResourcesRoot
	);
}
