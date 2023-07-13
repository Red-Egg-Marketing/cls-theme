
// import { createObserver } from "./scroll.js";
window.addEventListener("load", (event) => {

  WordRotater();

}, false);


let prevRatio = 0.0;
let activeIntervals = [{}];

function WordRotater() {
	var words = document.querySelectorAll('.rotate-words');

	if (words != null && words.length > 0) {
		words.forEach(function(word) {
      createObserver(word);
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
  	let word = entry.target;
  	let inView = entry.isIntersecting;
    console.log('it is ' + entry.isIntersecting);
	  if (inView) {
		  activeIntervals[index].isActive = true;
		  activeIntervals[index].word = word;
	  } else if (!inView) {
		  activeIntervals[index].isActive = false;
	  }

    prevRatio = entry.intersectionRatio;
    
  });

  activeIntervals.forEach((active, index) => {
  	
  	let word = active.word;

    if (word != undefined) {
  	  let wordList = word.getAttribute('words');
      if (wordList.length > 0) {
  	   wordList = wordList.split(',');
      }

      wordList.forEach((word, index) => {
        wordArray = word.split('');
        wordList[index] = wordArray;
      });


  	 let counter = 0;
     let letterCounter = 0;
  	 let size = wordList.length;
  	 let hasInterval = activeIntervals[index].interval;
     let interval;
     let paused = 0;

  	 if (hasInterval == undefined) {
  	 	let interval = setInterval(function(){
          
          if (paused === 0) {
              word.classList.remove('highlight');
              
              let newWord = wordList[counter];
              let newWordSize = newWord.length;
              let internalCount = 0;
              let uString = newWord.slice(0, letterCounter);
              uString = uString.join('');
              word.innerHTML = uString;
               
              if (letterCounter == newWordSize) {

                counter = counter < (size - 1)  ? counter + 1 : 0;
                letterCounter = 0;
                paused = false;
                word.classList.add('waiting');
                setTimeout(function(){
                  word.classList.add('highlight');
                  paused = 1;

                }, 1500);
              }


              letterCounter = letterCounter < (newWordSize) ? letterCounter + 1 : 0;
              if (active.isActive === false) {
                  console.log('just clear this thing');
                  clearInterval(interval);
                  activeIntervals[index].interval = undefined;
              }
          } else if (paused === 1) {
            setTimeout(function(){
              paused = 0;
            }, 200);
          }

        
  	 	}, 70);
        activeIntervals[index].interval = interval;
      }
    }

  });

}