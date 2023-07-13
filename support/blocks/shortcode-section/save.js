const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveShortcodeSection = ( { attributes } ) => {

		const { bgSlug, bgColor } = attributes;
		
		const blockProps = useBlockProps.save({
			className: 'shortcode-section' + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
		});
		
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="block-content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveShortcodeSection;