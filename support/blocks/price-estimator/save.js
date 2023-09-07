const { useBlockProps } = wp.blockEditor;
const { RichText, InnerBlocks } = wp.blockEditor;
const { __ } = wp.i18n;

const SavePrice = ( { attributes }  ) => {

	const blockProps = useBlockProps.save({
			className: 'filter-resources price-estimator'
	});
	return ( 
		<div { ...blockProps }>
			<div className="resources-block">
				<div className="block-wrapper">
						<InnerBlocks.Content />
				</div>
			</div>
		</div>
	)
}

export default SavePrice;