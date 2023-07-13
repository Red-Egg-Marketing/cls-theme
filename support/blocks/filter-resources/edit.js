const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import ResourceCard from '../../components/ResourceCard.js';
import ResourceFilters from '../../components/ResourceLoader.js';
const apiUrl  = '/wp-json/cls/v2/resources';

const template = [
	['core/heading', {'level' : 2}]
];

const EditResources = ( { attributes, setAttributes } ) => {
	  	
	  	const [resources, selectResources] = useState(false);
	  	const [taxonomy, setTaxes] = useState([]);
  		const [selectTax, setSelectTaxes] = useState([]);
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

		const filterCats = (value, id, tax) => {

    		if (value == true) {
    		  if (selectTax.indexOf(id) == -1) {
    		    selectTax.push(id);
    		  }
    		} else {
    		  let index = selectTax.indexOf(id);
    		  selectTax.splice(index, 1);
    		}
    		setSelectTaxes(selectTax);

    		wp.apiRequest({
        		url: apiUrl
    		}).then(resourcelist => {

        		let posts = resourcelist[0].resources;
        		let taxonomies = posts.taxonomies;
        		// Filter based off selected taxonomies. For example, if topic A and topic B are selected. select posts that have both topice A AND topic B.
        		let filterPosts = posts.filter((post) => {
        	  		let postTax = Object.keys(post.taxonomies);
        	  		let postTaxes = Object.entries(post.taxonomies);
        	  		let postTruthy = [];
        	  		let sizeTaxes = selectTax.length;
        	  		// loop over all selected taxonomies
        	  		selectTax.forEach((taxItem) => {
        	  		    // loop over each posts' taxonomies
        	  		    postTaxes.forEach((postTitem) => {
        	  		      let indTax = postTitem[1];
        	  		      indTax.forEach((anotherItem) => {
        	  		        let aTerm_id = anotherItem.term_id;
        	  		        if (aTerm_id == taxItem) {
        	  		          postTruthy.push(true);
        	  		        }
        	  		      });
        	  		    });
        	  		});
        	  
        	  		return postTruthy.length == sizeTaxes ? true : false;
        	  
        			});
        			selectResources(filterPosts);
    			});
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
							<div className="resources-wrap">
								<header
									className="header"
								>
									<InnerBlocks
										template={ template }
										allowedBlocks={['core/heading']}
									/>
								</header>
								<ResourceFilters
									filterCats={ filterCats }
									taxonomies={ taxonomy }
									toggleCats={ toggleCats }
									currentFilter={ toggleFilters }
								/>
								<div className="resources-grid">
									{resources.length > 0 && resources.map((resource, resourceIndex) => {
											
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditResources;