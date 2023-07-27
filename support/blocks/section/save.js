const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveSection = ( { attributes } ) => {

		const { bgSlug, bgColor } = attributes;

		const blockProps = useBlockProps.save({
			className: 'section-block' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
		});

		return (
			<section {...blockProps}>
				<div className="block-wrapper">
					<InnerBlocks.Content />
				</div>
			</section>
		);
}

export default SaveSection;