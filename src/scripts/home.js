import "./../styles/sass/main.scss"
import "./../assets/img/about-1.jpg"
import "./../assets/img/about-2.jpg"
import "./../assets/img/about-3.jpg"
import "./../assets/img/about-4.jpg"
import "./../assets/img/coffee-slider-1.png"
import "./../assets/img/coffee-slider-2.png"
import "./../assets/img/coffee-slider-3.png"
import "./../assets/img/logo.png"
import "./../assets/img/mobile-screens.png"
import "./../assets/svg/coffee-cup.svg"
import "./../assets/img/favicon.ico"
import "./../assets/video/coffee-cook.mp4"

import * as burger from './burgerButton.js'



// ---- BURGER MENU ----
burger.burgerButton.addEventListener('click', burger.changeBurgerMenu)
burger.menuLink.addEventListener('click', burger.changeBurgerMenu)

for (let navLink of burger.navigationLinks) {
  navLink.addEventListener('click', burger.changeBurgerMenu)
}

burger.body.addEventListener('click', burger.handlerBodyClick)





