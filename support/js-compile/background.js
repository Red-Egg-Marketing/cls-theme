
// import { createObserverBG } from "./scroll.js";
window.addEventListener("load", (event) => {

  BackgroundChecker();

}, false);


let prevRatio = 0.0;

function BackgroundChecker() {
	var backgrounds = document.querySelectorAll('.bg-gradient');
		
	if (backgrounds != null && backgrounds.length > 0) {
		backgrounds.forEach(function(background) {
			let test = createObserverBG(background);

		});
	}
}


function createObserverBG(boxElement) {
  let observer;
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdListBG()
  };

  observer = new IntersectionObserver(handleIntersect, options);

  observer.observe(boxElement);

}


function buildThresholdListBG() {
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
  	let background = entry.target;
  	let inView = entry.isIntersecting;

	  if (inView) {
	    background.classList.add('active');
    } 

    prevRatio = entry.intersectionRatio;
    
  });


}