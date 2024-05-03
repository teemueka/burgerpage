// eslint-disable-next-line no-unused-vars
// noinspection ES6UnusedImports
import {generateHeader} from '../default.js';
import {getProducts, getProductsById} from '../api.js';

const allProducts = await getProducts();

const cartElement = document.getElementById('cart-items');
const totalCostElement = document.createElement('p');
totalCostElement.id = 'total-cost';
let totalPrice = 0;

const generateCart = async () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    return;
  }
  const productQuantities = {};
  for (const productId of cart) {
    if (productQuantities[productId]) {
      productQuantities[productId]++;
    } else {
      productQuantities[productId] = 1;
    }
  }
  cartElement.innerHTML = '';
  for (const item in productQuantities) {
    const product = await getProductsById(item);
    console.log(product);
    totalPrice += product.price * productQuantities[item];
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
    productQuantity.innerText = productQuantities[item];
    productQuantity.classList.add('quantity');

    const getCount = (p_id) => {
      const count = JSON.parse(localStorage.getItem('cart')) || [];
      const index = count.indexOf(product.id);
      return index > -1 ? count.filter((id) => id === p_id).length : 0;
    };
    const updateAmount = async () => {
      productQuantity.innerText = `${getCount(product.id)}`;
      totalCostElement.innerText = `Total Cost: ${totalPrice}`;
    };

    await updateAmount();

    const button = document.createElement('button');
    button.textContent = '+';
    button.classList.add('good');
    button.addEventListener('click', async () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product.id);
      localStorage.setItem('cart', JSON.stringify(cart));
      totalPrice += product.price;
      productQuantities[item]++;
      await updateAmount();
    });

    const buttonRemove = document.createElement('button');
    buttonRemove.textContent = '-';
    buttonRemove.classList.add('bad');
    buttonRemove.addEventListener('click', async () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const index = cart.indexOf(product.id);
      if (index > -1) {
        cart.splice(index, 1);
        totalPrice -= product.price;
        productQuantities[item]--;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      await updateAmount();
    });

    const removeProduct = document.createElement('button');
    removeProduct.textContent = 'Remove';
    removeProduct.classList.add('verybad');
    removeProduct.addEventListener('click', async () => {
      productElement.remove();
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const index = cart.indexOf(product.id);
      for (let i = 0; i < productQuantities[item]; i++) {
        cart.splice(index, 1);
        totalPrice -= product.price;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      await updateAmount();
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
