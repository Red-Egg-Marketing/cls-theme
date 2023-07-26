const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveContactAlt = ( { attributes } ) => {

		const blockProps = useBlockProps.save({
			className: 'contact-alt-section contact-section'
		});
	
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="block-content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveContactAlt;