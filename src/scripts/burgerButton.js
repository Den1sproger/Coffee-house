const burgerButton = document.querySelector('.burger')
const navigation = document.querySelector('nav')
const navigationLinks = document.querySelectorAll('.nav__link')
const menuLink = document.querySelector('.menu-page')
const body = document.querySelector('body')



function changeBurgerMenu() {
  burgerButton.classList.toggle('active')
  navigation.classList.toggle('active')
  menuLink.classList.toggle('active')
  body.classList.toggle('lock')
}


function handlerBodyClick(event) {
  const target = event.target

  const isBurger = target == burgerButton || burgerButton.contains(target)
  const isNavMenu = target == navigation || navigation.contains(target)
  const isMenuLink = target == menuLink || menuLink.contains(target)
  const isActive = navigation.className === 'active'

  if (!isNavMenu && !isBurger && !isMenuLink && isActive) {
    changeBurgerMenu()
  }
}



export {
  burgerButton,
  body,
  menuLink,
  navigationLinks,
  changeBurgerMenu,
  handlerBodyClick
}