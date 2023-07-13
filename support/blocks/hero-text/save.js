const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveHeroText = ( { attributes } ) => {

		const {
			bgColor, bgSlug
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'hero-text' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
		})
		
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="hero__inner">
						<div className="content-wrap">
							<div className="hero-block-content">
								<div className="hero-block-wrap">
									<InnerBlocks.Content />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default SaveHeroText;