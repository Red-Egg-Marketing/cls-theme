const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';

const SaveCTA = ( { attributes } ) => {
		const {
			width, icons, bgSlug, link, content, buttonText, iconSlug, altSlug
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'text-card' + ' width-' + width
		});
	
		return (
			<div
				{...blockProps}
			>
				<div className="block-wrapper">
					<div className="block-content">
						<Icons.View 
							rows={ icons }
							bgColor={ bgSlug }
							color={ iconSlug }
							altSlug={ altSlug }
						/>
						<InnerBlocks.Content />
					</div>
				</div>				
			</div>
		);
}

export default SaveCTA;