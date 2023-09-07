const { useBlockProps } = wp.blockEditor;
const { RichText, InnerBlocks } = wp.blockEditor;
const { __ } = wp.i18n;

const SaveHeader = ( { attributes }  ) => {

	const blockProps = useBlockProps.save({
			className: 'header triangles-grey'
	});
	return ( 
		<header { ...blockProps }>
			<div className="header-wrap">
				<InnerBlocks.Content />
			</div>
		</header>
	)
}

export default SaveHeader;