const getProducts = async () => {
  try {
    const response = await fetch(`https://10.120.32.57/app/api/v1/products`);
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
      `https://10.120.32.57/app/api/v1/products/${id}`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(`Error fetching product with id: ${id}`, error);
  }
};

const addProduct = async (name, ingredients, type, price) => {
  const url = `https://10.120.32.57/app/api/v1/products`;

  const requestData = {
    name: name,
    ingredients: ingredients,
    type: type,
    price: price,
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
      console.log('failed to add product', responseData.message);
    }
  } catch (error) {
    console.log('Error adding product', error.message);
  }
};

const updateProduct = async (product) => {
  const url = `https://10.120.32.57/app/api/v1/products/${id}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const responseData = await response.json();
    if (response.ok) {
      return responseData;
    } else {
      console.log('failed to update product', responseData.message);
    }
  } catch (error) {
    console.log('Error updating product', error.message);
  }
};

const deleteProduct = async (id) => {
  const url = `https://10.120.32.57/app/api/v1/products/${id}`;

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
  const url = 'https://10.120.32.57/restaurant/api/v1/auth/login';

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
    const response = await fetch(`https://10.120.32.57/app/api/v1/users`);
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
    const response = await fetch(`https://10.120.32.57/app/api/v1/users/${id}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log('Error fetching products', error);
  }
};

const createUser = async (userData) => {
  const url = `https://10.120.32.57/app/api/v1/users`;

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

const updateUser = async (userData) => {
  const url = 'https://10.120.32.57/app/api/v1/users';

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
  const url = 'https://10.120.32.57/app/api/v1/users';

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
};
