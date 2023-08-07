const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Modal, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import SearchResources from '../../components/SearchResources.js';
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ResourceCard from '../../components/ResourceCard.js';
import Swiper from 'swiper/bundle';
import BackgroundColor from '../../components/BackgroundColor.js';
import PaddingSelector from '../../components/Padding.js';

// import a component

const apiUrl  = '/wp-json/cls/v2/vehicles';
const catUrl  = '/wp-json/wp/v2/car_year?per_page=100';

const template = [
	['cls-blocks/section-header']
]
const count = 10;
const buttonStyle = {
	"margin-left" : "15px"
}
const styleControls = {
	"margin-bottom" : "15px",
	"padding-top"		: "10px",
	"padding-bottom"		: "10px"
}
const mainControl = {
	"padding-top" : "15px",
	"border-top"	: "1px solid grey",
	"width": "100%"
}

const warningStyle = {
	"text-align" : "center",
	"font-size" : "24px",
	"width" : "100%",
	"color" : "red"
}

const EditSelectedResources = ( { setAttributes, attributes, isSelected, clientId } ) => {

		const { resources, content, anchor, mainTitle, category, bgColor, bgSlug, padding, blockId } = attributes;

		const blockProps = useBlockProps({
			className: 'selected-resources' +  ' ' + bgSlug
		});

		const [searchActive, activateSearch] = useState({index: false, active: false});
		const [searchList, activateList] = useState(false);
		const [editCurrent, activateCurrent] = useState({index: false, active: false});
		const [currentSelect, activateSelect] = useState(false);
		const [currentCats, activateCategories] = useState(false);

		const updateAnchor = (value) => {
			let removeSpace = value.replace(/\s+/g, '-');
			setAttributes({ anchor: removeSpace });
		}

		const addResource = () => {
			let curResources = JSON.parse(JSON.stringify(resourcelist));
			let index = resourcelist.length;
			let len = resourcelist.length == 0 ? 1 : resourcelist.length;

			let newResource = {
				resource : []
			};
			let newTotal = parseInt(totalNotes) + 1;
			
			for (var x = 0; x < len; x++) {
				newResource = 0;
				newResource = {
					'id' : 0,
					'img' : '',
					'post_title' : '',
					'url' : ''
				}
			}

			curResources[index] = newResource;

			setAttributes({
				resourcelist: curResources,
				totalNotes: newTotal
			});

		}

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'selected-resources-' + clientId } );
        	}
    	}, [] );

		if ( (resources == undefined || resources.length == 0) && currentCats.length == 0) {

			wp.apiFetch({
				url: apiUrl
			}).then(resourcelist => {
				let size = resourcelist[0].resources.length <= count ? resourcelist[0].resources : count;
				let posts = [];
				for (var x = 0; x < size; x++) {
					posts[x] = resourcelist[0].resources[x];
				}

				setAttributes({resources: posts });
			});

			return (
				<section { ...blockProps }>
					Loading Posts...
				</section>
			);
				
		}

		if (currentCats == false || currentCats.length == 0) {
			wp.apiFetch({
				url: catUrl,
			}).then(categories => {

				let cats = [];

				categories.forEach((category, index) => {
					cats[index] = {	
						label: category.name,
						value: category.id,
					};
				});

				cats.unshift({
					label: 'All',
					value: 'all'
				});
				activateCategories(cats);
			});
		}

		const setCategoryPosts = (value) => {

			wp.apiFetch({
				url: apiUrl + '?year=' + value + '&ppp=10',
				method: 'GET'
			}).then(resourcelist => {
				let size = resourcelist[0].resources.length <= count ? resourcelist[0].resources.length : count;
				let posts = [];
				for (var x = 0; x < size; x++) {
					posts[x] = resourcelist[0].resources[x];
				}

				setAttributes({resources: posts });

			});

			setAttributes({
				category: value
			});

		}


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __('Select Year')}
						initialOpen={ true }
					>
						<SelectControl
							 label={ __('Year')}
							 value={ category }
							 options={
							 	currentCats
							 }
							 onChange={ setCategoryPosts }
						/>
					</PanelBody>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
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
				<PaddingSelector
					setAttributes={ setAttributes }
					padding={ padding }
					id={ 'block-' + clientId }
				/>
				<section {...blockProps}>
					<div className="resources-block">
					<div className="block-wrapper" id={anchor}>
						<div className="resources-wrap">
							<header
								className="header"
							>
								<InnerBlocks 
									template={ template }
									allowedBlocks={['cls-blocks/section-header']}
								/>
							</header>
							<div className="resources">
				
									{ resources.length > 0 && resources.map( (resource, resourceIndex) => {
											return(
												<Fragment>
													<ResourceCard
														resourceIndex={ resourceIndex }
														resourceURL={ resource.link }
														resourceID={ resource.ID }
														resourceImg={ resource.media_url }
														resourceTitle={ resource.post_title  }
														resourceType={ resource.label  }
														resourcePrice={ resource.price }
														resourceMiles={ resource.miles }
														resourceYear={ resource.year }
														updateResourceImage={ null }
														updateResourceText={ false }
														updateResourceExcerpt={ null }
														updateResourceType={ null }
													/>	
												</Fragment>
											);
										})
									}
							</div>
							{ resources.length == 0 && (
								<p style={ warningStyle }>{__('No Posts found. Try a different category.', 'cls-blocks')}</p>
							)}
						</div>
					</div>
					</div>
				</section>
			</Fragment>
		);
}

export default EditSelectedResources;