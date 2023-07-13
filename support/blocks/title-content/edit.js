const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';


// Available alignment control options
const alignOptions = [
	{
        label: __( 'Image Right' ),
        value: 'img-right',
    },
    {
        label: __( 'Image Left' ),
        value: 'img-left',
    },
];

const template = [
	[
		'core/buttons', {},
		[
			[
				'core/button'
			]
		]
	]
]


const EditTitleContent = ( { attributes, setAttributes } ) => {
		const {
			title, content
		} = attributes;

		const blockProps = useBlockProps({
			className: 'title-content'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">
							<div className="wrap">
								<Header
									tag="h3"
									title={ title }
									setAttributes={ setAttributes }
								/>
								<Content 
									tag="div"
									content={ content }
									multiline="p"
									classProp="content"
									setAttributes={ setAttributes }
								/>
								<InnerBlocks
									template={ template }
									allowedBlocks={['core/buttons']}
								/>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditTitleContent;