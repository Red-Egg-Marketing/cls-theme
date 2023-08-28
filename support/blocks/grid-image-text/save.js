const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';

const SaveGrid = ( { attributes } ) => {

		const {
			padding, blockId
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'grid-text-cards'
		});
	
		return (
			<Fragment>
			<PaddingSelector.View 
					padding={ padding }
					id={ blockId }
			/>
			<div {...blockProps}>
				<div className="block-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
			</Fragment>
		);
}

export default SaveGrid;