const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['core/heading', {'level': 2}]
];

const EditContactContent = ( { attributes, setAttributes } ) => {

	
		const {
			title, content, icons, subtitle, iconSlug, iconColor
		} = attributes;

		const [rowNumber, setRownumber] = useState(null);
		const [currentIconList, setIconList] = useState(null);
		const [searchActive, activateSearch] = useState({index: false, active: false});

  		const updateIcon = (value, prefix) => {
  			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = rowNumber;
			let newRow = {
				title: currentIcons[index].title,
				icon: value,
				prefix: prefix
			};

			currentIcons[index] = newRow;

			setAttributes({
				icons: currentIcons
			});

			activateSearch({ index: index, active: !searchActive.active });
  		}

		const currentRowFocus = (value) => {
			setRownumber(value);
		}

		const addIcon = () => {
			let currentIcons = JSON.parse(JSON.stringify(icons));
			let index = currentIcons.length;
			let newRow = {
				title: '',
				icon: 'address-book',
				prefix: 'far'
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

		const activateIconSearch = (index) => {

			activateSearch({ index: index, active: !searchActive.active });

		}

		const blockProps = useBlockProps({
			className: 'content-column column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>							
					<InnerBlocks 
						allowedBlocks={ ['core/heading'] }
						template={ template }
					/>
					<Icons 
						rows={ icons }
						addIcon={ addIcon }
						rowFocus={ currentRowFocus }
						removeIcon={ removeIcon }
						currentIconList={ currentIconList }
						updateIcon={ updateIcon }
						activateIconSearch={ activateIconSearch }
						searchActive={ searchActive }
						customButtonLang={ "Add Icon" }
						setAttributes={ setAttributes }
						color={ iconSlug }
						iconColor={ iconColor }
						totalIcons={ 10 }
						activeText={ true }
						setIconList={ setIconList }
					/>
					
				</div>
			</Fragment>
		);
}

export default EditContactContent;