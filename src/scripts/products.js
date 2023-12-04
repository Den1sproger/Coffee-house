const tabsButtons = document.querySelectorAll('.tabs button')
const menuGrid = document.querySelector('.menu__grid')
const refreshButton = document.querySelector('.refresh')
let productCurrentShow = 5
let currentProductCount
let productsData



function setActiveTab(event) {
  const target = event.target !== document ? event.target : tabsButtons[0]
  if (target.classList.contains('active')) return

  for (let button of tabsButtons) {
    if (button.id === target.id || button.id === target.parentElement.id) {
      button.classList.add('active')
      setCurrentProducts(button.id)
      checkRefreshButton()
    } else {
      button.classList.remove('active')
    }
  }
  currentProductCount = 0
}



async function getProductsDataFromJSON() {
  const jsonPath = './../assets/jsons/products.json'
  const res = await fetch(jsonPath)
  productsData = await res.json()
  checkRefreshButton()
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
    currentProductCount++
  }
  menuGrid.insertAdjacentHTML('afterbegin', insertProductsHTML)
}



function checkRefreshButton() {
  const productCards = document.querySelectorAll('.product-card')
  if (productCards.length <= 4) {
    refreshButton.classList.add('hidden')
  } else {
    refreshButton.classList.remove('hidden')
  }
}



function showOtherProducts() {
  const nextProducts = document.querySelectorAll(
    `.product-card:nth-child(n+${productCurrentShow}):nth-child(-n+${productCurrentShow + 3})`
  )
  for (let product of nextProducts) {
    product.style.display = 'flex'
  }

  if (productCurrentShow + 3 >= currentProductCount) {
    refreshButton.classList.add('hidden')
  } else {
    productCurrentShow += 4
  }
}



export {
  tabsButtons,
  refreshButton,
  setActiveTab,
  getProductsDataFromJSON,
  checkRefreshButton,
  showOtherProducts
}