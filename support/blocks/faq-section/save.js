const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveFAQSection = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'faq-section'
		});

		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		);
}

export default SaveFAQSection;