const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveWrap = ( { attributes } ) => {

		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);
}

export default SaveWrap;