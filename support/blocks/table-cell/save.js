const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveTableCell = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'table-cell'
		});

		return (
			<InnerBlocks.Content {...blockProps}/>
		);
}

export default SaveTableCell;