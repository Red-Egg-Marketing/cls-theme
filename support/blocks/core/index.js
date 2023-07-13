const { assign } = lodash;
const { createHigherOrderComponent, compose } = wp.compose;
const { withDispatch } = wp.data;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, SelectControl, ColorPalette, RangeControl, TextControl, ToggleControl } = wp.components;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const coreName = 'core/heading';
const enableCoreWrapOnBlocks = [
    coreName,
];
import classNames from "classNames";

const fontfamilyOptions = [
	{
        label: __( '--' ),
        value: '',
    },
	{
        label: __( 'Rigid' ),
        value: 'rigid',
    },
    {
        label: __( 'Industry' ),
        value: 'industry',
    },
];


const addCoreAttributes = (settings) => {
	//check if object exists for old Gutenberg version compatibility

	if( typeof settings.attributes !== 'undefined' && settings.name == coreName && settings.name.indexOf('core/block') == -1){

		settings.attributes = Object.assign( settings.attributes, {
			fontfamily: {
				type: 'string'
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

   		const { fontfamily, className } = props.attributes;

   		// add has-icon-xy to block

		const checkParentAttribute = () => {
			const parentBlocks = wp.data.select( 'core/block-editor' ).getBlockParents(props.clientId);
			const postType = wp.data.select('core/editor').getCurrentPostType();
			// has parent block if array has more than zero, set hasparent attribute to true
		}


		const blockProps = { 
			...props,
			atrributes: {
				...props.attributes
			}
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<SelectControl
							label={__('Font Family')}
							options={ fontfamilyOptions }
							value={ fontfamily }
							onChange={ ( selectedFont ) => {
            					props.setAttributes({
            						fontfamily: selectedFont
            					});
            				}}
						/>
					</PanelBody>
				</InspectorControls>
				<BlockEdit {...blockProps} />
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


const customCoreFuncList = createHigherOrderComponent( ( BlockListBlock ) => {
	 // Do nothing if it's another block than our defined ones.

    return ( props ) => {

    	if ( props.name != coreName || props.name.indexOf('core/block') != -1) {
       		return (
				<BlockListBlock { ...props } />				
			);
    	}

   		const { fontfamily, className } = props.attributes;


		const blockProps = { 
			...props,
			className: classNames(className, fontfamily)
		}


		return (
			<Fragment>
				<BlockListBlock {...blockProps} />
			</Fragment>		
		);
	};
}, 'customCoreParentCheckList'
);

addFilter( 
	'editor.BlockListBlock', 
	'editorskit/custom-core-functionality', 
	customCoreFuncList
);


const customHtmlWrapperCoreBlocks = (element, blockType, attributes) => {
	if (!element) {
		return;
	}
	
	if (blockType.name == coreName) {

		var newElement = wp.element.cloneElement(element);
		// var child = newElement.props.children;
		var fontfamily = attributes.fontfamily != '' ? ' ' + attributes.fontfamily : '';

		if (fontfamily != undefined) {
			newElement.props.className = element.props.className  + fontfamily
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