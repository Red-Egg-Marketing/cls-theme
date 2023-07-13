const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex } = wp.components;
const { __ } = wp.i18n;
import Icons from '../../components/Icons.js';
import Header from '../../components/Header.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const colors = [
    { name: 'Navy', color: 'rgba(5, 44, 71)', slug: 'navy', alt: 'navy' },
];

const EditCTAIcon = ( { attributes, setAttributes } ) => {
		const {
			icons, template, title, link, bgColor, bgSlug, iconSlug, iconColor, altSlug
		} = attributes;

		const [rowNumber, setRownumber] = useState(null);
		const [currentIconList, setIconList] = useState(null);
		const [searchActive, activateSearch] = useState({index: false, active: false});


		const updateIcon = (value, prefix) => {
  			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = rowNumber;

			let newRow = {
				icon: value,
				prefix: prefix
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
				icon: 'address-book',
				prefix: 'fal'
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

		const setLink = (value) => {
    		setAttributes({
    			link: value
    		});
    	}

    	const setContent = (value) => {
    		setAttributes({
    			content: value
    		});
    	}

    	const setButtonText = (value) => {
    		setAttributes({
    			buttonText: value
    		});
    	}

		const blockProps = useBlockProps({
			className: 'icon-cta'
		});	
		
		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
						title="Icon Background Color"
						colors={ colors }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="icon-link">
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
							customButtonLang={ "Add Icon" }
							setAttributes={ setAttributes }
							color={ iconSlug }
							altSlug={ altSlug }
							iconColor={ iconColor }
							bgColor={ bgSlug }
							setIconList={ setIconList }
							totalIcons={ 1 }
						/>
						<Header
							title={ title }
							tag="h4"
							setAttributes={ setAttributes }
						/>
					</div>
					<Flex>
						<URLInputButton 
							onChange={ setLink }
							url={ link }
						/>
					</Flex>
				</div>
				
			</Fragment>
		);
}

export default EditCTAIcon;