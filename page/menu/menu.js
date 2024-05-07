// eslint-disable-next-line no-unused-vars
// noinspection ES6UnusedImports
import {generateHeader, updateCart} from '../default.js';
import {getIngredients, getProductsById} from '../api.js';

const modal = document.querySelector('.modal');

(async () => {
  const response = await (
    await fetch('http://10.120.32.57/app/api/v1/products')
  ).json();
  for (const product of response) {
    if (!product.categories) {
      continue;
    }
    // console.log(product.categories);
    product.categories.forEach((categoryl) => {
      if (
        categoryl.name === 'burger' ||
        categoryl.name === 'side' ||
        categoryl.name === 'dessert'
      ) {
        // console.log(`'${categoryl.name}'`);
        const category = document.getElementById(categoryl.name);
        if (!category) {
          console.log(`No element found with ID '${categoryl.name}'`);
          return;
        }

        // console.log(product);
        const div = document.createElement('div');
        div.classList.add('menu-item');

        div.addEventListener('click', async () => {
          await customProduct(product.id);
          modal.show();
          modal.classList.add('visible');
        });

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

const customProduct = async (productID) => {
  const counts = {};
  const defaultCounts = {};

  if (modal) {
    modal.innerHTML = '';
    const ingredients = await getIngredients();
    ingredients.forEach((ingredient) => {
      counts[ingredient.id] = {
        id: ingredient.id,
        name: ingredient.name,
        amount: 0,
      };
      defaultCounts[ingredient.id] = {
        id: ingredient.id,
        name: ingredient.name,
        amount: 0,
      };
    });

    const product = await getProductsById(productID);
    product.ingredients.forEach((ingredient) => {
      if (ingredient.id in counts) {
        counts[ingredient.id].amount++;
        defaultCounts[ingredient.id].amount++;
      }
    });

    const modalControl = document.createElement('div');
    modalControl.className = 'modalControl';
    modalControl.innerHTML = '';
    modal.appendChild(modalControl);

    const modalMain = document.createElement('div');
    modalMain.id = 'modalMain';
    modalMain.innerHTML = `
    <h3>${product.name}</h3>
    <img src="http://10.120.32.57/app/uploads/${product.image}" alt="product image">
    <p>${product.price}</p>`;

    const exit = document.createElement('span');
    exit.id = 'exit';
    exit.innerText = 'x';

    exit.addEventListener('click', () => {
      modal.classList.remove('visible');
      modal.close();
    });
    modalMain.appendChild(exit);
    modalControl.appendChild(modalMain);

    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.id = 'ingredientSubAdd';
    ingredients.forEach((ingredient) => {
      const singleIngredient = document.createElement('div');
      singleIngredient.className = 'singleIngredientControl';
      singleIngredient.innerHTML = '';

      const ingredientName = document.createElement('p');
      ingredientName.innerText = `${ingredient.name}`;
      singleIngredient.appendChild(ingredientName);

      const amountDiv = document.createElement('div');
      amountDiv.className = 'amountRegulator';

      const ingredientAmount = document.createElement('span');
      ingredientAmount.id = `amount-${ingredient.id}`;
      ingredientAmount.innerText = counts[ingredient.id].amount;
      singleIngredient.appendChild(ingredientAmount);

      const increaseIngredient = document.createElement('button');
      increaseIngredient.id = `add-${ingredient.id}`;
      increaseIngredient.innerText = '+';
      increaseIngredient.className = 'good';
      increaseIngredient.addEventListener('click', () => {
        let amount = parseInt(ingredientAmount.innerText);
        if (amount < 10) {
          amount += 1;
          ingredientAmount.innerText = amount.toString();
          counts[ingredient.id].amount++;
        }
      });

      const decreaseIngredient = document.createElement('button');
      decreaseIngredient.id = `dec-${ingredient.id}`;
      decreaseIngredient.innerText = '-';
      decreaseIngredient.className = 'bad';
      decreaseIngredient.addEventListener('click', () => {
        let amount = parseInt(ingredientAmount.innerText);
        if (amount > 0) {
          amount -= 1;
          counts[ingredient.id].amount--;
          ingredientAmount.innerText = amount.toString();
        }
      });

      amountDiv.appendChild(increaseIngredient);
      amountDiv.appendChild(ingredientAmount);
      amountDiv.appendChild(decreaseIngredient);
      singleIngredient.appendChild(amountDiv);

      ingredientsContainer.appendChild(singleIngredient);
    });
    modalControl.appendChild(ingredientsContainer);
    modal.appendChild(modalControl);

    const updateCustomOrder = () => {
      const compare = compareIngredients(counts, defaultCounts);

      return {
        id: productID,
        added: compare.added,
        removed: compare.removed,
        price: product.price,
      };
    };

    const subAdd = document.createElement('div');
    subAdd.className = 'orderAmount';
    subAdd.innerHTML = '';

    const amountDivM = document.createElement('div');
    amountDivM.className = 'amountRegulator';

    const orderAmount = document.createElement('span');
    orderAmount.id = `amount-${productID}`;
    orderAmount.innerText = '0';

    const increaseOrderAmount = document.createElement('button');
    increaseOrderAmount.id = `add-${productID}`;
    increaseOrderAmount.innerText = '+';
    increaseOrderAmount.className = 'good';
    subAdd.appendChild(increaseOrderAmount);
    increaseOrderAmount.addEventListener('click', () => {
      let amount = parseInt(orderAmount.innerText);
      amount += 1;
      orderAmount.innerText = amount.toString();
      const customOrder = updateCustomOrder();
      const tempCart = JSON.parse(localStorage.getItem('tempCart')) || [];
      tempCart.push(customOrder);
      localStorage.setItem('tempCart', JSON.stringify(tempCart));
    });

    const decreaseOrdedAmount = document.createElement('button');
    decreaseOrdedAmount.id = `dec-${productID}`;
    decreaseOrdedAmount.innerText = '-';
    decreaseOrdedAmount.className = 'bad';
    decreaseOrdedAmount.addEventListener('click', () => {
      const tempCart = JSON.parse(localStorage.getItem('tempCart')) || [];
      let amount = parseInt(orderAmount.innerText);
      if (amount > 0) {
        amount -= 1;
        orderAmount.innerText = amount.toString();
        tempCart.pop();
      }
      localStorage.setItem('tempCart', JSON.stringify(tempCart));
    });

    amountDivM.appendChild(increaseOrderAmount);
    amountDivM.appendChild(orderAmount);
    amountDivM.appendChild(decreaseOrdedAmount);

    const orderBtn = document.createElement('button');
    orderBtn.id = 'orderBtn';
    orderBtn.innerText = 'order';
    orderBtn.className = 'good';
    orderBtn.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const tempCart = JSON.parse(localStorage.getItem('tempCart')) || [];
      const updatedCart = cart.concat(tempCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      localStorage.setItem('tempCart', JSON.stringify([]));
      updateCart();
      modal.close();
      modal.classList.remove('visible');
    });
    subAdd.appendChild(amountDivM);
    subAdd.appendChild(orderBtn);
    modalMain.appendChild(subAdd);
  }
};

const compareIngredients = (modified, original) => {
  const added = [];
  const removed = [];

  Object.entries(original).forEach(([key, ingredient]) => {
    Object.entries(modified).forEach(([modKey, modIngredient]) => {
      if (key === modKey) {
        if (ingredient.amount !== modIngredient.amount) {
          if (ingredient.amount > modIngredient.amount) {
            let count = ingredient.amount;
            count -= modIngredient.amount;
            for (let i = 0; i < count; i++) {
              removed.push(ingredient.id);
            }
          } else if (ingredient.amount < modIngredient.amount) {
            let count = modIngredient.amount;
            count -= ingredient.amount;
            for (let i = 0; i < count; i++) {
              added.push(ingredient.id);
            }
          }
        }
      }
    });
  });
  return {added, removed};
};
