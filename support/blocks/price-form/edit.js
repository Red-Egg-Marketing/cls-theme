const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import ResourceCard from '../../components/ResourceCard.js';
import ResourceFilters from '../../components/ResourceLoader.js';
const apiUrl  = '/wp-json/cls/v2/vehicles';

const template = [
	['core/heading', {'placeholder': 'Heading...'}],
];

const EditHeader = ( { attributes, setAttributes } ) => {

		const [resources, selectResources] = useState(false);
	  	const [taxonomy, setTaxes] = useState([]);
  		const [selectTax, setSelectTaxes] = useState([]);
  		const [resourcesEmpty, setEmpty] = useState(false);
  		const [data, setData] = useState({});
  		const [toggleFilters, setToggleFilters] = useState({key: '', active: false});
	  	
		const blockProps = useBlockProps({
			className: 'resources-wrap'
		});

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

		if (resources === false) {
    		wp.apiRequest({
    		    url: apiUrl
    		}).then(resourcelist => {
    		    let posts = resourcelist[0].resources;
    		    selectResources(posts);
    		});
  		}
		
		return (
			<Fragment>
				<div { ...blockProps }>
					<div className="resources-grid">
					<div className="form-wrap">
						<InnerBlocks
							template={ template }
							allowedBlocks={['core/heading']}
						/>
					</div>
					<div className="resources resources-wrap">
						<div className="resources-grid">
						{ (resources && resourcesEmpty == false && resources.length > 0) && resources.map((resource, resourceIndex) => {
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
			</Fragment>
		);
}

export default EditHeader;