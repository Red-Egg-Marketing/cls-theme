const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

import PaddingSelector from '../../components/Padding.js';

const SaveSectionHead = ( { attributes } ) => {

		const {
			padding, blockId
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'section-header',
			id: blockId
		});
		
		return (
			<Fragment>
				<PaddingSelector.View 
						padding={ padding }
						id={ blockId }
				/>
				<div {...blockProps}>
					<InnerBlocks.Content />
				</div>
			</Fragment>
		);
}

export default SaveSectionHead;