const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button, RangeControl, RadioControl } = wp.components;
const { __ } = wp.i18n;

const SaveSavingsForm = ( { attributes } ) => {

		const blockProps = useBlockProps.save({
			className: 'savings-form'
		});

		let savings = false;
	
		return (
			<div {...blockProps}>
				<div className="col">
					<InnerBlocks.Content />
				</div>
				<div className="col">
					<form className="form-savings">
						<div className="input-wrap">
							<label className="label-block" for="doctors">{ __('How many doctors are in your clinic?', 'cls-blocks') }</label>
							<input
								type="range"
								id="doctors"
								name="doctors"
								min="1"
								value="1"
								max="100"
								oninput="doctorsnumber.value=value"
								required
							/>
							<input
								type="number"
								id="doctorsnumber"
								name="doctors-number"
								min="1"
								value="1"
								max="100"
								oninput="doctors.value=value"
								required
							/>
						</div>
						<div className="input-wrap">
							<label className="label-block" for="patients">{ __('How many patients per provider per day?', 'cls-blocks') }</label>
							<input
								type="range"
								id="patients"
								name="patients"
								min="1"
								value="1"
								max="35"
								oninput="patientsnumber.value=value"
								required
							/>
							<input
								type="number"
								id="patientsnumber"
								name="patients-number"
								min="1"
								value="1"
								max="35"
								oninput="patients.value=value"
								required
							/>
						</div>

						<div className="submit-wrap">
							<input type="submit" className="wp-block-button__link">Submit</input>
						</div>
					</form>
				</div>
				<p className="savings">Savings Text</p>
			</div>
		);
}

export default SaveSavingsForm;