const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { Button, PanelBody } = wp.components;
const { InnerBlocks } = wp.blockEditor;
const { __ } = wp.i18n;


const EditWrap = ( { attributes, setAttributes } ) => {
	
		const {
			allowBlocks,
			className
		} = attributes;

		const blockProps = useBlockProps();

		return (
			<Fragment>
				<div {...blockProps}>
					<div className="extra-wrap">
						<InnerBlocks 
							allowedBlocks={allowBlocks}
							templateLock={false}
						/>
					</div>
				</div>
			</Fragment>
		);
}

export default EditWrap;