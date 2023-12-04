import "./../styles/sass/main.scss"
import * as burger from './burgerButton.js'
import * as products from './products.js'



// ---- BURGER MENU ----
burger.burgerButton.addEventListener('click', burger.changeBurgerMenu)
burger.menuLink.addEventListener('click', burger.changeBurgerMenu)
burger.navigationLinks.forEach((navLink) => {
  navLink.addEventListener('click', burger.changeBurgerMenu)
})

burger.body.addEventListener('click', burger.handlerBodyClick)



// ---- MENU SECTION ----
document.addEventListener('DOMContentLoaded', products.getProductsDataFromJSON)
window.addEventListener('load', products.setActiveTab)
products.tabsButtons.forEach((button) => {
  button.addEventListener('click', products.setActiveTab)
})
products.refreshButton.addEventListener('click', products.showOtherProducts)