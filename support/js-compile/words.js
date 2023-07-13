function WordRotater() {
  var win = window;
  var words = document.querySelectorAll('.rotate-words');
  var winHeight = win.innerHeight;
  var intervals = [{}];

  if (words.length > 0) {
    words.forEach(function(word, index){
        intervals[index] = {};
    });
    win.addEventListener("load", detectScrollPosition);
    win.addEventListener("scroll", detectScrollPosition);
  }


  function detectScrollPosition() {
      
      winHeight = win.innerHeight;

      words.forEach(function(word, index){
        
        let rect = word.getBoundingClientRect();
        let elemTop = rect.top;
        let elemBottom = rect.bottom;
        let isVisible = (elemTop >= 0) && (elemBottom <= winHeight);
        let parent = word.parentElement;

        if (isVisible) {
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
          let interval;
          let paused = 0;
          let active = intervals[index].active;

          if (!intervals[index].hasInterval) {

            intervals[index].hasInterval = true;

            interval = setInterval(function(){
                if (paused === 0) {
                    word.classList.remove('highlight');
                    
                    let newWord = wordList[counter];
                    let newWordSize = newWord.length;
                    let internalCount = 0;
                    let uString = newWord.slice(0, letterCounter);
                    uString = uString.join('');
                    word.innerHTML = uString;
                    // let wordWidth = word.clientWidth;
                    // parent.style.width = 'calc(100% + ' + wordWidth + 'px)';
               
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
                    if (active === false) {
                        clearInterval(interval);
                        interval = undefined;
                    }
                } else if (paused === 1) {
                  setTimeout(function(){
                    paused = 0;
                  }, 200);
                }
            }, 70);
            
          }
        } 

      });
  }
}

WordRotater();