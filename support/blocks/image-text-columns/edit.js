const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, TextControl, SelectControl, ColorPalette, ToggleControl, RangeControl, ResponsiveWrapper } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';
import Header from '../../components/Header.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import BackgroundSelector from '../../components/BackgroundSelector.js';
import ColumnsWidths from '../../components/Columns-Widths.js';

// Available alignment control options
const alignOptions = [
	{
        label: __( 'Image Right' ),
        value: 'img-right',
    },
    {
        label: __( 'Image Left' ),
        value: 'img-left',
    },
];


const VidImg = [
    {
        label: __( 'Image' ),
        value: 'image',
    },
    {
        label: __( 'Video' ),
        value: 'video',
    }
];


let allowBlocks = ['cls-blocks/content'];

const EditImageColumns = ( { attributes, setAttributes } ) => {
		const {
			contentAlign, media, title, image, bgColor, bgSlug, color, vidOrImg, videoID, videoURL, videothumb, columnwidth
		} = attributes;

		const template = [
			['cls-blocks/content']
		];

		const updateImageAttr = (media) => {
			let large   = media.url,
			    medium  = media.sizes['medium-small'] ? media.sizes['medium-small'].url : media.url;

            	setAttributes({
            	    media : {
						srcSet: {
							large : large,
							medium : medium
						},
						id: media.id,
						alt: media.alt
					}
            	});
            	
        }

        const imageSize = image.size != '' ? image.size + image.unit : image.sizekey;

		let imagePos = '';

        if (image.bgkeyword == 'keyword') {
        	imagePos = image.position != '' ? image.position : '';
        } else if(image.bgkeyword == 'values') {
        	let unit = image.bgunit;
        	imagePos = image.positionX + unit + ' ' + image.positionY + unit;
        }

    	const backgroundSettings = {
    		"background-image" : image.url != '' ? 'url(' + image.url + ')' : '',
    		"background-repeat" : image.repeat != '' ? image.repeat : '',
    		"background-attachment" : image.attachment != '' ? image.attachment : '',
    		"background-position" : imagePos,
    		"background-size" : imageSize
    	}

		const blockProps = useBlockProps({
			className: 'image-columns' + (vidOrImg == 'icons' ? ' with-icons' : '') + ' ' + contentAlign + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')  + (' ' + columnwidth),
			style: backgroundSettings
		});	

		const updateVideoAttr = (media) => {
            setAttributes({
                videoURL : media.url,
                videoID : media.id
            });
        }

        const removeBackgroundImage = () => {

    		let newBody = JSON.parse(JSON.stringify(videothumb));
    		newBody.url = '';
    		newBody.width = '';
    		newBody.height = '';

    		setAttributes({
    			videothumb: newBody
    		});
    	}


    	const setBackgroundImage = (media) => {

    		let newBody = JSON.parse(JSON.stringify(videothumb));
    		let type = media.mime;
    		newBody.url = media.url;
    		if (type == "image/svg+xml") {
    			var xmlhttp = new XMLHttpRequest();
				xmlhttp.open("GET", media.url, true);  
				xmlhttp.onreadystatechange = function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200){
						let myresponse = xmlhttp.responseText;
						let parser = new DOMParser();
    					let doc = parser.parseFromString(myresponse, "image/svg+xml");
    					let viewBox = doc.documentElement.viewBox.baseVal;
    					let width = viewBox.width;
    					let height = viewBox.height;
    					newBody.width = width;
    					newBody.height = height;
					}
				}
				xmlhttp.send();
    		} else {
    			newBody.width = media.width;
    			newBody.height = media.height;
    		}

    		setAttributes({
    			videothumb: newBody
    		});
    	}
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody 
						title={ __( 'Align Content' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Align Content' ) }
							value={ contentAlign }
							options={ alignOptions}
							onChange={ ( selectedAlign ) => {
								setAttributes( {
									contentAlign: selectedAlign,
								} );
							} }
						/>
					</PanelBody>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
					<ColumnsWidths
						setAttributes={ setAttributes }
						columnwidth={ columnwidth }
					/>
					{ vidOrImg == 'image' && (
						<Fragment>
							<BackgroundSelector
								setAttributes={ setAttributes }
								image={ image }
							/>
						</Fragment>
					)}
					<PanelBody
							title={ __( 'With Video or Image' ) }
							initialOpen={ false }
						>
							<SelectControl
								label={ __( 'Video or Image' ) }
								value={ vidOrImg }
								options={ VidImg }
								onChange={ ( selectedVidImg ) => {
									setAttributes( {
										vidOrImg: selectedVidImg,
									} );
									if (selectedVidImg == 'icons') {
										allowBlocks.push('cls-blocks/icon-rows');
										template.push('cls-blocks/icon-rows');

									} else {
										if (allowBlocks.includes('cls-blocks/icon-rows')){
											let index = allowBlocks.indexOf('cls-blocks/icon-rows');
											allowBlocks.splice(index, 1);
											template.splice(index, 1);
										}
									}

								} }
							/>
					</PanelBody>
					{ vidOrImg == 'video' && (
							<PanelBody
								title={ __('Video Thumbnail')}
								initialOpen={ false }
							>
								<MediaUpload
									allowedTypes={ ['image'] }
									onSelect={ setBackgroundImage }
									value={ videothumb.url }
									render={ ( {open} ) =>(
										<Fragment>
											<Button
												isSecondary
												onClick={ open }
												style={
													{
														'margin-bottom' : '15px',
														'height' : 'auto',
														'display' : 'block',
														'width' : '100%'
													}
												}
											> 
												{ videothumb.url == '' && ( __('Add Video Thumbnail') )}
												{ videothumb.url != '' && (
													<ResponsiveWrapper
														naturalWidth={ videothumb.width }
														naturalHeight={ videothumb.height }
													>
														<img 
															src={ videothumb.url }
															style={
																{
																	'max-height' : 'auto',
																	'width' : 'auto',
																}
															}
														/>
													</ResponsiveWrapper>
												)}
											</Button>
								
												{ videothumb.url != '' && (
													<Fragment>
														<Button
															isDestructive
															isSmall
															onClick={
																removeBackgroundImage
															}
														>
															Remove Image
														</Button>
													</Fragment>
												)}
										</Fragment>
									)}
								/>
							</PanelBody>
						)
					}
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className={`block-content ${ contentAlign }`}>
							<Fragment>
							<div className="image-col column">
								{ vidOrImg == 'image' && (
									<Fragment>
										<ImageComp
											id={ media.id }
											source={ media.srcSet.large }
											updateImageAttr={ updateImageAttr }
											alt={ __( media.alt ) }
										/>
									</Fragment>
								)}
								{ vidOrImg == 'video' && (
									<Fragment>
										<MediaUpload
											onSelect={ updateVideoAttr }
											allowedTypes="video/mp4"
											value={ videoID }
											render={ ( { open } ) => (
												<Button
													className="button"
													onClick={ open }
												>
													Upload/Change Video
												</Button>
											) }
										/>
		
										{ videoID && (
											<video className="hero-asset" 
												playsinline
												poster={ videothumb.url }
											>
												<source src={videoURL} className="source" type="video/mp4" />
											</video>
										)}
									</Fragment>
								)}
							</div>
							<div className="content-columns column">
								<div className="wrap">
									<InnerBlocks 
										template={ template }
										allowedBlocks={ allowBlocks }
									/>
								</div>
							</div>
							</Fragment>
							
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditImageColumns;