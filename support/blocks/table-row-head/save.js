const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveTableRowHead = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'table-row-head table-row'
		});

		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);
}

export default SaveTableRowHead;