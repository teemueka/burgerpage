const getProducts = async () => {
  try {
    const response = await fetch(`http://10.120.32.57/app/api/v1/products`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log('Error fetching products', error);
  }
};

const getProductsById = async (id) => {
  try {
    const response = await fetch(
      `http://10.120.32.57/app/api/v1/products/${id}`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(`Error fetching product with id: ${id}`, error);
  }
};

const getIngredients = async () => {
  const url = `http://10.120.32.57/app/api/v1/ingredients`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      console.log('error', response.message);
    }
  } catch (error) {
    console.log('error fetching ingredients');
  }
};

const addProduct = async (productData) => {
  const url = `http://10.120.32.57/app/api/v1/products`;

  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('price', productData.price);
  formData.append('ingredients', productData.ingredients);
  formData.append('file', productData.image);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log('product added', responseData);
      return responseData;
    } else {
      console.log('failed to add product', responseData.message);
    }
  } catch (error) {
    console.log('Error adding product', error.message);
  }
};

const updateProduct = async (product) => {
  const url = `http://localhost:3000/api/v1/products/${product.id}`;

  const productInfo = {
    name: product.name,
    price: product.price,
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productInfo),
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log('update', responseData);
      return responseData;
    } else {
      console.log('failed to update product', responseData.message);
    }
  } catch (error) {
    console.log('Error updating product', error.message);
  }
};

const deleteProduct = async (id) => {
  const url = `http://10.120.32.57/app/api/v1/products/${id}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      console.log('failed to delete product', responseData.message);
    }
  } catch (error) {
    console.log('Error deleting product', error.message);
  }
};

const userLogin = async (username, password) => {
  const url = 'http://10.120.32.57/restaurant/api/v1/auth/login';

  const requestData = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.message || 'Failed to log in.');
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const response = await fetch(`http://10.120.32.57/app/api/v1/users`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log('Error fetching products', error);
  }
};

const getUserById = async (id) => {
  try {
    const response = await fetch(`http://10.120.32.57/app/api/v1/users/${id}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log('Error fetching products', error);
  }
};

const createUser = async (userData) => {
  const url = `http://10.120.32.57/app/api/v1/users`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log('New user created successfully:', responseData);
      return responseData;
    } else {
      console.log(`Failed to create new user: ${responseData.message}`);
    }
  } catch (error) {
    console.error('Error creating new user:', error.message);
    throw error;
  }
};

const updateUser = async (userData, accessToken) => {
  const url = 'http://10.120.32.57/app/api/v1/users';

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log(responseData);
      return responseData;
    }
  } catch (error) {
    console.error('Error updating user information:', error.message);
    throw error;
  }
};

const deleteUser = async (id) => {
  const url = 'http://10.120.32.57/app/api/v1/users';

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log(responseData);
      return responseData;
    }
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
};

const getAvatar = async (id) => {
  const url = `http://10.120.32.57/app/api/v1/users/avatar/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log('Error fetching restaurant data', error);
  }
};

export {
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
};
