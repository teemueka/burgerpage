// eslint-disable-next-line no-unused-vars
// noinspection ES6UnusedImports
import {generateHeader} from '../default.js';

(async () => {
  const response = await (
    await fetch('http://10.120.32.57/app/api/v1/products')
  ).json();
  for (const product of response) {
    if (!product.categories) {
      continue;
    }
    console.log(product.categories);
    product.categories.forEach((categoryl) => {
      if (
        categoryl.name === 'burger' ||
        categoryl.name === 'side' ||
        categoryl.name === 'dessert'
      ) {
        console.log(`'${categoryl.name}'`);
        const category = document.getElementById(categoryl.name);
        if (!category) {
          console.log(`No element found with ID '${categoryl.name}'`);
          return;
        }

        console.log(product);
        const div = document.createElement('div');
        div.classList.add('menu-item');

        const img = document.createElement('img');
        img.src = `http://10.120.32.57/app/uploads/${product.image}`;

        const h5 = document.createElement('h5');
        h5.textContent = `${product.name}`;
        const price = document.createElement('p');
        price.textContent = `${product.price}€`;
        const p = document.createElement('p');
        p.textContent = `${product.ingredients ? product.ingredients.map((ingredient) => ingredient.name).join(', ') : ''}`;

        const addToCartBox = document.createElement('div');

        const amount = document.createElement('p');
        amount.id = 'amount';

        const getCount = (p_id) => {
          const count = JSON.parse(localStorage.getItem('cart')) || [];
          const index = count.indexOf(product.id);
          return index > -1 ? count.filter((id) => id === p_id).length : 0;
        };
        const updateAmount = () => {
          amount.innerText = `${getCount(product.id)}`;
        };

        updateAmount();

        const button = document.createElement('button');
        button.textContent = '+';
        button.addEventListener('click', async () => {
          const cart = JSON.parse(localStorage.getItem('cart')) || [];
          cart.push(product.id);
          localStorage.setItem('cart', JSON.stringify(cart));
          updateAmount();
        });

        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = '-';
        buttonRemove.addEventListener('click', async () => {
          const cart = JSON.parse(localStorage.getItem('cart')) || [];
          const index = cart.indexOf(product.id);
          if (index > -1) {
            cart.splice(index, 1);
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          updateAmount();
        });

        addToCartBox.appendChild(buttonRemove);
        addToCartBox.appendChild(amount);
        addToCartBox.appendChild(button);

        div.appendChild(img);
        div.appendChild(h5);
        div.appendChild(price);
        div.appendChild(p);
        div.appendChild(addToCartBox);
        category.appendChild(div);
      }
    });
  }
})();
