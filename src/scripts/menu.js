import "./../styles/sass/main.scss"
import * as burger from './burgerButton.js'
import * as products from './products.js'



// ---- BURGER MENU ----
burger.burgerButton.addEventListener('click', burger.changeBurgerMenu)
burger.menuLink.addEventListener('click', burger.changeBurgerMenu)

for (let navLink of burger.navigationLinks) {
  navLink.addEventListener('click', burger.changeBurgerMenu)
}

burger.body.addEventListener('click', burger.handlerBodyClick)



// ---- MENU SECTION ----
document.addEventListener('DOMContentLoaded', products.getProductsDataFromJSON)
window.addEventListener('load', products.setActiveTab)
for (let button of products.tabsButtons) {
  button.addEventListener('click', products.setActiveTab)
}