const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import PaddingSelector from '../../components/Padding.js';

const SaveCTA = ( { attributes } ) => {
		const {
			content, footer, padding, blockId
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'cta',
			id: blockId
		});
	
		return (
			<Fragment>
				<PaddingSelector.View 
					padding={ padding }
					id={ blockId }
				/>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">
							<div className="content">
								<Header.View
									tag="h3"
									title={ content }
								/>
								<Content.View
									tag="div"
									content={ footer }
									multiline="p"
									classProp="content-footer"
							/	>
							</div>
							<div className="links">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default SaveCTA;