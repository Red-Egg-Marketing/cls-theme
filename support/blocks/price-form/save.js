const { useBlockProps } = wp.blockEditor;
const { RichText, InnerBlocks } = wp.blockEditor;
const { __ } = wp.i18n;

const SaveForm = ( { attributes }  ) => {

	const blockProps = useBlockProps.save({
			className: 'resources-wrap'
	});

	return ( 
		<div { ...blockProps }>
			<div className="resources-grid">
				<div className="form-wrap">
					<InnerBlocks.Content />
					<form id="PriceCalculator">
						<div className="form-row">
							<label for="price_max">Price</label>
								<input 
									type="number"
									id="price"
									name="price_max"
									placeholder="$30,000"
								/>
						</div>
						<div className="form-row">
							<label for="down">Down Payment</label>
							<input 
								type="number"
								id="down"
								name="down"
								placeholder="$1,000"
							/>
						</div>
						<div className="form-row">
							<label for="apr">A.P.R (estimated financing rate)</label>
							<input
								type="number"
								id="apr"
								value="7.2"
								name="apr"
								min="0"
								max="100"
								step="0.1"
							/>
						</div>
						<div className="form-row">
							<label for="term">Term</label>
							<select id="term" name="term">
								<option value="12">12 Months</option>
								<option value="24">24 Months</option>
								<option value="36">36 Months</option>
								<option value="48">48 Months</option>
								<option value="60">60 Months</option>
								<option value="72" selected>72 Months</option>
								<option value="84">84 Months</option>
							</select>
						</div>
						<div className="form-row form-footer">
							<input type="submit" className="wp-block-button__link" value="Calculate Payment" />
						</div>
					</form>
				</div>
				<div className="resources resources-wrap" id="PaymentVehicles">
				</div>
			</div>
		</div>
	)
}

export default SaveForm;