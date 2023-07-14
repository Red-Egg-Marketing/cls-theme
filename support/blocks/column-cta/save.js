const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveColumnCTA = ( { } ) => {

		const blockProps = useBlockProps.save({
			className: 'column-cta',
		});
	
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks.Content />
				</div>
			</Fragment>
		);
}

export default SaveColumnCTA;