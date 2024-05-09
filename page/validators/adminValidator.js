import {validateEmail, validatePassword} from './userValidator.js';

/**
 * This method validates new products admins are trying to add.
 * @param {object} productData product object with product information.
 * @return {boolean} boolean that determines if data should be sent to the server.
 */
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

  return hasErrors;
};

/**
 * This method validates new ingredients admins are trying to add.
 * @param {object} ingredientData ingredient object consisting of ingredient data.
 * @return {boolean} boolean that determines if data should be sent to the server.
 */
const ingredientErrors = (ingredientData) => {
  const {name, cal} = ingredientData;

  let hasErrors = false;

  if (name.trim() === '') {
    hasErrors = true;
  }

  if (cal <= 0) {
    hasErrors = true;
  }

  return hasErrors;
};

/**
 * This method validates new users admins are trying to add.
 * @param {object} userData user object consisting of userdata
 * @return {boolean} boolean that determines if data should be sent to the server.
 */
const userErrors = (userData) => {
  const {password, email} = userData;

  let hasErrors = false;

  if (!validatePassword(password)) {
    hasErrors = true;
  }
  if (!validateEmail(email)) {
    hasErrors = true;
  }

  return hasErrors;
};

export {productErrors, userErrors, ingredientErrors};
