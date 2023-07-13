import React from 'react';
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, SelectControl, Buttons } = wp.components;
const { __ } = wp.i18n;

const style = {
    "width" : "100%",
    "max-height" : "500px",
    "overflow-y" : "auto"
}

const buttonStyle = {
    "padding-left" : "0",
    "border"    : "none",
    "display"   : "block",
    "width"     : "100%",
    "text-align"    : "left",
    "color"         : "black",
    "height"        : "auto"
}

const SearchResources = (props) => {


    const passResourceParent = (val, index) => {
        props.selectResource(val, index);
    }


	return (
        <Fragment>
        {  (props.resources.length > 0) && (
            <div 
                className="resource-search-cont"
                style={style}
            >
                <ul className="resource-list">
                    { props.resources.map((resource, resourceIndex) => {
                        return (
                            <li key={ resourceIndex } className="resource-item">
                                <Button
                                    dataId={ resource.ID }
                                    onClick={ () => { 
                                        passResourceParent(resource.ID, props.resourceIndex);
                                    }}
                                    style={ buttonStyle }
                                    value={ resource.ID }
                                >
                                    <span className="list-title">{ resource.post_title }</span><br />
                                    <span className="list-link">{ resource.link }</span>
                                </Button>
                            </li>
                        );
                      }  
                    )}
                </ul>
            </div>
        )}
        { (props.resources.length == 0) && (
             <div 
                className="resources-search-cont"
            >
                <p>No resources found. Try another search.</p>
            </div>
        )}
        </Fragment>
	);
}


SearchResources.View = (props) => {
    return (
        <Fragment>
        </Fragment>
    )
} 

export default SearchResources;