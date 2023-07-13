const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const SaveTab = ( { attributes } ) => {

		const {
			title, id
		} = attributes;
		
		const blockProps = useBlockProps.save({
			className: 'tab'
		});

		return (
			<Fragment>
				<div {...blockProps}>
					<input type="radio" id={ `tab-${ id }` } name="tab-group-1" />
					<label
						className="header-title"
						for={ `tab-${ id }` }
					>
						{ title }
					</label>
				</div>
				<div className="tab-container" data-toggled>
					<div className="content-cols">
						<InnerBlocks.Content />
					</div>
				</div>
			</Fragment>
		);
}

export default SaveTab;