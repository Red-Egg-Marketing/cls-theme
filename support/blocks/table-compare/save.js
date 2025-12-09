const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveTableComparison = ( { attributes } ) => {

		const {
			withTableHead, width, border
		} = attributes;
	
		const blockProps = useBlockProps.save({
			className: 'comparison-table' + (withTableHead ? '' : ' no-head')  + (width ? ' narrow-width' : '') + (border ? '' : ' no-border')
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