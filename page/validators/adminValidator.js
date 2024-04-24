import {
  validateUsername,
  validateEmail,
  validatePassword,
} from './userValidator.js';

const productErrors = (productData) => {
  const {name, price, image} = productData;

  let hasErrors = false;

  if (name.trim() === '') {
    hasErrors = true;
  }
  if (isNaN(price)) {
    hasErrors = true;
  }
  if (image === null || image === undefined) {
    hasErrors = true;
  }

  if (hasErrors) {
    console.log('product information invalid');
    return true;
  } else {
    console.log('yep');
    return false;
  }
};

const ingredientErrors = (ingredientData) => {
  const {name, cal} = ingredientData;

  let hasErrors = false;

  if (name.trim() === '') {
    hasErrors = true;
  }

  if (cal <= 0) {
    hasErrors = true;
  }

  if (hasErrors) {
    console.log('ingredient data invalid');
    return true;
  } else {
    console.log('yep');
    return false;
  }
};

const userErrors = (userData) => {
  const {username, password, email, role} = userData;

  let hasErrors = false;

  if (!validateUsername(username)) {
    hasErrors = true;
  }

  if (!validatePassword(password)) {
    hasErrors = true;
  }
  if (!validateEmail(email)) {
    hasErrors = true;
  }
  if (role !== 'user' && role !== 'admin') {
    hasErrors = true;
  }
  if (hasErrors) {
    console.log('user information invalid');
    return true;
  } else {
    console.log('yep');
    return false;
  }
};

export {productErrors, userErrors, ingredientErrors};
