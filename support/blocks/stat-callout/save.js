const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';

const SaveCTA = ( { attributes } ) => {
		const {
			content, title
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'stat-callout'
		});
	
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="stat col">
						<Header.View
							tag="h3"
							title={ title }
						/>
						<Content.View
							tag="div"
							content={ content }
							multiline="p"
							classProp="content"
						/>
					</div>
					<div className="stat-description col">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveCTA;