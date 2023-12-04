const tabsButtons = document.querySelectorAll('.tabs button')
const menuGrid = document.querySelector('.menu__grid')
let productsData


function setActiveTab(event) {
  const target = event.target !== document ? event.target : tabsButtons[0]
  if (target.classList.contains('active')) return

  for (let button of tabsButtons) {
    if (button.id === target.id || button.id === target.parentElement.id) {
      button.classList.add('active')
      setCurrentProducts(button.id)
    } else {
      button.classList.remove('active')
    }
  }
}



async function getProductsDataFromJSON() {
  const jsonPath = './../assets/jsons/products.json'
  const res = await fetch(jsonPath)
  productsData = await res.json()
}



function setCurrentProducts(currentProductId) {
  const productCards = document.querySelectorAll('.product-card')
  for (let card of productCards) {
    card.remove()
  }

  let insertProductsHTML = ''

  for (let product of productsData) {
    if (product.category === currentProductId) {
      const photo = product.name.toLowerCase().replaceAll(' ', '-')

      insertProductsHTML += `
      <div class="product-card">
        <img class="product-card__image" src="../assets/img/${photo}.jpg" alt="product image">
        <div class="product-card__description">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <h4>$${product.price}</h4>
        </div>
      </div>`
    }
  }
  menuGrid.insertAdjacentHTML('afterbegin', insertProductsHTML)
}



export {
  tabsButtons,
  setActiveTab,
  getProductsDataFromJSON
}