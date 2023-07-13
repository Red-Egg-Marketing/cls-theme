require('es6-promise/auto');

(function() {

	function YosiSavings() {
		var calcForms = document.querySelectorAll('.form-savings');
		var TimeSaved = 15;
		var CostTime = 3.75;
		var CostInkPaper = 0.32;
		var RNoShow = 0.075;
		var averageNoShow = .2;
		var averagePerPat = 180;
		var noDays = 22;

		if (calcForms.length > 0 ) {
			calcForms.forEach(function(form){
				attachFormEvents(form);
			});
		}
	
		function attachFormEvents(form) {
			let rangeInputs = form.querySelectorAll('input[type="range"]');
			let numberInputs = form.querySelectorAll('input[type="number"]');

			rangeInputs.forEach(function(input){
				input.addEventListener('input', handleInputChange);
			});

			numberInputs.forEach(function(input){
				input.addEventListener('input', handleInputChange);
			});

			form.addEventListener('submit', calculateSavings);
			form.currentForm = form;
		}

		function calculateSavings(event) {

			event.preventDefault();

			let form = event.currentTarget.currentForm;
			let parent = form.closest('.savings-form');
			let formValues = new FormData(form);
  			let entries = Object.fromEntries(formValues);
			let displaySavings = parent.querySelector('.savings');
			let doctors = entries.doctors;
			let patients = entries.patients;
			let savings = formulateForSavings(patients, doctors);
			displaySavings.classList.add('activated');
			parent.classList.add('activated');
			let string = 'Based on Data from cls users, you would save <span class="highlight">' + savings + '</span> a month.';

			displaySavings.innerHTML = string;

		}

		function formulateForSavings(patients, doctors) {
			// Calculate Staff savings
			let staffSavings = patients * doctors * noDays * CostTime;

			// Ink & Paper savings
			let inkSavings = patients * doctors * noDays * CostInkPaper;

			// Calculate No-Show savings

			let noShowSavings = (((doctors * patients * noDays * averageNoShow) - (doctors * patients * noDays * (averageNoShow/(1 + RNoShow)))) * averagePerPat);

			let totalSavings = Math.round(staffSavings + inkSavings + noShowSavings);

			let savings = new Intl.NumberFormat(undefined, {style: 'currency', currency: 'USD', maximumSignificantDigits: 12}).format(totalSavings);

			return savings;
		}

		function handleInputChange(e) {
  			let target = e.target
  			if (e.target.type !== 'range') {
  			  // get sibling of range
  			  target = e.target.previousElementSibling;
  			} 
  			const min = target.min
  			const max = target.max
  			const val = target.value
  
  			target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
		}
	}

	YosiSavings();
	
})();