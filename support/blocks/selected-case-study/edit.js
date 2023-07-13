const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Modal, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import SearchResources from '../../components/SearchResources.js';
import Header from '../../components/Header.js';
import ResourceCard from '../../components/ResourceCard.js';
import Swiper from 'swiper/bundle';
import PaddingSelector from '../../components/Padding.js';
// import a component

const apiUrl  = '/wp-json/cls/v2/case-studies';

const count = 1;
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
const template = [
	['cls-blocks/section-header']
]

const EditSelectedCaseStudies = ( { setAttributes, attributes, isSelected, clientId } ) => {

		const { resources, category, padding, blockId } = attributes;

		const blockProps = useBlockProps({
			className: 'selected-case-study'
		});

		const [searchActive, activateSearch] = useState({index: false, active: false});
		const [searchList, activateList] = useState(false);
		const [editCurrent, activateCurrent] = useState({index: false, active: false});
		const [currentSelect, activateSelect] = useState(false);
		const [currentCats, activateCategories] = useState(false);

		React.useEffect( () => {
        	if ( ! blockId ) {
        	    setAttributes( { blockId: 'case-study-' + clientId } );
        	}
    	}, [] );

		if ( (resources == undefined || resources.length == 0)) {

			let idCat = category ? '&id=' + category : '';
			wp.apiFetch({
				url: apiUrl + '?html=true' + '&ppp=1' + idCat
			}).then(resourcelist => {

				setAttributes({resources: resourcelist });

			});

			return (
				<section { ...blockProps }>
					Loading Case Studies...
				</section>
			);


		}

		if (currentCats == false || currentCats.length == 0) {
			wp.apiFetch({
				url: apiUrl
			}).then(categories => {
				let cats = [];
				categories.forEach((category, index) => {
					cats[index] = {	
						label: category.title,
						value: category.ID,
					};
				});

				activateCategories(cats);
			});

			return (
				<section { ...blockProps }>
					Loading Case Studies...
				</section>
			);
		}


		const setCategoryPosts = (value) => {

			wp.apiFetch({
				url: apiUrl + '?id=' + value + '&html=true' + '&ppp=1'
			}).then(resourcelist => {


				setAttributes({
					resources: resourcelist,
					category: value
				});


			});

		}


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __('Select Case Study')}
						initialOpen={ true }
					>
						<SelectControl
							 label={ __('Select Case Study')}
							 value={ category }
							 options={
							 	currentCats
							 }
							 onChange={ setCategoryPosts }
						/>
					</PanelBody>
				</InspectorControls>
				<PaddingSelector
					setAttributes={ setAttributes }
					padding={ padding }
					id={ 'block-' + clientId }
				/>
				<section {...blockProps}>
					<div className="case-studies-block">
					<div className="block-wrapper">
						<div className="resources-wrap">
							<header
								className="header"
							>
								<InnerBlocks 
									template={ template }
									allowedBlocks={['cls-blocks/section-header']}
								/>
							</header>
							<div className="resources"
								dangerouslySetInnerHTML={{ __html: resources }}
							>
							</div>		
						</div>
					</div>
					</div>
				</section>
			</Fragment>
		);
}

export default EditSelectedCaseStudies;