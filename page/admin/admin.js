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
} from '../api.js';
import {
  ingredientErrors,
  productErrors,
  userErrors,
} from '../validators/adminValidator.js';

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

ingredientsButton.addEventListener('click', async () => {
  await adminIngredients();
});

ordersButton.addEventListener('click', async () => {
  await adminOrders();
});

const adminUsersContent = async () => {
  const addUsersContainer = document.getElementById('addUser-container');
  addUsersContainer.innerHTML = '';
  addUsersContainer.innerHTML = `<h5>Add new user</h5>
<label for="addUserName">Username</label><input id="addUserName" type="text" required>
<label for="addUserPass">Password</label><input id="addUserPass" type="text" required>
<label for="addUserEmail">Email</label><input id="addUserEmail" type="text" required>
<label for="addUserAddress">Address</label><input id="addUserAddress" type="text">
<label for="addUserAvatar">Avatar</label><input id="addUserAvatar" type="text">
<div class="error"></div>
`;

  const errors = document.querySelector('.error');
  const addUserBtn = document.createElement('button');
  addUserBtn.id = 'addUserBtn';
  addUserBtn.innerText = 'Add new user';
  addUserBtn.addEventListener('click', async () => {
    const newUser = {
      username: document.getElementById('addUserName').value,
      password: document.getElementById('addUserPass').value,
      email: document.getElementById('addUserEmail').value,
      address: document.getElementById('addUserAddress').value,
      file: document.getElementById('addUserAvatar').value,
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
  // http://10.120.32.57/app/${user.avatar}

  users.forEach((user) => {
    const userContainer = document.createElement('div');
    userContainer.className = 'adminContainer';
    userContainer.id = 'singleUser';
    userContainer.innerHTML = `
    <h5 contenteditable="true" id="username-${user.id}">${user.username}</h5>
    <p>Email: <span contenteditable="true" id="email-${user.id}">${user.email}</span></p>
    <p>Address: <span contenteditable="true" id="address-${user.id}">${user.address}</span></p>
    <img src="http://10.120.32.57/app/uploads${user.avatar}" alt="User Avatar" class="adminProductImglol">
    <input type="file" id="avatar-${user.id}" accept="image/*">  <!-- Added file input -->
    <p>Role: <span contenteditable="true" id="role-${user.id}">${user.role}</span></p>`;

    const updateBtn = document.createElement('button');
    updateBtn.className = 'containerBtn';
    updateBtn.innerText = 'Update';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'containerBtn';
    deleteBtn.innerText = 'Delete';

    userContainer.append(updateBtn, deleteBtn);
    mainContainer.appendChild(userContainer);

    updateBtn.addEventListener('click', async () => {
      const avatarElement = document.getElementById(`avatar-${user.id}`);
      const updatedUser = {
        id: user.id,
        username: document.getElementById(`username-${user.id}`).innerText,
        email: document.getElementById(`email-${user.id}`).innerText,
        address: document.getElementById(`address-${user.id}`).innerText,
        avatar: avatarElement.files.length > 0 ? avatarElement.files[0] : null,
        role: document.getElementById(`role-${user.id}`).innerText,
      };
      console.log('Updated User:', updatedUser);
      await updateUser(updatedUser);
    });

    deleteBtn.addEventListener('click', async () => {
      await deleteUser(user.id); // Function name adjusted to match the intended action
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
      <label for="productImage">Image</label>
      <input id="productImage" type="file">
           <div class="error"></div>`;

  addProductContainer.appendChild(ingredientsContainer);
  const errors = document.querySelector('.error');
  const addProductBtn = document.createElement('button');
  addProductBtn.id = 'addProdBtn';
  addProductBtn.innerText = 'Add product';
  addProductBtn.addEventListener('click', async () => {
    const productData = {
      name: document.getElementById('addProductName').value,
      price: document.getElementById('productPrice').value,
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
      <p>price: <span contenteditable="true" id="price-${product.id}">${product.price}</span></p>
      <img src="http://10.120.32.57/app/uploads/${product.image}">
      <p>image: <span contenteditable="true" id="image-${product.id}">$product.image}</span></p>`;

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