const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';

const SaveContactColumn = ( { attributes } ) => {
		const {
			title, content, icons, subtitle, iconSlug, iconColor
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'content-column column'
		});
	
		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
				<Icons.View
					rows={ icons }
					color={ iconSlug }
					iconColor={ iconColor }
					activeText={ true }
				/>
				
			</div>
		);
}

export default SaveContactColumn;