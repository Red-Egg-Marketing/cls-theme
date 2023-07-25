const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveTableRow = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'table'
		});

		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);
}

export default SaveTableRow;