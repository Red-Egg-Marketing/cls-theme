
// import { createObserverStat } from "./scroll.js";
window.addEventListener("load", (event) => {

  StatAnimation();

}, false);


let prevRatio = 0.0;
let activeIntervals = [{}];
let origValues = [];

function StatAnimation() {
	var stats = document.querySelectorAll('.stat .header-title');
		
	if (stats != null && stats.length > 0) {
		stats.forEach(function(word, index) {

			let test = createObserverStat(word);

		});

	}
}


function createObserverStat(boxElement) {
  let observer;
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdListStat()
  };

  observer = new IntersectionObserver(handleIntersect, options);

  observer.observe(boxElement);

}


function buildThresholdListStat() {
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
  	let stat = entry.target;
  	let inView = entry.isIntersecting;

    if (inView && stat != undefined && !stat.classList.contains('active')) {

      let text = entry.target.getAttribute('origvalue');
      let number = text.match(/(\d+)/);
      let symbol = text.match(/(^\D+|\D+$)/);

      stat.classList.add('active');

      if (number) {
        entry.target.innerHTML = '&nbsp;';
        number = number[0];
        number = parseInt(number);
        let range = rangeGenerate(number + 1);
        let size = range.length;
        let base = size < 20 ? 1 : 20;
        let step = (Math.floor(size/base));
        let count = 0;
        let time = 35;
        let interval = setInterval(function(){
        
          if ((size -1) <= count) {
            clearInterval(interval);
          }

          let updateCount = new Intl.NumberFormat().format(range[count]);         

          if (symbol && symbol.index == 0) {
            entry.target.innerHTML = symbol[0] + updateCount;
          } else if(symbol && symbol.index != 0) {
            entry.target.innerHTML = updateCount + symbol[0];
          }
          else {
            entry.target.innerHTML = updateCount;
          }

          count = (count + step) < size ? (count + step) : size - 1;

            
       }, time);

      }

    }

    prevRatio = entry.intersectionRatio;
    
  });

}

function rangeGenerate(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}