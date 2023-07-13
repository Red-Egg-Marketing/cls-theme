window.addEventListener("load", (event) => {

  LottieIconLoader();

}, false);


let prevRatio = 0.0;

function LottieIconLoader() {
  var icons = document.querySelectorAll('lord-icon');
    
  if (icons != null && icons.length > 0) {
    icons.forEach(function(background) {
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
    let icon = entry.target;
    let inView = entry.isIntersecting;

    if (inView) {

       if (!icon.classList.contains('lottie-loaded')) {
          let path = icon.getAttribute('src');

          lottie.loadAnimation({
            container: icon, // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: path, // the path to the animation json
            rendererSettings: {
              hideOnTransparent: false 
            }
          });
        }
        icon.classList.add('lottie-loaded');

    }

    prevRatio = entry.intersectionRatio;
    
  });


}