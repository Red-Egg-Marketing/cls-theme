const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveHTML = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'html-embed'
		});
	
		return (
			<div
				{...blockProps}
			>
				<InnerBlocks.Content />
			</div>
		);
}

export default SaveHTML;