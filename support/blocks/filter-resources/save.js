const { useBlockProps } = wp.blockEditor;
const { RichText, InnerBlocks } = wp.blockEditor;
const { __ } = wp.i18n;

const SaveResources = ( { attributes }  ) => {

	const {
			taxonomies, anchor, mainTitle
	} = attributes;

	const blockProps = useBlockProps.save({
			className: 'filter-resources'
	});
	return ( 
		<div { ...blockProps }>
			<div className="resources-block">
				<div className="block-wrapper" id={anchor}>
					<header
						className="header triangles-grey"
					>
						<div className="header-wrap">
							<InnerBlocks.Content />
						</div>
					</header>
					<div className="resources-wrap" id="ResourcesWrap">
					</div>
				</div>
			</div>
		</div>
	)
}

export default SaveResources;