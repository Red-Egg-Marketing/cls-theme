const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Icons from '../../components/Icons.js';

const SaveTableCell = ( { attributes } ) => {

		const {
			icons, bgSlug, iconSlug, altSlug
		} = attributes;
	
		const blockProps = useBlockProps.save({
			className: 'table-cell-icon'
		});
  
		return (
			<div {...blockProps}>
				<Icons.View 
					rows={ icons }
					bgColor={ bgSlug }
					activeText={ true }
					color={ iconSlug }
					altSlug={ altSlug }
				/>
				<InnerBlocks.Content />
			</div>
		);
}

export default SaveTableCell;