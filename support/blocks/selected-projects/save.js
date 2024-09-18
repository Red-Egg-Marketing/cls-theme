const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;
import PaddingSelector from '../../components/Padding.js';

const SaveSelectedResource = ( { attributes } ) => {

	const {
		padding, blockId, category
	} = attributes;

	const blockProps = useBlockProps.save({
			className: 'selected-resources',
			id: blockId
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
							<div className="wp-block-buttons">
								<div className="wp-block-button">
									<a className="wp-block-button__link" href="/vehicles">See More</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}

export default SaveSelectedResource;