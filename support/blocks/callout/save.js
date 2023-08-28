const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import PaddingSelector from '../../components/Padding.js';

const SaveCallout = ( { attributes } ) => {
		const {
			icons, iconSlug, altSlug, padding, blockId
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'callout'
		});
	
		return (
			<Fragment>
			<PaddingSelector.View 
					padding={ padding }
					id={ blockId }
				/>
			<div
				{...blockProps}
				id={ blockId }
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
			</Fragment>
		);
}

export default SaveCallout;