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

const getRestaurants = async () => {
  try {
    const response = await fetch(`http://10.120.32.57/app/api/v1/res`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.log('Error fetching restaurants', e);
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

const addIngredient = async (ingredientData) => {
  const url = `http://10.120.32.57/app/api/v1/ingredients`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredientData),
    });

    const responseData = await response.json();
    if (response.ok) {
      console.log('New ingredient created successfully:', responseData);
      return responseData;
    } else {
      console.log(`Failed to create new ingredient: ${responseData.message}`);
    }
  } catch (error) {
    console.error('Error creating new ingredient:', error.message);
    throw error;
  }
};

const getCategories = async () => {
  try {
    const response = await fetch(`http://10.120.32.57/app/api/v1/categories`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log('Error fetching products', error);
  }
};

const addProduct = async (productData) => {
  const url = `http://10.120.32.57/app/api/v1/products`;

  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('price', productData.price);
  formData.append('category', productData.category);
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
  const url = `http://10.120.32.57/app/api/v1/products/${product.id}`;

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

const checkEmailAvailability = async (email) => {
  const url = `http://10.120.32.57/app/api/v1/auth/email/${email}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();
    if (response.ok) {
      return responseData.state;
    } else {
      console.log('Error checking email availability', responseData.message);
    }
  } catch (error) {
    console.log('Error checking email availability', error.message);
  }
};

const userLogin = async (userData) => {
  console.log(userData);
  const url = 'http://10.120.32.57/app/api/v1/auth/login';

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
      console.log('login success', responseData);
      localStorage.setItem('user', JSON.stringify(responseData.user));
      localStorage.setItem('token', responseData.token);
      window.location.href = '../../page/main/main.html';
      return responseData;
    } else {
      throw new Error(responseData.message || 'Failed to log in.');
    }
  } catch (error) {
    return false;
  }
};

const getUsers = async (token) => {
  const url = `http://10.120.32.57/app/api/v1/users`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

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

  const formData = new FormData();
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  formData.append('address', userData.address);
  formData.append('file', userData.file);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
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

const uploadAvatar = async (avatarData, token) => {
  const url = `http://10.120.32.57/app/api/v1/users/avatar/${avatarData.id}`;

  const formData = new FormData();
  formData.append('file', avatarData.file);

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Avatar uploaded successfully', data);
      localStorage.setItem('AVATAR_KEY', data.avatar);
      return data;
    }
  } catch (error) {
    console.log('Failed to upload avatar:', error.message);
    throw error;
  }
};

const getAvatar = async (id) => {
  const url = `http://10.120.32.57/app/api/v1/users/avatar/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const avatar = await response.json();
      return 'http://10.120.32.57/app/uploads/' + avatar.avatar;
    } else {
      throw new Error('Failed to fetch avatar image');
    }
  } catch (error) {
    console.error('Error fetching avatar:', error);
    throw error;
  }
};

const updateUser = async (userData, accessToken) => {
  const url = `http://10.120.32.57/app/api/v1/users/${userData.id}`;

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

const getCurrentUser = async () => {
  const url = `http://10.120.32.57/app/api/v1/auth/me`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 403) {
      localStorage.removeItem('user');
    }
    const responseData = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(responseData.user));
      return responseData;
    }
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
};

const deleteUser = async (user, token) => {
  const url = `http://10.120.32.57/app/api/v1/users/${user}`;

  const userDeleting = await getCurrentUser(token);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      if (userDeleting.user.role !== 'admin') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        location.reload();
      }
      return responseData;
    }
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
};

const getOrders = async () => {
  const url = `http://10.120.32.57/app/api/v1/orders`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log('Error fetching products', error);
  }
};

const updateOrder = async (orderData) => {
  const url = `http://10.120.32.57/app/api/v1/orders`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log('Error updating order', error);
  }
};

const deleteOrder = async (id) => {
  const url = `http://10.120.32.57/app/api/v1/orders/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    console.log(await response.json());
  } catch (error) {
    console.log('Error deleting order', error);
  }
};

const createOrder = async (orderData) => {
  const url = `http://10.120.32.57/app/api/v1/orders`;

  console.log(orderData);
  console.log(JSON.stringify(orderData));
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    console.log(await response.json());
  } catch (error) {
    console.log('Error sending order', error);
  }
};

export {
  getProducts,
  getRestaurants,
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
  addIngredient,
  checkEmailAvailability,
  uploadAvatar,
  getCurrentUser,
  getCategories,
  getOrders,
  updateOrder,
  deleteOrder,
  createOrder,
};
