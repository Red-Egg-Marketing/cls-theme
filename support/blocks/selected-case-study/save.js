const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';

const SaveSelectedCaseStudies = ( { attributes } ) => {

	const {
		padding, blockId
	} = attributes;

	return (
		<Fragment>
			<PaddingSelector.View 
				padding={ padding }
				id={ blockId }
			/>
			<InnerBlocks.Content />
		</Fragment>
	);
}

export default SaveSelectedCaseStudies;