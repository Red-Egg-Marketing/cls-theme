const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveHero = ( { attributes } ) => {
		const { image, anchor, vidOrImg, videoID, videoURL } = attributes;

		const blockProps = useBlockProps.save({
			className: 'hero'
		});

		const imageSize = image.size != '' ? image.size + '%' : image.sizekey;

		const backgroundSettings = {
    		"background-image" : image.url != '' ? 'url(' + image.url + ')' : '',
    		"background-repeat" : image.repeat != '' ? image.repeat : '',
    		"background-attachment" : image.attachment != '' ? image.attachment : '',
    		"background-position" : image.position != '' ? image.position : '',
    		"background-size" : imageSize,
    	}
		
		return (
			<div {...blockProps} id={ anchor }>
				<div className="block-wrapper">
					<div className="hero__inner">
						<div className="content-wrap">
							<div className="hero-block-content">
								<div className="hero-block-wrap">
									<InnerBlocks.Content />
								</div>
							</div>
						</div>
						<div className="hero-block-image">
							{ (image && vidOrImg == 'image' ) && (
								<div className="hero-block-image-wrap" style={ backgroundSettings }>
								</div>
							)}
							{ (videoID && vidOrImg == 'video' ) && (
								<video className="hero-asset" autoplay playsinline muted loop>
									<source src={videoURL} className="hero-source" type="video/mp4" />
								</video>
							)}
						</div>	
					</div>
				</div>
			</div>
		);
}

export default SaveHero;