const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveContactForms = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'form-column column'
		});
	
		return (
			<div {...blockProps}>
				<div className="form-wrap">
					<InnerBlocks.Content />
				</div>
			</div>
		);
}

export default SaveContactForms;