const { assign } = lodash;
const { createHigherOrderComponent, compose } = wp.compose;
const { withDispatch } = wp.data;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, ColorPalette, RangeControl, TextControl, ToggleControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const coreName = 'core/button';
const enableCoreWrapOnBlocks = [
    coreName,
];
import classNames from "classNames";


const addCoreAttributes = (settings) => {
	//check if object exists for old Gutenberg version compatibility

	if( typeof settings.attributes !== 'undefined' && settings.name == coreName && settings.name.indexOf('core/block') == -1){

		settings.attributes = Object.assign( settings.attributes, {
			open: {
				type: 'boolean',
				default: false
			}
		});

	}

	return settings;

}

addFilter(
	'blocks.registerBlockType',
	'editorskit/custom-core-attribues',
	addCoreAttributes
);


const customCoreFunc = createHigherOrderComponent( ( BlockEdit ) => {
	 // Do nothing if it's another block than our defined ones.

    return ( props ) => {

    	if ( props.name != coreName || props.name.indexOf('core/block') != -1) {
       		return (
				<BlockEdit { ...props } />				
			);
    	}

   		const { open } = props.attributes;
   		// add has-icon-xy to block

		const checkParentAttribute = () => {
			const parentBlocks = wp.data.select( 'core/block-editor' ).getBlockParents(props.clientId);
			const postType = wp.data.select('core/editor').getCurrentPostType();
			// has parent block if array has more than zero, set hasparent attribute to true
		}


		return (
			<Fragment>
				<InspectorControls>
						<PanelBody>
							<ToggleControl 
								label={__('Open Form Modal?')}
								checked={ !!open }
								onChange={ () => {
										props.setAttributes({
											open: !open
										});
									}
								}
							/>
						</PanelBody>
				</InspectorControls>
				<BlockEdit {...props} />
			</Fragment>		
		);
	};
}, 'customCoreParentCheck'
);

addFilter( 
	'editor.BlockEdit', 
	'editorskit/custom-core-functionality', 
	customCoreFunc
);


const customHtmlWrapperCoreBlocks = (element, blockType, attributes) => {
	if (!element) {
		return;
	}
	
	if (blockType.name == coreName) {

		var newElement = wp.element.cloneElement(element);
		var child = newElement.props.children;
		var open = attributes.open;

		if (child != undefined) {
			let href = child.props.href;
			if (open == true) {
				child.props['data-src'] = href;
				child.props['data-fancybox'] = true;
			} else {
				// remove props if exist
				if (child.props['data-src'] != null) {
					delete child.props['data-src'];
					delete child.props['data-fancybox'];
				}
			}

		}

		return newElement;
	}

	return element;

}

addFilter(
	'blocks.getSaveElement',
	'editorskit/custom-html-wrapper-core',
	customHtmlWrapperCoreBlocks
);