const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import * as IconList from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const EditSection = ( { attributes, setAttributes } ) => {

		const {
			bgColor, bgSlug, icons, image, margin
		} = attributes;

		const IconLibrary = Object
  			.keys(IconList)
  			.filter(key => key !== "fas" && key !== "prefix" )
  			.map(icon => IconList[icon]);

  		library.add(...IconLibrary);

  		const [rowNumber, setRownumber] = useState(null);
		const [currentIconList, setIconList] = useState(IconLibrary);
		const [searchActive, activateSearch] = useState({index: false, active: false});

		const updateIcon = (value) => {
  			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = rowNumber;
			let newRow = {
				icon: value
			};

			currentIcons[index] = newRow;

			setAttributes({
				icons: currentIcons
			});

			activateSearch({ index: index, active: !searchActive.active });
  		}

		const addIcon = () => {
			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = currentIcons.length;
			let newRow = {
				title: '',
				icon: 'address-book'
			};

			currentIcons.splice(index, 0, newRow);

			setAttributes({
				icons: currentIcons
			});

		}

		const removeIcon = (index) => {

			let currentIcons = JSON.parse(JSON.stringify(icons));

			currentIcons.splice(index, 1);

			setAttributes({
				icons: currentIcons
			});

		}

		const filterIconList = (value) => {
			let search = value.replace(" ", "-");
			let foundIcons = IconLibrary.filter(icon => {
				let name = icon.iconName;
				if (name.indexOf(search, 0) != -1) {
					return icon;
				}
			});

			setIconList(foundIcons);
		}


		const activateIconSearch = (index) => {

			activateSearch({ index: index, active: !searchActive.active });

		}

		const currentRowFocus = (value) => {
			setRownumber(value);
		}


		const blockProps = useBlockProps({
			className: 'section-block' + ' ' + bgSlug
		});



    	const imageSize = image.size != '' ? image.size + '%' : image.sizekey;

    	const backgroundSettings = {
    		"background-image" : image.url != '' ? 'url(' + image.url + ')' : '',
    		"background-repeat" : image.repeat != '' ? image.repeat : '',
    		"background-attachment" : image.attachment != '' ? image.attachment : '',
    		"background-position" : image.position != '' ? image.position : '',
    		"background-size" : imageSize,
    		"margin-top" : (margin.margintop == false ? '0' : ''),
			"margin-bottom" : (margin.marginbottom == false ? '0' : ''),
    	}
		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundSelector
						setAttributes={ setAttributes }
						image={ image }
					/>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
					<PanelBody
						title={__('Margin Controls')}
						initialOpen={ true }
					>
						<ToggleControl
							label={ __('Margin Top?', 'cls') }
							onChange={ () => {
								let newMargin = JSON.parse(JSON.stringify(margin));
								newMargin.margintop = !margin.margintop
								setAttributes({
									margin: newMargin
								});
							}}
							checked={ margin.margintop }
						/>
						<ToggleControl
							label={ __('Margin Bottom?', 'cls') }
							onChange={ () => {
								let newMargin = JSON.parse(JSON.stringify(margin));
								newMargin.marginbottom= !margin.marginbottom
								setAttributes({
									margin: newMargin
								});
							}}
							checked={ margin.marginbottom }
						/>
					</PanelBody>
				</InspectorControls>
				<section {...blockProps} style={ backgroundSettings }>
					<div className="block-wrapper">
						<div className="icon-wrapper top-icon">
							<Icons 
								rows={ icons }
								addIcon={ addIcon }
								rowFocus={ currentRowFocus }
								removeIcon={ removeIcon }
								currentIconList={ currentIconList }
								updateIcon={ updateIcon }
								activateIconSearch={ activateIconSearch }
								searchActive={ searchActive }
								filterIconList={ filterIconList }
								customButtonLang={ "Add Section Icon" }
							/>
						</div>
						<InnerBlocks />
					</div>
				</section>
			</Fragment>
		);
}

export default EditSection;