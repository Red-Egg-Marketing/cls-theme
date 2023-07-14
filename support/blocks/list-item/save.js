const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';

const SaveListItem = ( { attributes } ) => {
		const {
			icons, iconSlug, altSlug
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'list-item'
		});
	
		return (
			<div
				{...blockProps}
			>
				<div className="icon-wrap">
					<Icons.View 
						rows={ icons }
						color={ iconSlug }
						altSlug={ altSlug }
					/>
				</div>
				<div className="content">
					<InnerBlocks.Content />
				</div>
			</div>
		);
}

export default SaveListItem;