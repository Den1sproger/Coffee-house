const buttonLeft = document.querySelector('.slide-prev');
const buttonRight = document.querySelector('.slide-next');
const slide = document.querySelector('.slide');
const sliderControls = document.querySelector('.slider__content-controls');
const sliderInterval = 5000;
let currentSlideIndex = 0;
let startX = null;
let currentX = null;
let timePass;
let timerId;
let lastTime;
let timeLeft;
let currentProgressBar;



// get data about carusel coffee and add to HTML page
async function createCoffeeCarusel() {
  const jsonPath = './../assets/jsons/coffee-carusel.json';
  const res = await fetch(jsonPath);
  const data = await res.json();
  let insertSlideHtml = '<ul>';
  let insertControlsHtml = '';

  for (let i = 0; i < data.length; i++) {
    insertSlideHtml += `
    <li class="slide__content">
      <img src="../assets/img/${data[i].photoFileName}" alt="coffee-slider-${i + 1}">
      <div class="slide__content__description">
        <h4>${data[i].name}</h4>
        <p>${data[i].description}</p>
        <h4>${data[i].price}</h4>
      </div>
    </li>`;
    insertControlsHtml += `<div class="control"><div class="progress-bar"></div></div>`;
  }
  insertSlideHtml += '</ul>';

  slide.insertAdjacentHTML('afterbegin', insertSlideHtml);
  sliderControls.insertAdjacentHTML('afterbegin', insertControlsHtml);

  const listOfSlides = document.querySelector('.slide ul');
  listOfSlides.style.minWidth = `${100 * data.length}%`;
  
  startSlider();
}


// set first coffee slide after styles loading
function setBeginSlide() {
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars[currentSlideIndex].classList.toggle('active');
}



function setCoffeeSlide(slides, controls, oldSlideIndex) {
  clearTimeout(timerId);
  startSlider();

  // offset list of coffee slides
  startX = null;
  currentX = null;
  const listOfSlides = document.querySelector('.slide ul');
  const translate = (100 / slides.length) * currentSlideIndex;
  listOfSlides.style.transform = `translateX(-${translate}%)`;

  // disable old progress bar
  const oldBar = controls[oldSlideIndex];
  oldBar.classList.toggle('active');
  oldBar.style.transition = 'width 0s';
  oldBar.style.width = '0';

  // enable current progress bar
  const currentBar = controls[currentSlideIndex];
  currentBar.classList.toggle('active');
  currentBar.style.transition = `width ${sliderInterval / 1000 + 1}s`;
  currentBar.style.width = '100%';
}



function goToNextSlide() {
  const slideContents = document.querySelectorAll('.slide__content');
  const controls = document.querySelectorAll('.progress-bar');
  const oldSlide = currentSlideIndex;

  currentSlideIndex++;

  if (currentSlideIndex > slideContents.length - 1) {
    currentSlideIndex = 0;
  }
  setCoffeeSlide(slideContents, controls, oldSlide);
}



function goToPrevSlide() {
  const slideContents = document.querySelectorAll('.slide__content');
  const controls = document.querySelectorAll('.progress-bar');
  const oldSlide = currentSlideIndex;

  currentSlideIndex--;

  if (currentSlideIndex < 0) {
    currentSlideIndex = slideContents.length - 1;
  }
  setCoffeeSlide(slideContents, controls, oldSlide);
}



function handleTouchStart(event) {
  stopSlider();
  startX = event.touches[0].clientX;
}



function handlerTouchMove(event) {
  currentX = event.touches[0].clientX;
}



function handlerTouchEnd() {
  const screenMiddle = window.screen.width / 2;

  if (startX < screenMiddle && currentX > screenMiddle && currentX !== null) {
    goToPrevSlide();
  } else if (startX > screenMiddle && currentX < screenMiddle && currentX !== null) {
    goToNextSlide();
  } else {
    continueSlider();
  }

  startX = null;
  currentX = null;
}



// start the countdown before automatic switch to the next slide
function startSlider(interval=sliderInterval) {
  timePass = 0;
  timeLeft = 0;
  lastTime = Date.now();
  timerId = setTimeout(goToNextSlide, interval);
}



function stopSlider() {
  clearTimeout(timerId);
  timePass = timePass + Date.now() - lastTime;
  timeLeft = sliderInterval - timePass;

  // stop the progress bar
  currentProgressBar = document.querySelector('.progress-bar.active');
  currentProgressBar.classList.toggle('stop');
  currentProgressBar.style.width = getComputedStyle(currentProgressBar).width;
}



function continueSlider() {
  // continue the progress bar
  currentProgressBar.classList.toggle('stop');
  currentProgressBar.style.width = '100%';
  currentProgressBar.style.transition = `width ${timeLeft / 1000 + 1}s`;
  // start slider with the left time
  startSlider(timeLeft);
}



export {
  buttonLeft,
  buttonRight,
  slide,
  handleTouchStart,
  handlerTouchEnd,
  handlerTouchMove,
  createCoffeeCarusel,
  goToPrevSlide,
  goToNextSlide,
  setBeginSlide,
  stopSlider,
  continueSlider,
}