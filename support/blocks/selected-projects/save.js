const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';

const SaveSelectedResource = ( { attributes } ) => {

	const {
		padding, blockId, category
	} = attributes;

	const blockProps = useBlockProps.save({
			className: 'selected-resources'
	});

	return ( 
		<Fragment>
			<section {...blockProps}>
				<div className="resources-block">
					<div className="block-wrapper">
						<div className="resources-wrap">
							<PaddingSelector.View 
								padding={ padding }
								id={ blockId }
							/>
							<header
								className="header"
							>
								<InnerBlocks.Content />
							</header>
							<div className="resources swiper" data-category={ category } id="VehiclesWrap"></div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}

export default SaveSelectedResource;