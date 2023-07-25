const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';

const SaveCallout = ( { attributes } ) => {
		const {
			icons, iconSlug, altSlug
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'callout'
		});
	
		return (
			<div
				{...blockProps}
			>
				<div className="block-wrapper">
					<div className="wrap">
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
			</div>
		);
}

export default SaveCallout;