import {generateHeader} from '../default.js';

import {
  getProducts,
  updateProduct,
  addProduct,
  deleteProduct,
  getProductsById,
  userLogin,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAvatar,
  getIngredients,
  updateIngredient,
  addIngredient,
  getCategories,
  getCurrentUser,
} from '../api.js';
import {
  ingredientErrors,
  productErrors,
  userErrors,
} from '../validators/adminValidator.js';

try {
  await getCurrentUser();
} catch (e) {
  console.log('aaaaaaaaaaaaaaaa', e.message);
}

const currentUser = JSON.parse(localStorage.getItem('user'));
console.log(currentUser);
const token = localStorage.getItem('token');
console.log('token', token);

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
  addUserBtn.id = 'addUserBtn';
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
  const users = await getUsers();

  users.forEach((user) => {
    const userContainer = document.createElement('div');
    userContainer.className = 'adminContainer';
    userContainer.id = 'singleUser';
    userContainer.innerHTML = `
    <h5 contenteditable="true" id="email-${user.id}">${user.email}</h5>
    <p>Address: <span contenteditable="true" id="address-${user.id}">${user.address}</span></p>
    <img alt="User Avatar" class="adminProductImglol" id="avatar-${user.id}">
    <label for="userRole-${user.id}">role</label>
      <select name="userRole" id="userRole-${user.id}">
      ${
        user.role === 'admin'
          ? `<option value="admin">admin</option>
         <option value="user">user</option>`
          : `<option value="user">user</option>
         <option value="admin">admin</option>`
      }
      </select>`;

    const updateBtn = document.createElement('button');
    updateBtn.className = 'containerBtn';
    updateBtn.id = 'updateButton';
    updateBtn.innerText = 'Update';

    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'deleteButton';
    deleteBtn.className = 'containerBtn';
    deleteBtn.innerText = 'Delete';

    userContainer.append(updateBtn, deleteBtn);
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
      console.log('Updated User:', updatedUser);
      await updateUser(updatedUser, token);
    });

    deleteBtn.addEventListener('click', async () => {
      await deleteUser(user.id, token);
      userContainer.remove();
    });
  });
};

const adminProductsContent = async () => {
  const addProductContainer = document.getElementById('addProduct-container');
  addProductContainer.innerHTML = '';
  const ingredientsContainer = document.createElement('div');
  ingredientsContainer.id = 'adminIngredientsSubAdd';
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

    const increaseIngredient = document.createElement('button');
    increaseIngredient.id = `add-${ingredient.id}`;
    increaseIngredient.innerText = '+';
    singleIngredient.appendChild(increaseIngredient);
    increaseIngredient.addEventListener('click', () => {
      let amount = parseInt(ingredientAmount.innerText);
      if (amount < 10) {
        ingredientArray.push(ingredient.name);
        console.log(ingredientArray);
        amount += 1;
        ingredientAmount.innerText = amount.toString();
      }
    });

    const decreaseIngredient = document.createElement('button');
    decreaseIngredient.id = `dec-${ingredient.id}`;
    decreaseIngredient.innerText = '-';
    decreaseIngredient.addEventListener('click', () => {
      let amount = parseInt(ingredientAmount.innerText);
      if (amount > 0) {
        const index = ingredientArray.lastIndexOf(ingredient.name);
        if (index !== -1) {
          ingredientArray.splice(index, 1);
        }
        console.log(ingredientArray);
        amount -= 1;
        ingredientAmount.innerText = amount.toString();
      }
    });
    singleIngredient.appendChild(decreaseIngredient);

    ingredientsContainer.appendChild(singleIngredient);
  });

  addProductContainer.innerHTML = `
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

  addProductContainer.appendChild(ingredientsContainer);
  const errors = document.querySelector('.error');
  const addProductBtn = document.createElement('button');
  addProductBtn.id = 'addProdBtn';
  addProductBtn.innerText = 'Add product';
  addProductBtn.addEventListener('click', async () => {
    const productData = {
      name: document.getElementById('addProductName').value,
      price: document.getElementById('productPrice').value,
      category: document.getElementById('productCategory').value,
      ingredients: JSON.stringify(ingredientArray.toString()),
      image: document.getElementById('productImage').files[0],
    };
    if (!productErrors(productData)) {
      errors.innerHTML = '';
      await addProduct(productData);
    } else {
      errors.innerHTML = `<p>Invalid inputs</p>`;
    }
  });

  addProductContainer.appendChild(addProductBtn);

  const productContainer = document.getElementById('products-container');
  productContainer.innerHTML = '';
  const products = await getProducts();

  products.forEach((product) => {
    const singleProduct = document.createElement('div');
    singleProduct.id = 'singleProduct';
    singleProduct.className = 'adminContainer';
    singleProduct.innerHTML = '';
    singleProduct.innerHTML = `
      <h5 contenteditable="true" id="productName-${product.id}">${product.name}</h5>
      <img src="http://10.120.32.57/app/uploads/${product.image}" alt="Product image" id="image-${product.id}">
      <p>price: <span contenteditable="true" id="price-${product.id}">${product.price}</span></p>`;

    if (product.allergies && product.allergies.length > 0) {
      singleProduct.innerHTML += `<p>allergies: ${product.allergies}</p>`;
    }

    if (product.categories) {
      let categories = '';
      product.categories.forEach((category) => {
        console.log(category.name);
        categories += category.name;
      });
      singleProduct.innerHTML += `<p>categories: ${categories}</p>`;
    }

    const updateBtn = document.createElement('button');
    updateBtn.className = 'containerBtn';
    updateBtn.id = 'updateButton';
    updateBtn.innerText = 'update';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'containerBtn';
    deleteBtn.id = 'deleteButton';
    deleteBtn.innerText = 'delete';

    singleProduct.appendChild(updateBtn);
    singleProduct.appendChild(deleteBtn);
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

const adminIngredientsContent = async () => {
  const ingredientContainer = document.getElementById('ingredients-container');
  ingredientContainer.innerHTML = '';
  const ingredients = await getIngredients();
  console.log(ingredients);
  ingredients.forEach((ingredient) => {
    const singleIngredient = document.createElement('div');
    singleIngredient.className = 'adminContainer';
    singleIngredient.id = 'singleIngredient';
    singleIngredient.innerHTML = '';
    singleIngredient.innerHTML = `
      <h5 contenteditable="true" id="ingredientName-${ingredient.id}">${ingredient.name}</h5>
      <p>cal: <span contenteditable="true" id="cal-${ingredient.id}">${ingredient.cal}</span></p>`;

    const updateBtn = document.createElement('button');
    updateBtn.className = 'containerBtnSingle';
    updateBtn.id = 'updateButton';
    updateBtn.innerText = 'update';
    // const deleteBtn = document.createElement('button');
    // deleteBtn.className = 'containerBtn';
    // deleteBtn.id = 'deleteButton';
    // deleteBtn.innerText = 'delete';
    singleIngredient.appendChild(updateBtn);
    // singleIngredient.appendChild(deleteBtn);
    ingredientContainer.appendChild(singleIngredient);
    updateBtn.addEventListener('click', async () => {
      const updatedIngredient = {
        id: ingredient.id,
        name: document.getElementById(`ingredientName-${ingredient.id}`)
          .innerText,
        price: document.getElementById(`cal-${ingredient.id}`).innerText,
      };
      await updateIngredient(updatedIngredient);
    });
    // deleteBtn.addEventListener('click', async () => {
    // await deleteIngredient(ingredient.id);
    // singleIngredient.remove();
    // });
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
           <div class="error"></div>`;

  const errors = document.querySelector('.error');
  const addIngredientBtn = document.createElement('button');
  addIngredientBtn.id = 'addIngredientBtn';
  addIngredientBtn.innerText = 'Add ingredient';
  addIngredientBtn.addEventListener('click', async () => {
    const ingredientData = {
      name: document.getElementById('ingredientName').value,
      cal: document.getElementById('ingredientCal').value,
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

const adminUsers = async () => {
  adminContent.innerHTML = '';
  adminContent.innerHTML = `
<div id="adminSearch">
<input id="adminSearchInput" type="text" placeholder="search for users">
<button id="adminSearchButton">Search</button>
</div>
<div id="userBox">
<div id="users-container" class="adminContentControl"></div>
<div id="addUser-container" class="addUser-container"></div>
</div>`;
  await adminUsersContent();
};

const adminProducts = async () => {
  adminContent.innerHTML = '';
  adminContent.innerHTML = `<div id="adminProducts">
    <div id="adminProductContent">
    <div id="products-container" class="adminContentControl"></div>
    <div id="addProduct-container" class="addProduct-container"></div>
    </div>
    </div>`;
  await adminProductsContent();
};

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

const adminOrders = () => {
  adminContent.innerHTML = '';
  adminContent.innerHTML = `<div id="adminOrders">
    <h3>Orders</h3>
    <div>
      <label for="orderUser">User order</label>
      <input id="orderUser" name="orderUser" type="text">
    </div>
    <div>
      <label for="orderProduct">Ordered product</label>
      <input id="orderProduct" name="orderProduct" type="text">
    </div>
    <div>
      <label for="orderType">Order type</label>
      <input id="orderType" name="orderType" type="text">
    </div>
    <div>
      <label for="orderDate">Order date</label>
      <input id="orderDate" name="orderDate" type="text">
    </div><div>
    <label for="orderState">Order state</label>
    <input id="orderState" name="orderState" type="text">
  </div>
  </div>`;
};

await adminUsers();
