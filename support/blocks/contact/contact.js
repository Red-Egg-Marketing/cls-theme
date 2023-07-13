
// import { createObserver } from "./scroll.js";
window.addEventListener("load", (event) => {

  ContactSection();

}, false);


let prevRatio = 0.0;
let activeIntervals = [{}];
let origValues = [];

function ContactSection() {
	var contact = document.querySelectorAll('.contact-section');
		
	if (contact != null && contact.length > 0) {
		contact.forEach(function(section, index) {

			let test = createObserver(section);

		});

	}
}


function createObserver(boxElement) {
  let observer;
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);

  observer.observe(boxElement);

}


function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}


function handleIntersect(entries, observer) {
  entries.forEach((entry, index) => {
  	let contSect = entry.target;
  	let inView = entry.isIntersecting;

    if (inView && contSect != undefined && !contSect.classList.contains('active')) {

      contSect.classList.add('active');

    }

    prevRatio = entry.intersectionRatio;
    
  });

}

function rangeGenerate(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}