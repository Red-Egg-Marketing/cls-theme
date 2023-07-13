const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps, URLInputButton } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, Flex, TextareaControl, TextControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['core/heading', {'level' : 4, 'placeholder' : 'Card Title...'}],
	['core/paragraph', {'placeholder' : 'Card Description...'}],
	['core/buttons', {},
		[
			['core/button', {'placeholder' : 'Learn More...', 'className' : 'is-style-grey-box'}]
		]
	],
];

const colors = [
    { name: 'Navy', color: 'rgba(5, 44, 71)', slug: 'navy' },
];

const widthOptions = [
    {
        label: __( '--' ),
        value: '',
    },
    {
        label: __( 'Width 100%' ),
        value: '100',
    },
];

const EditCTA = ( { attributes, setAttributes } ) => {
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

		const blockProps = useBlockProps({
			className: 'text-card' + ' width-' + width
		});	

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
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Card Width')}
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Select Card Width' ) }
            				options={ widthOptions }
            				value={ width }
            				onChange={ ( selectedWidth ) => {
            					setAttributes({
            						width: selectedWidth
            					});
            				}}
        				/>
					</PanelBody>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
						title="Icon Background Color"
						colors={ colors }
					/>
				</InspectorControls>
				<div 
					{...blockProps}
				>
					<div className="block-wrapper">
						<div className="block-content">
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
								allowedBlocks={ ['core/heading', 'core/paragraph', 'core/buttons'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTA;