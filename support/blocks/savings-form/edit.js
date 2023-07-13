const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, RangeControl, RadioControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['core/heading', {'level' : 2, 'placeholder' : 'Intro text...'}],
	['core/paragraph', {'placeholder' : 'CTA intro text....'}],
];

const EditSavingsForm = ( { attributes, setAttributes } ) => {

		const [ clinic, setClinic ] = useState( 'Primary Care' );
		const [ doctors, setDoctors ] = useState( 10 );
		const [ patients, setPatients ] = useState( 10 );
		const [ savings, setSavings ] = useState(false);

		const displaySavings = () => {

			let savings = doctors * patients;
			setSavings('You can save up to $' + savings + '.');
		}
	
		const blockProps = useBlockProps({
			className: 'savings-form'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<div className="col">
						<InnerBlocks
							template={ template }
							allowedBlocks={ ['core/heading', 'core/paragraph'] }
						/>
					</div>
					<div className="col">
						<form className="form-savings">
							<div className="input-wrap">
								<RangeControl 
									initialPosition={ 10 }
									label={__('How many doctors are in your clinic?', 'cls-blocks')}
									value={ doctors }
									min={ 1 }
									max={ 100 }
									onChange={ (value) => {
										setDoctors(value);
										displaySavings();
									}}
								/>
							</div>
							<div className="input-wrap">
								<RangeControl 
									initialPosition={ 10 }
									label={__('How many patients per provider per day?', 'cls-blocks')}
									value={ patients }
									min={ 1 }
									max={ 35 }
									onChange={ (value) => {
										setPatients(value);
										displaySavings();
									}}
								/>
							</div>
							
						</form>
					</div>
					{ savings != false && (
						<p className="savings">{ savings }</p>
					)}
				</div>
			</Fragment>
		);
}

export default EditSavingsForm;