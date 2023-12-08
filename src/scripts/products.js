const tabsButtons = document.querySelectorAll('.tabs button');
const menuGrid = document.querySelector('.menu__grid');
const refreshButton = document.querySelector('.refresh');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');
let productCurrentShow = 5;
let currentProductCount;
let productsData;

// modal variables
const modalPhoto = document.querySelector('.modal .product-card__image');
const modalName = document.querySelector('#modal-name');
const modalDescription = document.querySelector('#modal-desc');
const modalSizes = document.querySelectorAll('.size__tabs .tab__button');
const modalAdditivies = document.querySelectorAll('.additives__tabs .tab__button');
const modalPrice = document.querySelector('.total__price');
const closeButton = document.querySelector('.close');
let currentModalSize = 's';
let currentModalIndex;
let currentModalPrice;




function setActiveTab(event) {
  const target = event.target !== document ? event.target : tabsButtons[0];
  if (target.classList.contains('active')) return;

  for (let button of tabsButtons) {
    if (button.id === target.id || button.id === target.parentElement.id) {
      button.classList.add('active');
      setCurrentProducts(button.id);
      checkRefreshButton();
    } else {
      button.classList.remove('active');
    }
  }
  currentProductCount = 0;
}



async function getProductsDataFromJSON() {
  const jsonPath = './../assets/jsons/products.json';
  const res = await fetch(jsonPath);
  productsData = await res.json();
  checkRefreshButton();
}



function setCurrentProducts(currentProductId) {
  // remove old cards
  const oldProductCards = document.querySelectorAll('.product-card');
  for (let card of oldProductCards) {
    card.removeEventListener('click', selectProduct);
    card.remove();
  }

  // set new cards
  let insertProductsHTML = '';

  for (let product of productsData) {
    if (product.category === currentProductId) {
      const photo = product.name.toLowerCase().replaceAll(' ', '-');

      insertProductsHTML += `
      <div class="product-card">
        <img class="product-card__image" src="../assets/img/${photo}.jpg" alt="product image">
        <div class="product-card__description">
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <h4>$${product.price}</h4>
        </div>
      </div>`;
    }
    currentProductCount++;
  }
  menuGrid.insertAdjacentHTML('afterbegin', insertProductsHTML);

  // add new event listeners
  const newProductsCards = document.querySelectorAll('.product-card');
  newProductsCards.forEach((card) => {
    card.addEventListener('click', selectProduct);
  })
}



function checkRefreshButton() {
  const productCards = document.querySelectorAll('.product-card');
  if (productCards.length <= 4) {
    refreshButton.classList.add('hidden');
  } else {
    refreshButton.classList.remove('hidden');
  }
}



function showOtherProducts() {
  const nextProducts = document.querySelectorAll(
    `.product-card:nth-child(n+${productCurrentShow}):nth-child(-n+${productCurrentShow + 3})`
  )
  for (let product of nextProducts) {
    product.style.display = 'flex';
  }

  if (productCurrentShow + 3 >= currentProductCount) {
    refreshButton.classList.add('hidden');
  } else {
    productCurrentShow += 4;
  }
}



function selectProduct(event) {
  const prodCard = event.target.closest('.product-card');
  const productName = prodCard.querySelector('h4').textContent;

  for (let i = 0; i < productsData.length; i++) {
    const product = productsData[i];

    if (product.name === productName) {
      currentModalIndex = i;
      currentModalPrice = Number(product.price);

      const photo = product.name.toLowerCase().replaceAll(' ', '-');
      modalPhoto.src = `./../assets/img/${photo}.jpg`;
      modalName.textContent = product.name;
      modalDescription.textContent = product.description;
      modalPrice.textContent = `$${product.price}`;

      for (let sizeBtn of modalSizes) {
        const span = sizeBtn.querySelector('span');
        span.textContent = product.sizes[sizeBtn.id].size;
      }
      modalSizes[0].classList.add('active');

      for (let i = 0; i < modalAdditivies.length; i++) {
        const addBtn = modalAdditivies[i];
        addBtn.querySelector('span').textContent = product.additives[i].name;
      }
      break;
    }
  }

  backdrop.classList.remove('hidden');
  modal.classList.remove('hidden');
  body.classList.add('lock');
}



function unselectProduct() {
  currentModalSize = 's';
  modalSizes.forEach((size) => {
    size.classList.remove('active');
  })
  modalAdditivies.forEach((size) => {
    size.classList.remove('active');
  })
  backdrop.classList.add('hidden');
  modal.classList.add('hidden');
  body.classList.remove('lock');
}



function setModalSize(event) {
  const button = event.target.closest('.tab__button');
  if (button.classList.contains('active')) return;
    
  for (let size of modalSizes) {
    if (size.id === button.id) {
      size.classList.add('active');
      const sizePrice = Number(
        productsData[currentModalIndex].sizes[size.id]['add-price']
      );
      currentModalPrice += sizePrice;

    } else if (size.id === currentModalSize) {
      size.classList.remove('active');
      const sizePrice = Number(
        productsData[currentModalIndex].sizes[size.id]['add-price']
      );
      currentModalPrice -= sizePrice;
    }
  }
  currentModalSize = button.id;
  modalPrice.textContent = `$${currentModalPrice.toFixed(2)}`;
}



function setModalAdditive(event) {
  const button = event.target.closest('.tab__button');

  if (button.classList.contains('active')) {
    const addPrice = Number(
      productsData[currentModalIndex].additives[button.tabIndex]['add-price']
    );
    currentModalPrice -= addPrice;
  } else {
    const addPrice = Number(
      productsData[currentModalIndex].additives[button.tabIndex]['add-price']
    );
    currentModalPrice += addPrice;
  }
  button.classList.toggle('active');
  modalPrice.textContent = `$${currentModalPrice.toFixed(2)}`;
}



export {
  tabsButtons,
  refreshButton,
  backdrop,
  closeButton,
  modalSizes,
  modalAdditivies,
  setActiveTab,
  getProductsDataFromJSON,
  checkRefreshButton,
  showOtherProducts,
  unselectProduct,
  setModalSize,
  setModalAdditive
}