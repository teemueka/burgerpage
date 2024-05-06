// eslint-disable-next-line no-unused-vars
// noinspection ES6UnusedImports
import {generateHeader, updateCart} from '../default.js';
import {
  getRestaurants,
  createOrder,
  getProducts,
  getProductsById,
} from '../api.js';

const currentUser = JSON.parse(localStorage.getItem('user'));
const orderForm = document.getElementById('orderForm');
const restaurants = await getRestaurants();
const fromResDropdown = document.getElementById('fromRestaurant');
restaurants.forEach((restaurant) => {
  fromResDropdown.innerHTML += `<option value="${restaurant.id}">${restaurant.address}</option>`;
});
orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userID = currentUser.id;
  const userAddress = document.getElementById('userAddress').value;
  const userName = document.getElementById('userName').value;
  const orderType = document.getElementById('orderType').value;
  const fromRest = document.getElementById('fromRestaurant').value;
  const products = localStorage.getItem('cart');

  let hasErrors = false;

  if (!userAddress.trim()) {
    hasErrors = true;
    document.getElementById('address-error').innerHTML =
      '<p>order must contain address</p>';
  } else {
    document.getElementById('address-error').innerHTML = '';
  }

  if (!userName.trim()) {
    hasErrors = true;
    document.getElementById('username-error').innerHTML =
      '<p>order must contain name</p>';
  } else {
    document.getElementById('username-error').innerHTML = '';
  }

  if (!products) {
    hasErrors = true;
  }

  if (hasErrors) {
    return;
  }

  const orderData = {
    user_id: userID,
    res_id: fromRest,
    order_type: orderType,
    address: userAddress,
    products: products,
  };

  await createOrder(orderData);
});

const cartElement = document.getElementById('cart-items');
const totalCostElement = document.createElement('p');
totalCostElement.id = 'total-cost';
let totalPrice = 0;

const generateProductKey = (product) => {
  let key = `id:${product.id}`;

  if (product.added && product.added.length > 0) {
    const additions = product.added.sort().join(',');
    key += `|added:${additions}`;
  }

  if (product.removed && product.removed.length > 0) {
    const removals = product.removed.sort().join(',');
    key += `|removed:${removals}`;
  }
  return key;
};
const generateCart = async () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    return;
  }

  const productMap = {};

  const updateLocalCart = () => {
    const newCart = [];
    Object.entries(productMap).forEach(([key, {amount, details}]) => {
      for (let i = 0; i < amount; i++) {
        newCart.push(details);
      }
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  cart.forEach((item) => {
    const key = generateProductKey(item);
    if (productMap[key]) {
      productMap[key].amount++;
    } else {
      productMap[key] = {
        amount: 1,
        details: item,
      };
    }
  });

  cartElement.innerHTML = '';
  for (const key in productMap) {
    const entry = productMap[key];
    const product = await getProductsById(entry.details.id);
    const amount = entry.amount;
    console.log(product);

    totalPrice += product.price * amount;
    const productElement = document.createElement('div');
    productElement.classList.add('cart-item');

    const productImage = document.createElement('img');
    productImage.src = 'http://10.120.32.57/app/uploads/' + product.image;
    productImage.alt = product.name;

    const productName = document.createElement('h3');
    productName.innerText = product.name;

    const productPrice = document.createElement('p');
    productPrice.innerText = product.price;
    productPrice.classList.add('price');

    const productQuantity = document.createElement('p');
    productQuantity.innerText = amount;
    productQuantity.classList.add('quantity');

    const updateUI = () => {
      productQuantity.innerText = productMap[key].amount;
      totalCostElement.innerText = `Total Cost: ${totalPrice}`;
    };

    const button = document.createElement('button');
    button.textContent = '+';
    button.classList.add('good');
    button.addEventListener('click', async () => {
      totalPrice += product.price;
      productMap[key].amount++;
      updateLocalCart();
      updateCart();
      updateUI();
    });

    const buttonRemove = document.createElement('button');
    buttonRemove.textContent = '-';
    buttonRemove.classList.add('bad');
    buttonRemove.addEventListener('click', async () => {
      totalPrice -= product.price;
      productMap[key].amount--;
      if (productMap[key].amount === 0) {
        productElement.remove();
      }
      updateLocalCart();
      updateCart();
      updateUI();
    });

    const removeProduct = document.createElement('button');
    removeProduct.textContent = 'Remove';
    removeProduct.classList.add('verybad');
    removeProduct.addEventListener('click', async () => {
      productElement.remove();
      const amount = productMap[key].amount;
      for (let i = 0; i < amount; i++) {
        productMap[key].amount--;
        totalPrice -= product.price;
      }
      updateLocalCart();
      updateCart();
      updateUI();
    });

    productElement.appendChild(productImage);
    productElement.appendChild(productName);
    productElement.appendChild(productPrice);
    productElement.appendChild(productQuantity);
    productElement.appendChild(buttonRemove);
    productElement.appendChild(button);
    productElement.appendChild(removeProduct);

    cartElement.appendChild(productElement);
  }
  totalCostElement.innerText = `Total Cost: ${totalPrice}`;
  cartElement.appendChild(totalCostElement);
};

(async () => {
  await generateCart();
})();
