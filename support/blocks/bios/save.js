const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveBios = ( { attributes } ) => {
	
		const blockProps = useBlockProps.save({
			className: 'bios'
		});

		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="grid">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveBios;