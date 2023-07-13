const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveImageEmbed = ( { attributes } ) => {

		const {  vidOrImg, embed } = attributes;

		const blockProps = useBlockProps.save({
			className: 'image-embed'
		});

		let sizes = "(min-width: 880px) 100vw, 400px";

		let srcSet = ``;
		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks.Content />
				</div>
			</Fragment>
		);
}

export default SaveImageEmbed;