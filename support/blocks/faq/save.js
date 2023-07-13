const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';

const SaveFAQ = ( { attributes } ) => {
		const {
			title, content, open
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'faq'
		});
	
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="block-content">
						<div 
							className="content-column"
							data-toggled={ open }
						>
							<Header.View
								tag="h4"
								title={ title }
							/>
							<div className="answer">
								<div class="content-col">
									<Content.View
										tag="div"
										content={ content }
										multiline="p"
										classProp="content"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default SaveFAQ;