// eslint-disable-next-line no-unused-vars
// noinspection ES6UnusedImports
import {generateHeader} from '../default.js';
import {getRestaurants, createOrder} from '../api.js';

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
