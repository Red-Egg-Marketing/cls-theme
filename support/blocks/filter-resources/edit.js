const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import ResourceCard from '../../components/ResourceCard.js';
import ResourceFilters from '../../components/ResourceLoader.js';
const apiUrl  = '/wp-json/cls/v2/vehicles';

const template = [
	['core/heading', {'level' : 2}]
];

const EditResources = ( { attributes, setAttributes } ) => {
	  	
	  	const [resources, selectResources] = useState(false);
	  	const [taxonomy, setTaxes] = useState([]);
  		const [selectTax, setSelectTaxes] = useState([]);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [data, setData] = useState({});
  		const [toggleFilters, setToggleFilters] = useState({key: '', active: false});

		const {
			taxonomies, anchor, mainTitle
		} = attributes;

		document.addEventListener('click', function(event) {
    		let target = event.target;
    		let nodeName = target.nodeName.toLowerCase();

    		if ((target.closest('.filter-items') == null)) {
        		let buttons =  document.querySelectorAll('.tax-filter-button');

        		buttons.forEach( (button) => {
        		    let par = button.parentElement;
        		    par.classList.remove('active');
        		}); 
    		}

  		}, false);

		const blockProps = useBlockProps({
			className: 'filter-resources'
		});

		const updateAnchor = (value) => {
			let removeSpace = value.replace(/\s+/g, '-');
			setAttributes({ anchor: removeSpace });
		}


		const sendAPIrequest = (data) => {
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
        
    		}).catch( error => {
    			console.log(error);
    		});
		}

		const filterMax = (value, id, tax) => {
			if (!data[tax + '_max']) {
				data[tax + '_max'] = '';
			}
			data[tax + '_max'] = id;
			sendAPIrequest(data);
		}

		const filterMin = (value, id, tax) => {
			if (!data[tax + '_min']) {
				data[tax + '_min'] = '';
			}
			data[tax + '_min'] = id;
			sendAPIrequest(data);
		}


		const filterCats = (value, id, tax) => {
			if (!data[tax]) {
				data[tax] = [];
			}

    		if (value == true) {
    		  if (selectTax.indexOf(id) == -1) {
    		    selectTax.push(id);
    		   
    		    data[tax].push(id);
    		  }
    		} else {
    		  let index = selectTax.indexOf(id);
    		  selectTax.splice(index, 1);
    		  let dataIndex = data[tax].indexOf(id);
    		  data[tax].splice(dataIndex, 1);
    		}
    		setSelectTaxes(selectTax);
    		setData(data);
    		sendAPIrequest(data);
	  	}

	  	const toggleCats = (key, item) => {
    		// toggle state and index to determine what is active
    		// setToggleFilters({key: key, active: !toggleFilters.active });
    		let allFilt = document.querySelectorAll('.filter-block');
    		let parent = item.parentElement;

    		allFilt.forEach( (filt) => {
    		    if (parent != filt) {
    		      filt.classList.remove('active');
    		    }
    		});
    
    		parent.classList.toggle('active');
  		}

		if (resources === false) {
    		wp.apiRequest({
    		    url: apiUrl
    		}).then(resourcelist => {
    		    let posts = resourcelist[0].resources;
    		    let taxes = resourcelist[1];
    		    selectResources(posts);
    		    setTaxes(taxes);
    		});

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
				<div { ...blockProps }>
					<div className="resources-block">
						<div className="block-wrapper" id={anchor}>
							<header
								className="header triangles-grey"
							>
								<div className="header-wrap">
									<InnerBlocks
										template={ template }
										allowedBlocks={['core/heading']}
									/>
								</div>
							</header>
							<div className="resources-wrap">
								
								<ResourceFilters
									filterCats={ filterCats }
									taxonomies={ taxonomy }
									toggleCats={ toggleCats }
									currentFilter={ toggleFilters }
									filterMin={ filterMin }
									filterMax={ filterMax }
								/>
								<div className="resources-grid">
									{ (resourcesEmpty == false && resources.length > 0) && resources.map((resource, resourceIndex) => {
											return (
												<Fragment>
													<ResourceCard
														resourceIndex={ resourceIndex }
														resourceURL={ resource.link }
														resourceID={ resource.ID }
														resourceImg={ resource.media_url }
														resourceTitle={ resource.post_title  }
														resourceType={ resource.label  }
														resourceExcerpt={ resource.post_excerpt }
														updateResourceImage={ null }
														updateResourceText={ false }
														updateResourceExcerpt={ null }
														updateResourceType={ null }
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
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditResources;