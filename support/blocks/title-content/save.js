const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';

const SaveTip = ( { attributes } ) => {
		const {
			title, content
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'title-content'
		});

		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="block-content">
						<div className="wrap">
							<Header.View
								tag="h2"
								title={ title }
							/>
							<Content.View
								tag="div"
								content={ content }
								multiline="p"
								classProp="content"
							/>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);
}

export default SaveTip;