/**
 * File forms.js -
 */
( function( $ ) {

	$(document).on('gform/post_render', (event) => {
		if (event.detail.formId === 3) {
			document.addEventListener('change', (keypressEvent) => {
        		const target = keypressEvent.target;
        		const id = target.id;
				const value = target.value;
        		if (id == 'input_3_9') {
        			const grandParent = target.parentElement.parentElement;
        			const sibling = grandParent.nextElementSibling;
        			if (value == 'no preference' || value == '') {
        				sibling.classList.remove('hide-required');
        			} else {
        				sibling.classList.add('hide-required');
        			}
        		} 
    		});
    	} else {
    		return;
    	}
	});


}( jQuery ) );
