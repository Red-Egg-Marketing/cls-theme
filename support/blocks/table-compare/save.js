const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveTableComparison = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'comparison-table'
		});

		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		);
}

export default SaveTableComparison;