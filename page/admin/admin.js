import {generateHeader} from '../default.js';

import {
  getProducts,
  updateProduct,
  addProduct,
  deleteProduct,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getAvatar,
  getIngredients,
  addIngredient,
  getCategories,
  getCurrentUser,
  getOrders,
  updateOrder,
  deleteOrder,
  getAllergies,
} from '../api.js';
import {
  ingredientErrors,
  productErrors,
  userErrors,
} from '../validators/adminValidator.js';

try {
  await getCurrentUser();
} catch (e) {
  console.log(e.message);
}

const token = localStorage.getItem('token');
const adminContent = document.getElementById('adminInputs');
document.getElementById('usersBtn').addEventListener('click', async () => {
  await adminUsers();
});
document.getElementById('productsBtn').addEventListener('click', async () => {
  await adminProducts();
});

document
  .getElementById('ingredientsBtn')
  .addEventListener('click', async () => {
    await adminIngredients();
  });

document.getElementById('ordersBtn').addEventListener('click', async () => {
  await adminOrders();
});

/**
 * This method generates current users and create new user fields for admins.
 */
const adminUsersContent = async () => {
  const addUsersContainer = document.getElementById('addUser-container');
  addUsersContainer.innerHTML = '';
  addUsersContainer.innerHTML = `<h5>Add new user</h5>
<label for="addUserPass">Password</label><input id="addUserPass" type="text" required>
<label for="addUserEmail">Email</label><input id="addUserEmail" type="email" required>
<label for="addUserAddress">Address</label><input id="addUserAddress" type="text">
<label for="addUserAvatar">Avatar</label><input type="file" name="photo" id="addUserAvatar">
<div class="error"></div>
`;

  const errors = document.querySelector('.error');
  const addUserBtn = document.createElement('button');
  addUserBtn.className = 'adminBtn';
  addUserBtn.innerText = 'Add new user';
  addUserBtn.addEventListener('click', async () => {
    const newUser = {
      password: document.getElementById('addUserPass').value,
      email: document.getElementById('addUserEmail').value,
      address: document.getElementById('addUserAddress').value,
      file: document.getElementById('addUserAvatar').files[0],
    };
    if (!userErrors(newUser)) {
      errors.innerHTML = '';
      await createUser(newUser);
    } else {
      errors.innerHTML = `<p>Invalid inputs</p>`;
    }
  });
  addUsersContainer.appendChild(addUserBtn);

  const mainContainer = document.getElementById('users-container');
  mainContainer.innerHTML = '';
  const users = await getUsers(token);

  users.forEach((user) => {
    const userContainer = document.createElement('div');
    userContainer.className = 'adminContainer';
    userContainer.id = 'singleUser';

    const emailDiv = document.createElement('div');
    emailDiv.className = 'userEmail';
    emailDiv.innerHTML = `<h5 contenteditable="true" id="email-${user.id}">${user.email}</h5>`;

    const adressDiv = document.createElement('div');
    adressDiv.className = 'userAddress';
    adressDiv.innerHTML = `<p>Address: <span contenteditable="true" id="address-${user.id}">${user.address}</span></p>`;

    const userAvatar = document.createElement('img');
    userAvatar.className = 'userAvatar';
    userAvatar.src = '';
    userAvatar.alt = 'User avatar';
    userAvatar.id = `avatar-${user.id}`;

    const userRoleDiv = document.createElement('div');
    userRoleDiv.className = 'userRole';
    userRoleDiv.innerHTML = `<p>Role: <select name="userRole" id="userRole-${user.id}">
      ${
        user.role === 'admin'
          ? `<option value="admin">admin</option>
         <option value="user">user</option>`
          : `<option value="user">user</option>
         <option value="admin">admin</option>`
      }
      </select></p>`;

    userContainer.append(emailDiv, userAvatar, adressDiv, userRoleDiv);

    const userButtonDiv = document.createElement('div');
    userButtonDiv.className = 'adminProdBtn-control';

    const updateBtn = document.createElement('button');
    updateBtn.className = 'containerBtn';
    updateBtn.id = 'updateButton';
    updateBtn.innerText = 'update';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'containerBtn';
    deleteBtn.id = 'deleteButton';
    deleteBtn.innerText = 'delete';

    userButtonDiv.append(updateBtn, deleteBtn);
    userContainer.appendChild(userButtonDiv);
    mainContainer.appendChild(userContainer);

    const avatarImg = document.getElementById(`avatar-${user.id}`);
    getAvatar(user.id)
      .then((avatarSrc) => {
        avatarImg.src = avatarSrc;
      })
      .catch((error) => {
        console.log('Error loading avatar:', error);
        avatarImg.alt = 'Error loading image';
      });

    updateBtn.addEventListener('click', async () => {
      const updatedUser = {
        id: user.id,
        email: document.getElementById(`email-${user.id}`).innerText,
        address: document.getElementById(`address-${user.id}`).innerText,
        role: document.getElementById(`userRole-${user.id}`).value,
      };
      await updateUser(updatedUser, token);
    });

    deleteBtn.addEventListener('click', async () => {
      await deleteUser(user.id, token);
      userContainer.remove();
    });
  });
};

/**
 * This method generates current products and new product generation fields for admins.
 */
const adminProductsContent = async () => {
  const productDetailsContainer = document.getElementById(
    'productDetails-container'
  );
  productDetailsContainer.innerHTML = '';
  const ingredientsContainer = document.getElementById(
    'adminIngredientsSubAdd'
  );
  ingredientsContainer.innerHTML = '';
  const ingredients = await getIngredients();
  const ingredientArray = [];
  ingredients.forEach((ingredient) => {
    const singleIngredient = document.createElement('div');
    singleIngredient.className = 'singleIngredientControl';
    singleIngredient.innerHTML = '';

    const ingredientName = document.createElement('p');
    ingredientName.innerText = `${ingredient.name}`;
    singleIngredient.appendChild(ingredientName);

    const ingredientAmount = document.createElement('span');
    ingredientAmount.id = `amount-${ingredient.id}`;
    ingredientAmount.innerText = '0';
    singleIngredient.appendChild(ingredientAmount);

    const amountDiv = document.createElement('div');
    amountDiv.className = 'amountRegulator';

    const increaseIngredient = document.createElement('button');
    increaseIngredient.id = `add-${ingredient.id}`;
    increaseIngredient.innerText = '+';
    increaseIngredient.className = 'good';
    singleIngredient.appendChild(increaseIngredient);
    increaseIngredient.addEventListener('click', () => {
      let amount = parseInt(ingredientAmount.innerText);
      if (amount < 10) {
        ingredientArray.push(ingredient.id);
        amount += 1;
        ingredientAmount.innerText = amount.toString();
      }
    });

    const decreaseIngredient = document.createElement('button');
    decreaseIngredient.id = `dec-${ingredient.id}`;
    decreaseIngredient.innerText = '-';
    decreaseIngredient.className = 'bad';
    decreaseIngredient.addEventListener('click', () => {
      let amount = parseInt(ingredientAmount.innerText);
      if (amount > 0) {
        const index = ingredientArray.lastIndexOf(ingredient.id);
        if (index !== -1) {
          ingredientArray.splice(index, 1);
        }
        amount -= 1;
        ingredientAmount.innerText = amount.toString();
      }
    });

    amountDiv.appendChild(increaseIngredient);
    amountDiv.appendChild(ingredientAmount);
    amountDiv.appendChild(decreaseIngredient);

    singleIngredient.appendChild(amountDiv);

    ingredientsContainer.appendChild(singleIngredient);
  });

  productDetailsContainer.innerHTML = `
              <h5>Add product</h5>
      <label for="addProductName">Product name</label>
      <input id="addProductName" type="text">
      <label for="productPrice">Price</label>
      <input id="productPrice" type="text">
      <label for="productCategory">Category</label>
      <select name="productCategory" id="productCategory"></select>
      <label for="productImage">Image</label>
      <input id="productImage" type="file">
           <div class="error"></div>`;

  const categories = await getCategories();
  const dropDown = document.getElementById('productCategory');
  categories.forEach((category) => {
    dropDown.innerHTML += `<option value="${category.name}">${category.name}</option>`;
  });

  const errors = document.querySelector('.error');
  const addProductBtn = document.createElement('button');
  addProductBtn.className = 'adminBtn';
  addProductBtn.innerText = 'Add product';
  addProductBtn.addEventListener('click', async () => {
    const productData = {
      name: document.getElementById('addProductName').value,
      price: document.getElementById('productPrice').value,
      category: document.getElementById('productCategory').value,
      ingredients: JSON.stringify(ingredientArray),
      image: document.getElementById('productImage').files[0],
    };
    if (!productErrors(productData)) {
      errors.innerHTML = '';
      await addProduct(productData);
    } else {
      errors.innerHTML = `<p>Invalid inputs</p>`;
    }
  });

  productDetailsContainer.appendChild(addProductBtn);

  const productContainer = document.getElementById('products-container');
  productContainer.innerHTML = '';
  const products = await getProducts();

  products.forEach((product) => {
    const singleProduct = document.createElement('div');
    singleProduct.id = 'singleProduct';
    singleProduct.className = 'adminContainer';
    singleProduct.innerHTML = '';

    const productTitle = document.createElement('div');
    productTitle.className = 'prodTitle';
    productTitle.innerHTML = `<h5 class="prodHead" contenteditable="true" id="productName-${product.id}">${product.name}</h5>`;

    const productImage = document.createElement('img');
    productImage.className = 'prodImg';
    productImage.src = `http://10.120.32.57/app/uploads/${product.image}`; // Set source path
    productImage.alt = 'Product image';
    productImage.id = `image-${product.id}`;

    const productPriceDiv = document.createElement('div');
    productPriceDiv.className = 'prodPriceDiv';
    productPriceDiv.innerHTML = `<p class="prodPrice">price: <span contenteditable="true" id="price-${product.id}">${product.price}</span></p>`;

    singleProduct.appendChild(productTitle);
    singleProduct.appendChild(productImage);
    singleProduct.appendChild(productPriceDiv);

    if (product.allergies) {
      const allergyDiv = document.createElement('div');
      allergyDiv.className = 'prodAllergy';
      if (product.allergies.length) {
        allergyDiv.innerHTML += `<p>allergies: ${product.allergies.join(', ')}</p>`;
      } else {
        allergyDiv.innerHTML += `<p>No known allergies.</p>`;
      }
      singleProduct.appendChild(allergyDiv);
    }

    if (product.categories) {
      let categories = '';
      product.categories.forEach((category) => {
        categories += category.name;
      });
      singleProduct.innerHTML += `<p>categories: ${categories}</p>`;
    }

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'adminProdBtn-control';

    const updateBtn = document.createElement('button');
    updateBtn.className = 'containerBtn';
    updateBtn.id = 'updateButton';
    updateBtn.innerText = 'update';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'containerBtn';
    deleteBtn.id = 'deleteButton';
    deleteBtn.innerText = 'delete';

    buttonDiv.appendChild(updateBtn);
    buttonDiv.appendChild(deleteBtn);
    singleProduct.appendChild(buttonDiv);
    productContainer.appendChild(singleProduct);

    updateBtn.addEventListener('click', async () => {
      const updatedProduct = {
        id: product.id,
        name: document.getElementById(`productName-${product.id}`).innerText,
        price: document.getElementById(`price-${product.id}`).innerText,
      };
      await updateProduct(updatedProduct);
    });
    deleteBtn.addEventListener('click', async () => {
      await deleteProduct(product.id);
      singleProduct.remove();
    });
  });
};

/**
 * This method generates current ingredients and new ingredient generation fields for admins
 */
const adminIngredientsContent = async () => {
  const ingredientContainer = document.getElementById('ingredients-container');
  ingredientContainer.innerHTML = '';
  const ingredients = await getIngredients();
  ingredients.forEach((ingredient) => {
    const singleIngredient = document.createElement('div');
    singleIngredient.className = 'adminContainer';
    singleIngredient.id = 'singleIngredient';
    singleIngredient.innerHTML = '';

    const ingNameDiv = document.createElement('div');
    ingNameDiv.className = 'ingNameDiv';
    ingNameDiv.innerHTML = `<h5 contenteditable="true" id="ingredientName-${ingredient.id}">${ingredient.name}</h5>`;

    const ingCalDiv = document.createElement('div');
    ingCalDiv.className = 'ingCalDiv';
    ingCalDiv.innerHTML = `<p>cal: <span contenteditable="true" id="cal-${ingredient.id}">${ingredient.cal}</span></p>`;

    const ingAllergyDiv = document.createElement('div');
    ingAllergyDiv.className = 'ingAllergyDiv';

    if (ingredient.allergies) {
      let allergies = '';
      ingredient.allergies.forEach((allergy) => {
        allergies += allergy + ', ';
      });
      allergies = allergies.slice(0, -2);
      ingAllergyDiv.innerHTML += `<p>allergies: ${allergies}</p>`;
    } else {
      ingAllergyDiv.innerHTML += '<p>no known allergies</p>';
    }
    singleIngredient.append(ingNameDiv, ingCalDiv, ingAllergyDiv);
    ingredientContainer.appendChild(singleIngredient);
  });

  const addIngredientContainer = document.getElementById(
    'addIngredient-container'
  );
  addIngredientContainer.innerHTML = '';
  addIngredientContainer.innerHTML = `
              <h5>Add ingredient</h5>
      <label for="ingredientName">Ingredient name</label>
      <input id="ingredientName" type="text">
      <label for="ingredientCal">Calories</label>
      <input id="ingredientCal" type="text">
      <label for="ingredientAllergies">Allergies</label>
      <input id="ingredientAllergies" type="text">
           <div class="error"></div>`;

  const errors = document.querySelector('.error');
  const addIngredientBtn = document.createElement('button');
  addIngredientBtn.className = 'adminBtn';
  addIngredientBtn.innerText = 'Add ingredient';
  addIngredientBtn.addEventListener('click', async () => {
    const ingredientData = {
      name: document.getElementById('ingredientName').value,
      cal: document.getElementById('ingredientCal').value,
      allergies: document.getElementById('ingredientAllergies').value,
    };
    if (!ingredientErrors(ingredientData)) {
      errors.innerHTML = '';
      await addIngredient(ingredientData);
    } else {
      errors.innerHTML = `<p>Invalid inputs</p>`;
    }
  });
  addIngredientContainer.appendChild(addIngredientBtn);
};

/**
 * This method accepts order id and new order state as parameters
 * and change order background colour with the corresponding state.
 *
 * @param {number} orderId order id
 * @param {string} newState order state, either ongoing or completed
 */
const updateOrderStyle = (orderId, newState) => {
  const orderElement = document.querySelector(`#order-${orderId}`);
  if (orderElement) {
    orderElement.classList.remove('order-completed', 'order-ongoing');
    orderElement.classList.add(`order-${newState}`);
  }
};

/**
 * This method displays ongoing and completed orders for admins.
 * Admin users have the ability to update and delete orders.
 */
const adminOrdersContent = async () => {
  const orderContainer = document.getElementById('order-container');
  orderContainer.innerHTML = '';
  const orders = await getOrders();
  orders.sort((a, b) => b.date - a.date);

  orders.forEach((order) => {
    const singleOrder = document.createElement('div');
    singleOrder.className = 'orderContainer';
    singleOrder.id = `order-${order.id}`;
    singleOrder.innerHTML = '';

    const readableDate = new Date(parseInt(order.date));
    const dateTimeString = readableDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const orderAddressDiv = document.createElement('div');
    orderAddressDiv.className = 'orderAddressDiv';
    orderAddressDiv.innerHTML = `<p>Address: <span contenteditable="true" id="orderAddress-${order.id}">${order.address}</span></p>`;

    const orderDateDiv = document.createElement('div');
    orderDateDiv.className = 'orderDateDiv';
    orderDateDiv.innerHTML = `<p>Date: <span id="orderDate-${order.id}">${dateTimeString}</span></p>`;

    const orderTypeDiv = document.createElement('div');
    orderTypeDiv.className = 'orderTypeDiv';
    orderTypeDiv.innerHTML = `<p>Type: <select id="orderType-${order.id}">
       ${
         order.order_type === 'pickup'
           ? `<option value="pickup">pickup</option>
              <option value="delivery">delivery</option>
              <option value="dine-in">dine-in</option>`
           : order.order_type === 'delivery' ? `<option value="delivery">delivery</option>
              <option value="pickup">pickup</option>
              <option value="dine-in">dine-in</option>`
              :  `<option value="dine-in">dine-in</option>
              <option value="delivery">delivery</option>
              <option value="pickup">pickup</option>`
       }
        </select></p>`;

    const orderStateDiv = document.createElement('div');
    orderStateDiv.className = 'orderStateDiv';
    orderStateDiv.innerHTML = `<p>State: <select id="orderState-${order.id}">
       ${
         order.state === 'completed'
           ? `<option value="completed">completed</option>
        <option value="ongoing">ongoing</option>`
           : `<option value="ongoing">ongoing</option>
    <option value="completed">completed</option>`
       }
      </select></p>`;

    const orderButtonDiv = document.createElement('div');
    orderButtonDiv.className = 'adminProdBtn-control';

    const updateBtn = document.createElement('button');
    updateBtn.className = 'containerBtn';
    updateBtn.id = 'updateButton';
    updateBtn.innerText = 'update';

    updateBtn.addEventListener('click', async () => {
      const updatedOrder = {
        order_id: order.id,
        address: document.getElementById(`orderAddress-${order.id}`).innerText,
        order_type: document.getElementById(`orderType-${order.id}`).value,
        state: document.getElementById(`orderState-${order.id}`).value,
      };
      console.log(updatedOrder);
      updateOrderStyle(order.id, updatedOrder.state);
      await updateOrder(updatedOrder);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'containerBtn';
    deleteBtn.id = 'deleteButton';
    deleteBtn.innerText = 'delete';

    deleteBtn.addEventListener('click', async () => {
      await deleteOrder(order.id);
      singleOrder.remove();
    });

    singleOrder.append(
      orderAddressDiv,
      orderDateDiv,
      orderTypeDiv,
      orderStateDiv
    );

    orderButtonDiv.append(updateBtn, deleteBtn);
    singleOrder.appendChild(orderButtonDiv);

    orderContainer.appendChild(singleOrder);
    updateOrderStyle(order.id, order.state);
  });
};

/**
 * Initializes the admin users and populates the fields with the corresponding content.
 * Initialization is done with the navigation buttons in admin page.
 */
const adminUsers = async () => {
  adminContent.innerHTML = '';
  adminContent.innerHTML = `
<div id="userBox">
<div id="users-container" class="adminContentControl"></div>
<div id="addUser-container" class="addUser-container"></div>
</div>`;
  await adminUsersContent();
};

/**
 * Initializes the admin products and populates the fields with the corresponding content.
 * Initialization is done with the navigation buttons in admin page.
 */
const adminProducts = async () => {
  adminContent.innerHTML = '';
  adminContent.innerHTML = `<div id="adminProducts">
    <div id="adminProductContent">
    <div id="products-container" class="adminContentControl"></div>
    <div class="adminProductAdd-container">
      <div id="productDetails-container" class="addProduct-container"></div>
      <div id="adminIngredientsSubAdd"></div>
    </div>
    </div>
    </div>`;
  await adminProductsContent();
};

/**
 * Initializes the admin Ingredients and populates the fields with the corresponding content.
 * Initialization is done with the navigation buttons in admin page.
 */
const adminIngredients = async () => {
  adminContent.innerHTML = '';
  adminContent.innerHTML = `<div id="adminIngredients">
    <div id="ingredientContent">
    <div id="ingredients-container" class="adminContentControl"></div>
    <div id="addIngredient-container" class="addIngredient-container"></div>
    </div>
  </div>`;
  await adminIngredientsContent();
};

/**
 * Initializes the admin orders and populates the fields with the corresponding content.
 * Initialization is done with the navigation buttons in admin page.
 */
const adminOrders = async () => {
  adminContent.innerHTML = '';
  adminContent.innerHTML = `<div id="adminOrders">
  <div id="orderContent">
  <div id="order-container" class="adminContentControl"></div>
  </div>
  </div>`;
  await adminOrdersContent();
};
await adminUsers();
