const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Icons from '../../components/Icons.js';

const SaveGridIcons = ( { attributes } ) => {
		const {
			bgColor, bgSlug
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'grid-icons' + ' ' + bgSlug
		});

		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="icon-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveGridIcons;