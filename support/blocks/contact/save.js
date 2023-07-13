const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';

const SaveContact = ( { attributes } ) => {
		const {
			bgColor, bgSlug
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'contact-section' + ' ' + bgSlug
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

export default SaveContact;