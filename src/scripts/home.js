import "./../styles/sass/main.scss";
import "./../assets/video/coffee-cook.mp4";

import * as burger from './burgerButton.js';
import * as carousel from './carousel.js';


// ---- BURGER MENU ----
burger.burgerButton.addEventListener('click', burger.changeBurgerMenu);
burger.menuLink.addEventListener('click', burger.changeBurgerMenu);
burger.navigationLinks.forEach((navLink) => {
  navLink.addEventListener('click', burger.hideBurgerMenu);
})

burger.body.addEventListener('click', burger.handlerBodyClick);



// ---- CARUSEL ----
document.addEventListener('DOMContentLoaded', carousel.createCoffeeCarusel);
window.addEventListener('load', carousel.setBeginSlide);

carousel.buttonLeft.addEventListener('click', carousel.goToPrevSlide);
carousel.buttonRight.addEventListener('click', carousel.goToNextSlide);
carousel.slide.addEventListener('touchstart', carousel.handleTouchStart);
carousel.slide.addEventListener('touchmove', carousel.handlerTouchMove);
carousel.slide.addEventListener('touchend', carousel.handlerTouchEnd);
carousel.slide.addEventListener('mousedown', carousel.stopSlider);
carousel.slide.addEventListener('mouseup', carousel.continueSlider);





