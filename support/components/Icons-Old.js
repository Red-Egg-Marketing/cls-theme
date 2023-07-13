 import React from 'react';
const { Fragment } = wp.element;
const { RichText, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, withFocusOutside, Popover, TextControl, TextareaControl, ColorPalette } = wp.components;
const { __ } = wp.i18n;
// import * as IconList from '@fortawesome/pro-regular-svg-icons';
import * as IconLight from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
// https://stackoverflow.com/questions/52625741/react-fontawesome-importing-all-icons

const defcolors = [
    { name: 'Light Blue', color: 'rgba(0, 129, 198)', slug: '#0081C6' },
    { name: 'Orange', color: 'rgba(249, 157, 51)', slug: '#F99D33' },
];


const UploadIcon = withFocusOutside(
	class extends React.Component {

		constructor() {
			super(...arguments);
    		this.render = this.render.bind(this);
    		this.handleFocusOutside = this.handleFocusOutside.bind(this);
    	}

    	handleFocusOutside() {
    		this.props.activateHTMLUpload();
    	}

		render() {

			const {
				updateUploadIcon, tempValue, icon
			} = this.props;

			const tempHTML = (value) => {
				// let temp  = value.length == 0 ? false : value;
				this.props.updateHTMLUpload(value);
			}

			const uploadHTML = () => {

				updateUploadIcon(this.props.tempValue.tempValue);
				this.props.activateHTMLUpload();
			}


			return(
				<Popover
        			position="bottom left"
        		>
        			<div style={{"min-width" : "500px", "width" : "55%", "padding" : "1.25rem"}}>
        				<h2>Upload Icon HTML/Markup</h2>
        				<div style={{"width" : "100%", "display" : "block"}}>
        					<TextareaControl
        						autoFocus={ true }
        						placeholder={ __('Html markup...') }
        						onChange={ tempHTML }
        						value={ this.props.tempValue.tempValue }
        					/>
        					<Button
        						variant="primary"
        						onClick={ uploadHTML }
        					>
        						Save
        					</Button>
        				</div>
        			</div>
        		</Popover>
			)
		}
	}
);


const SearchIcons = withFocusOutside(
	class extends React.Component {
		constructor() {
    		super(...arguments);
    		this.render = this.render.bind(this);
    		this.handleFocusOutside = this.handleFocusOutside.bind(this);
    	}

    	handleFocusOutside() {
           	this.props.activateSearchButton();
        }

        render() {

        	const {
        		icons, filterIconList, updateIcon
        	} = this.props;

        	const passIconListParent = (value) => {
        		filterIconList(value);
        	}

        	return (
        		<Popover
        			position="bottom left"
        		>
        			<div style={{"min-width" : "500px", "width" : "55%", "padding" : "1.25rem"}}>
        				<h2>Select Icon</h2>
        				<div style={{"width" : "100%", "display" : "block"}}>
        					<TextControl
        						autoFocus={ true }
        						placeholder={ __('Search Icons') }
        						onChange={ passIconListParent }
        					/>
        				</div>
        				<div style={{"width" : "100%", "max-height" : "350px", "overflow-y" : "auto", "display" : "grid", "grid-template-columns" : "1fr 1fr 1fr", "grid-template-rows" : "1fr 1fr 1fr", "grid-column-gap" : "10px", "grid-row-gap" : "10px"}}>
        					{/* Map over icons /*/}	
        					{ 	icons.map((icon, iconIndex) => {
        							let prefix = icon.prefix;
        							return(
        								<div 
        									className="icon-button"
        									style={{ "width" : "100%", "display" : "flex", "height": "65px", "flex-wrap" : "wrap", "align-items" : "stretch", "justify-content" : "center" }}
        								>	
        									<Button
        										style={{ "width" : "100%", "height" : "100%", "box-sizing": "border-box", "display" : "flex", "flex-wrap" : "wrap", "align-items": "center", "justify-content" : "center", "min-height" : "45px", "border" : "1px solid rgba(0, 0, 0, 0.1125)", "border-radius" : "8px", "box-shadow" : "1px 1px 1px 2px rgba(0, 0, 0, .025)"}}
        										onClick={ () => {
        											updateIcon( icon.iconName, prefix );
        										}}
        									>
        										<FontAwesomeIcon 
        											style={{ "width" : "25px", "height" : "auto", "display" : "block" }}
        											icon={ [prefix, icon.iconName] }
        										/>
        									</Button>
        								</div>
        							);
        						})
        					}
        				</div>
        			</div>
        		</Popover>
        	);
        }
	}
);


const Icons = (props) => {

	const { uploadActivated, uploadActive, bgColor, totalIcons, setAttributes, rows, activeText, setIconList, currentIconList, activeParent, colors, iconColor } = props;

	const IconLibrary = Object
  			.keys(IconLight)
  			.filter(key => key !== "fal" && key !== "prefix" )
  			.map(icon => IconLight[icon]);

  	// const IconSolidLibrary = Object
  			// .keys(IconSolid)
  			// .filter(key => key !== "fas" && key !== "prefix" )
  			// .map(icon => IconSolid[icon]);

  	library.add(...IconLibrary);

  	const customColors = colors == null ? defcolors : colors;

  	const AllIcons = [...IconLibrary];

  	const buttonLang = props.customButtonLang != '' ? props.customButtonLang : 'Add Icon';

  	const defaultIcons = totalIcons != undefined ? totalIcons : 0;

  	const hasText = activeText != undefined ? activeText : false;

  	const isParentActive = activeParent != undefined ? activeParent : false;

  	const onChangeContact = (value, rowNumber) => {
		let currentIcons = JSON.parse(JSON.stringify(rows));
		let index = rowNumber;
		let newRow = {
			title : value,
			icon: currentIcons[index].icon,
			prefix: currentIcons[index].prefix
		};
		currentIcons[index] = newRow;

		setAttributes({
			icons: currentIcons
		});

	}

	const filterIconList = (value) => {
		let search = value.replace(" ", "-");
		let foundIcons = AllIcons.filter(icon => {
			let name = icon.iconName;
			if (name.indexOf(search, 0) != -1) {
				return icon;
			}
		});

		setIconList(foundIcons);
	}

	const setIconColor = (value) => {

		var iconColor = customColors.find(obj => {
			if (obj.color == value) {
				return obj;
			}
		});

		setAttributes( {
			iconColor: value
		});

		setAttributes({
			iconSlug: iconColor != undefined ? iconColor.slug : ''
		});

	}

	return (
		
		<Fragment>
		<InspectorControls>
			<PanelBody
					title={__( 'Icon Color' )}
					initialOpen={ true }
				>
					<ColorPalette
        	    		colors={ customColors }
        	    		value={ iconColor }
        	    		onChange={ setIconColor }
        	    		disableCustomColors={ true }
        			/>
			</PanelBody>
		</InspectorControls>

		{(uploadActivated == true && props.uploadActive.active == true) && (
			<UploadIcon
				activateHTMLUpload={ props.activateHTMLUpload }
				updateUploadIcon={ props.updateUploadIcon }
				tempValue={ props.uploadActive }
				updateHTMLUpload={ props.updateHTMLUpload }
				icon={ rows[props.uploadActive.index] }
			/>
		)}

		{/*check current index*/}
		{ (props.searchActive.active == true) && (

			<SearchIcons
				activateSearchButton={ props.activateIconSearch }
				icons={ props.currentIconList }
				filterIconList={ filterIconList }
				updateIcon={ props.updateIcon }
			/>
		)}
			{ rows.map((row, rowIndex) => {
					let icon = row.icon;
					let prefix = row.prefix;
					let upload = row.upload;

					return (
						<Fragment>
						<div 
							className="icon-row"
						>
							<div 
								className={`icon-icon ${ bgColor != null ? bgColor : ''}`}
								data-icon={ row.icon }
							>
								{ (upload == '' || typeof upload == 'undefined') && (
									<div 
										className="icon-wrap"
										data-prefix={ prefix }
									>
										<FontAwesomeIcon
											icon={ [prefix, icon] }
											color={ props.color == null ? '#19303F' : props.color }
										/>
									</div>
								)}
								{ uploadActivated == true && upload != '' && (
									<div
										className="upload-icon"
										dangerouslySetInnerHTML={{ __html: upload }}
									>
									</div>
								)}
							</div>
							{ hasText == true && (
								<RichText
									tagName="p"
									className="contact-item"
									value={ row.title }
									placeholder="Contact Info..."
									onChange={ (value) => { 
											onChangeContact(value, rowIndex);
										}
									}
									unstableOnFocus={ () => {
					 						props.rowFocus(rowIndex);
					 					}
									}
								/>
							)}
							<div className="icon-controls" style={ 
								{ 
									"width" : "100%",
									"display" : "flex",
									"flex-wrap" : "wrap",
									"justify-content" : "center"
								}
							}>
								<Button
									isLink
									className="remove-icon"
									onClick={ () => { 
											setIconList(AllIcons);
											props.activateIconSearch(rowIndex, props.parentIndex);	
											props.rowFocus(rowIndex);
										}
									}
								>
									Select Icon
								</Button>
								<Button
									isDestructive
									isLink
									onClick={ () => { 
											props.removeIcon(rowIndex, props.parentIndex);

										}
									}
								>
									Remove Icon
								</Button>
								{ uploadActivated == true && (
									<Button
										isLink
										className="upload-icon"
										onClick={ () => {
												props.rowFocus(rowIndex);
												props.activateHTMLUpload(rowIndex, props.parentIndex );
											}
										}
									>
										Upload Icon
									</Button>
								)}
							</div>
							
						</div>
						
						</Fragment>
					);
				})
			}
			{ props.rows.length < defaultIcons && (
				<Button
					className="button"
					onClick={ () => {
						setIconList(AllIcons);
						let iconIndex = props.iconIndex != undefined ? props.iconIndex : false;
						if (iconIndex !== false) {
							props.addIcon(iconIndex);
						} else {
							props.addIcon();
						}
					}}
				>
					{ buttonLang }
				</Button>
			)}
		</Fragment>
	)
}

Icons.View = (props) => {

	const IconLibrary = Object
  			.keys(IconLight)
  			.filter(key => key !== "fal" && key !== "prefix" )
  			.map(icon => IconLight[icon]);

  	// const IconSolidLibrary = Object
  	// 		.keys(IconSolid)
  	// 		.filter(key => key !== "fas" && key !== "prefix" )
  	// 		.map(icon => IconSolid[icon]);

  	library.add(...IconLibrary);

  	const { bgColor, rows, activeText } = props;

  	const hasText = activeText != null ? activeText : false;

	return(
		<Fragment>
			{ rows.map((row, rowIndex) => {
					let icon = row.icon;
					let prefix = row.prefix;
					let upload = row.upload;

					return (
						<div className="icon-row">
							<div 
								className={`icon-icon ${ bgColor != null ? bgColor : ''}`}
								data-icon={ row.icon }
							>
								{ (upload == '' || typeof upload == 'undefined') && (
									<div 
										className="icon-wrap"
										data-prefix={ prefix }
									>
										<FontAwesomeIcon
											icon={ [prefix, icon] }
											color={ props.color == null ? '#19303F' : props.color }
										/>
									</div>
								)}
								
								{ upload != '' && (
									<div
										className="upload-icon"
										dangerouslySetInnerHTML={{ __html: upload }}
									>
									</div>
								)}
							</div>
							{ hasText == true && (
								<RichText.Content
									tagName="p"
									className="contact-item"
									value={ row.title }
								/>
							)}
						</div>
					);
				})
			}
		</Fragment>
	)
}

export default Icons;