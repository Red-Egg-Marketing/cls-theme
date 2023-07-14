const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Icons from '../../components/Icons.js';

const template = [
	'core/paragraph', {'placeholder' : 'Description...'}
];

const EditTableCellIcon = ( { attributes, setAttributes } ) => {

		const {
			width, icons, bgColor, bgSlug, link, content, buttonText, iconSlug, iconColor, altSlug
		} = attributes;

  		const [rowNumber, setRownumber] = useState(null);
		const [currentIconList, setIconList] = useState(null);
		const [searchActive, activateSearch] = useState({index: false, active: false});
		const [flipCard, swapSide] = useState(false);

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
				prefix: 'fad'
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
			className: 'table-cell-icon'
		});
		
		return (
			<Fragment>
				<div {...blockProps}>
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
						iconColor={ iconColor }
						altSlug={ altSlug }
						bgColor={ bgSlug }
						setIconList={ setIconList }
						totalIcons={ 1 }
					/>
					<InnerBlocks
						template={ template }
						allowedBlocks={['core/paragraph']}
						
					/>
				</div>
			</Fragment>
		);
}

export default EditTableCellIcon;