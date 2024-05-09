// eslint-disable-next-line no-unused-vars
// noinspection ES6UnusedImports
import {generateHeader, updateCart} from '../default.js';
import {
  getRestaurants,
  createOrder,
  getProductsById,
  getIngredients,
  getCurrentUser,
} from '../api.js';

const currentUser = JSON.parse(localStorage.getItem('user'));
const order = document.getElementById('info-order');
const restaurants = await getRestaurants();

const user = await getCurrentUser();
console.log(user);
if (!user) {
  order.innerHTML = '';
  const orderLog = document.createElement('button');
  orderLog.className = 'noUser';
  orderLog.innerText = 'Log in to order';
  orderLog.addEventListener('click', () => {
    window.location = '../profile/profile.html';
  });
  order.appendChild(orderLog);
} else {
  const orderForm = document.createElement('form');
  orderForm.method = 'POST';
  orderForm.innerHTML = `
      <div class="input-control">
        <label for="userAddress">address</label>
        <input id="userAddress" type="text">
        <div class="error" id="address-error"></div>
      </div>
      <div class="input-control">
        <label for="userName">name</label>
        <input id="userName" type="text">
        <div class="error" id="username-error"></div>
      </div>
      <div class="input-control">
        <label for="orderType">order type</label>
        <select id="orderType">
          <option value="pickup">pickup</option>
          <option value="delivery">delivery</option>
          <option value="dine-in">dine-in</option>
        </select>
        <div class="error" id="type-error"></div>
      </div>
      <div class="input-control">
        <label for="fromRestaurant">select restaurant</label>
        <select id="fromRestaurant"></select>
        <div class="error" id="fromRes-error"></div>
      </div>
      <button id="orderBtn" type="submit">Order</button>
      <div class="success"></div>`;
  order.appendChild(orderForm);

  const fromResDropdown = document.getElementById('fromRestaurant');

  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userID = currentUser.id;
    const userAddress = document.getElementById('userAddress').value;
    const userName = document.getElementById('userName').value;
    const orderType = document.getElementById('orderType').value;
    const fromRest = document.getElementById('fromRestaurant').value;
    const products = JSON.parse(localStorage.getItem('cart'));

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

    const order = await createOrder(orderData);
    if (order) {
      document.querySelector('.success').innerHTML =
        '<p>Order sent successfully!</p>';
    } else {
      document.querySelector('.success').innerHTML = '';
    }
  });

  restaurants.forEach((restaurant) => {
    fromResDropdown.innerHTML += `<option value="${restaurant.id}">${restaurant.address}</option>`;
  });
}

const cartElement = document.getElementById('cart-items');
const totalCostElement = document.createElement('p');
totalCostElement.id = 'total-cost';
let totalPrice = 0;

/**
 * This method generates unique product identifiers.
 * @param {object} product
 * @return {string} product identifier.
 */
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

/**
 * This method compares list of ingredient id's and finds corresponding name for it.
 * @param {array} idList array consisting of ingredient id's
 * @param {string} type determines if plus or minus signs should be added to the string.
 * @return {Promise<string>} returns string of removed or added ingredients.
 */
const compareIdToIngredient = async (idList, type) => {
  let compared = '';
  const ingredients = await getIngredients();

  idList.forEach((id) => {
    const ingredient = ingredients.find((ingredient) => ingredient.id === id);
    if (ingredient) {
      type === 'added' ? (compared += `+ ${ingredient.name}\n`) : '';
      type === 'removed' ? (compared += `- ${ingredient.name}\n`) : '';
    }
  });

  return compared.trim();
};

/**
 * This method handles the generation of orders displayed to user and all
 * the modifications user makes during the ordering process.
 * @return {Promise<void>}
 */
const generateCart = async () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    return;
  }

  const productMap = {};

  /**
   * This method updates localstorage cart every time user makes changes during the ordering process.
   */
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

    totalPrice += product.price * amount;
    const productElement = document.createElement('div');
    productElement.classList.add('cart-item');

    const productImage = document.createElement('img');
    productImage.src = 'http://10.120.32.57/app/uploads/' + product.image;
    productImage.alt = product.name;

    const productInfo = document.createElement('div');
    productInfo.id = 'productInfo-control';

    const productName = document.createElement('h3');
    productName.innerText = product.name;

    const productPrice = document.createElement('p');
    productPrice.innerText = product.price + '€';
    productPrice.classList.add('price');

    const infoDiv = document.createElement('div');
    infoDiv.id = 'infoDiv';

    const toolTip = document.createElement('div');
    toolTip.className = 'toolTip';
    toolTip.innerText = 'modifications';

    const addedText = await compareIdToIngredient(entry.details.added, 'added');
    const removedText = await compareIdToIngredient(
      entry.details.removed,
      'removed'
    );

    if (!addedText && !removedText) {
      infoDiv.classList.add('empty');
    }

    const added = document.createElement('p');
    added.className = 'toolTipText';
    added.innerText = addedText;

    const removed = document.createElement('p');
    removed.className = 'toolTipText';
    removed.innerText = removedText;

    toolTip.appendChild(added);
    toolTip.appendChild(removed);
    infoDiv.appendChild(toolTip);

    const productQuantity = document.createElement('p');
    productQuantity.innerText = 'x' + amount;
    productQuantity.classList.add('quantity');

    /**
     * This method updated order items UI amount and total cost elements.
     */
    const updateUI = () => {
      productQuantity.innerText = 'x' + productMap[key].amount;
      totalCostElement.innerText = `Total Cost: ${totalPrice}` + '€';
    };

    const orderBtnControl = document.createElement('div');
    orderBtnControl.className = 'orderBtn-control';

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

    orderBtnControl.appendChild(button);
    orderBtnControl.appendChild(buttonRemove);
    orderBtnControl.appendChild(removeProduct);
    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);
    productElement.appendChild(productImage);
    productElement.appendChild(productInfo);
    productElement.appendChild(infoDiv);
    productElement.appendChild(productQuantity);
    productElement.appendChild(orderBtnControl);

    cartElement.appendChild(productElement);
  }
  totalCostElement.innerText = `Total Cost: ${totalPrice}` + '€';
  cartElement.appendChild(totalCostElement);
};

(async () => {
  await generateCart();
})();
