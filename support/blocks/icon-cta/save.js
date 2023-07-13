const { useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Icons from '../../components/Icons.js';

const SaveCTAIcon = ( { attributes } ) => {
		const {
			icons, title, link, bgSlug, iconSlug, altSlug
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'icon-cta'
		});
	
		return (
			<div {...blockProps}>
				{ (link != '') && (
					<a 
						className="icon-link"
						href={ link }
					>
						<Icons.View 
							rows={ icons }
							bgColor={ bgSlug }
							color={ iconSlug }
							altSlug={ altSlug }
							
						/>
						<Header.View 
							tag="h4"
							title={ title }
						/>
					</a>
				)}
				{ (link == '') && (
					<Fragment>
						<Icons.View 
							rows={ icons }
							bgColor={ bgSlug }
							color={ iconSlug }
							altSlug={ altSlug }
						/>
						<Header.View 
							tag="h4"
							title={ title }
						/>
					</Fragment>
				)}
			</div>
		);
}

export default SaveCTAIcon;