const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import ImageComp from '../../components/ImageComp.js';

const SaveHero = ( { attributes } ) => {

		const { media, embed, vidOrImg } = attributes;

		const blockProps = useBlockProps.save({
			className: 'hero'
		});

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = ``;
		
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="hero__inner">
						<div className="content-wrap">
							<div className="hero-block-content">
								<div className="hero-block-wrap">
									<InnerBlocks.Content />
								</div>
								<div className="hero-block-image">
									{ vidOrImg == 'image' && (
										<ImageComp.View
											source={ media.srcSet.large }
											alt={ __( media.alt ) }
											srcSet={ srcSet }
											sizes={ sizes }
										/>
									)}
									{ vidOrImg == 'embed' && (
										<div className="hero-asset"
											dangerouslySetInnerHTML={{ __html: embed }}
										>
										</div>
									)}
								</div>	
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default SaveHero;