const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveImageGrid = ( { attributes } ) => {

		const blockProps = useBlockProps.save({
			className: 'image-grid'
		});
		
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<InnerBlocks.Content />				
				</div>
			</div>
		);
}

export default SaveImageGrid;