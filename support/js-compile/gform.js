function gfromWrapperFunction() {
	let apiUrl  = '/wp-json/cls/v2/vehicles';

	jQuery(document).on('gform_post_render', function(event, form_id, current_page){
 		let forms = event.target.forms;
 		window.addEventListener('click', clickTracker);
		Object.keys(forms).forEach((key) => {
			let form = forms[key];
			let inputs = form.elements;
			Object.keys(inputs).forEach((key) => {
				let input = inputs[key];
				if (input.classList.contains('vehicle-selector')){
					input.addEventListener('input', checkVehicles);
					let button = input.nextSibling.nextSibling;
					button.addEventListener('click', removeValue, false);
					button.sibInput = input;
				}
			});
		});	
 
    });

	function clickTracker(event) {
		let child = checkParent(window.appender, document.activeElement);
		if (child == false && typeof window.appender != "undefined") window.appender.classList.remove('active');
	}

    function removeValue(event) {
    	let target = event.target;
    	let input = target.sibInput;
    	input.value = '';
    	event.preventDefault();

    }

    function checkParent(parent, child) {
    	if (typeof parent != "undefined" && parent.contains(child))
        	return true;
        	return false;
	}

	function checkVehicles(event) {

		let search = event.target.value;

		if (search.length > 3) {
			sendAPIrequest(search, event.target)
		}
		
	}

	function keyUpdateValue(event) {
		let input = window.currentInput;
		let appender = window.appender;
		if (event.key === 'Enter') {
			let focus = document.activeElement;
			let value = focus.innerText;
			let append = input.input;
			append.value = value;
			appender.classList.remove('active');
			window.removeEventListener('keydown', keyUpdateValue);
		}
	}

	function updateValue(event) {
		let target = event.target;
		let append = target.append;
		let value = event.target.innerText;
		let input = target.input;
		input.value = value;
		append.classList.remove('active');

	}


	function sendAPIrequest(search, target) {
		let string = '?search=' + search;
		wp.apiRequest({
        	url: apiUrl + string,
        	method: 'GET',
    	})
    	.then(resourcelist => {
    		let resources = resourcelist;
    		let empty = resourcelist.empty;
    		let append = target.nextElementSibling;
    		if (empty == false) {
    			append.innerHTML = '';
    			let cars = resources[0].resources;
    			cars.forEach((car) => {
    				append.classList.add('active');
    				let div = document.createElement('div');
    				div.setAttribute('class', 'result');
    				let p = document.createElement('p');
    				p.setAttribute('tabindex', 0);
    				p.innerHTML = car.year + ' ' + car.post_title + ' (' + car.miles + ')';
    				div.append(p);
    				append.append(div);
    				p.addEventListener('click', updateValue, false);
    				window.addEventListener('keydown', keyUpdateValue, false);
    				window.currentInput = p;
    				window.appender = append;
    				p.append = append;
    				p.input = target;

    			});
    		}

    	}).catch( error => {
    		console.log(error);
    	});
	}


}

gfromWrapperFunction();

