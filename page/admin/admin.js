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
} from '../api.js';
import {productErrors} from '../validators/adminValidator.js';

const adminContent = document.getElementById('adminInputs');
const usersButton = document.getElementById('usersBtn');
const productsButton = document.getElementById('productsBtn');
const ingredientsButton = document.getElementById('ingredientsBtn');
const ordersButton = document.getElementById('ordersBtn');

usersButton.addEventListener('click', async () => {
  await adminUsers();
});

productsButton.addEventListener('click', async () => {
  await adminProducts();
});

ingredientsButton.addEventListener('click', () => {
  adminIngredients();
});

ordersButton.addEventListener('click', () => {
  adminOrders();
});

const adminUsersContent = async () => {
  const mainContainer = document.querySelector('.user-container');
  mainContainer.innerHTML = '';
  const users = await getUsers();

  users.forEach((user) => {
    const userContainer = document.createElement('div');
    userContainer.id = 'singleUser';
    userContainer.innerHTML = '';
    userContainer.innerHTML = `
      <h5 contenteditable="true" id="username-${user.id}">${user.username}</h5>
      <p>Email: <span contenteditable="true" id="email-${user.id}">${user.email}</span></p>
      <p>Address: <span contenteditable="true" id="address-${user.id}">${user.address}</span></p>
      <p>Avatar: <span contenteditable="true" id="avatar-${user.id}">${user.avatar}</span></p>
      <p>Role: <span contenteditable="true" id="role-${user.id}">${user.role}</span></p>`;
    const updateBtn = document.createElement('button');
    updateBtn.id = 'updateButton';
    updateBtn.innerText = 'update';
    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'deleteButton';
    deleteBtn.innerText = 'delete';
    userContainer.appendChild(updateBtn);
    userContainer.appendChild(deleteBtn);
    mainContainer.appendChild(userContainer);
    updateBtn.addEventListener('click', async () => {
      const updatedUser = {
        id: user.id,
        username: document.getElementById(`username-${user.id}`).innerText,
        email: document.getElementById(`email-${user.id}`).innerText,
        address: document.getElementById(`address-${user.id}`).innerText,
        avatar: document.getElementById(`avatar-${user.id}`).innerText,
        role: document.getElementById(`role-${user.id}`).innerText,
      };
      console.log('Updated User:', updatedUser);
      await updateUser(updatedUser);
    });
    deleteBtn.addEventListener('click', async () => {
      await deleteProduct(user.id);
      userContainer.remove();
    });
  });
};

const adminProductsContent = async () => {
  const addProductContainer = document.querySelector('.addProduct-container');
  addProductContainer.innerHTML = '';
  addProductContainer.innerHTML = `
              <h5>Add product</h5>
      <label for="productName">Product name</label>
      <input id="addProduct" type="text">
      <label for="productPrice">Price</label>
      <input id="productPrice" type="text">
      <label for="productImage">Image</label>
      <input id="productImage" type="file">
           <div class="error"></div>`;

  const errors = document.querySelector('.error');
  const addProductBtn = document.createElement('button');
  addProductBtn.id = 'addProdBtn';
  addProductBtn.innerText = 'Add product';
  addProductBtn.addEventListener('click', async () => {
    const productData = {
      name: document.getElementById('addProduct').value,
      price: document.getElementById('productPrice').value,
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

  const productContainer = document.querySelector('.products-container');
  productContainer.innerHTML = '';
  const products = await getProducts();

  products.forEach((product) => {
    const singleProduct = document.createElement('div');
    singleProduct.id = 'singleProduct';
    singleProduct.innerHTML = '';
    singleProduct.innerHTML = `
      <h5 contenteditable="true" id="productName-${product.id}">${product.name}</h5>
      <p>price: <span contenteditable="true" id="price-${product.id}">${product.price}</span></p>
      <p>image: <span contenteditable="true" id="image-${product.id}">$product.image}</span></p>`;

    const updateBtn = document.createElement('button');
    updateBtn.id = 'updateButton';
    updateBtn.innerText = 'update';
    const deleteBtn = document.createElement('button');
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
        image: document.getElementById(`image-${product.id}`).innerText,
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
  // ADD INGREDIENTS CONTENT
  const addIngredientContainer = document.querySelector(
    '.addIngredient-container'
  );
  addIngredientContainer.innerHTML = '';
  addIngredientContainer.innerHTML = `
  <h5>Ingredients</h5>
   <label for="ingredientName">Ingredient name</label>
      <input id="ingredientName" type="text">
      <label for="ingredientCal">Cal</label>
      <input id="ingredientCal" type="text">`;

  // LIST CURRENT INGREDIENTS (in progress)
  const ingredientsContainer = document.querySelector('.ingredients-container');
  ingredientsContainer.innerHTML = '';
  // const ingredients = await get
};

const adminUsers = async () => {
  adminContent.innerHTML = '';
  adminContent.innerHTML = `
<div id="adminSearch">
<input id="adminSearchInput" type="text" placeholder="search for users">
<button id="adminSearchButton">Search</button>
</div>
<div id="userBox">
<div class="user-container"></div>
</div>`;
  await adminUsersContent();
};

const adminProducts = async () => {
  adminContent.innerHTML = '';
  adminContent.innerHTML = `<div id="adminProducts">
    <h3 id="productHeader">Products</h3>
    <div id="adminProductContent">
    <div class="products-container"></div>
    <div class="addProduct-container"></div>
    </div>
    </div>`;
  await adminProductsContent();
};

const adminIngredients = async () => {
  adminContent.innerHTML = '';
  adminContent.innerHTML = `<div id="adminIngredients">
    <h3 id="ingredientHeader">Ingredients</h3>
    <div id="ingredientContent">
    <div class="ingredients-container"></div>
    <div class="addIngredient-container"></div>
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
