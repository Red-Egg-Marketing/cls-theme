const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload } = wp.blockEditor;
const { render, Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import Swiper from 'swiper/bundle';
import ResourceCard from '../../components/ResourceCard.js';
const apiUrl  = '/wp-json/cls/v2/recent_vehicles';

const ResourcesRoot = document.getElementById('VehiclesWrap');

const SaveSelectedProjects = () => {
	  	
	  	const [resources, selectResources] = useState(false);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [data, setData] = useState({});

		React.useEffect( () => {
			if (resources === false) {
				data['ppp'] = 15;
				setData(data);
    			wp.apiRequest({
        			url: apiUrl,
    			    method: 'POST',
    			    data: data
    			}).then(resourcelist => {
    				// let empty = resourcelist.empty;
    			    let posts = resourcelist[0].resources;
    			    selectResources(posts);
    			    new Swiper('.resources.swiper', 
						{
							loop: false,
							slidesPerView: 1,
							autoplay: false,
							effect: 'slide',
							spaceBetween: 30,
							speed: 800,
							navigation: {
    							nextEl: '.swiper-button-next',
    							prevEl: '.swiper-button-prev',
  							},
  							breakpoints: {
  								768: {
  									slidesPerView: 2,
  									spaceBetween: 45
  								},
  								1100: {
  									slidesPerView: 3,
  									spaceBetween: 60
  								}
  							}
						}
					);
    			});
  			}
  		}, [] );
		
		return (
			<Fragment>
				<div className="swiper-wrapper">
					{ (resourcesEmpty == false && resources.length > 0) && resources.map((resource, resourceIndex) => {
							return (
								<Fragment>
									<ResourceCard.View
										resourceIndex={ resourceIndex }
										resourceURL={ resource.link }
										resourceID={ resource.ID }
										resourceImg={ resource.media_url }
										resourceTitle={ resource.post_title  }
										resourceType={ resource.label  }
										resourcePrice={ resource.price }
										resourceMiles={ resource.miles }
										resourceClass="swiper-slide"
										resourceYear={ resource.year }
									/>
								</Fragment>
							)
						})
					}
					{ resourcesEmpty && (
						<Fragment>
							<div className="error">
								<h3>There are no available vehicles matching your filters. Please try something else.</h3>
							</div>
						</Fragment>
					)}
				</div>
				<div class="swiper-button-prev"></div>
  				<div class="swiper-button-next"></div>
			</Fragment>
		);
}


if (ResourcesRoot) {
	render(
		<SaveSelectedProjects />,
		ResourcesRoot
	);
}
