// eslint-disable-next-line no-unused-vars
// noinspection ES6UnusedImports
import {generateHeader} from '../default.js';

const burgers = document.getElementById('burgers');
const sides = document.getElementById('sides');
const desserts = document.getElementById('desserts');

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

        div.appendChild(img);
        div.appendChild(h5);
        div.appendChild(price);
        div.appendChild(p);
        category.appendChild(div);
      }
    });
  }
})();
