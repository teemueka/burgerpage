/**
 * This method validates emails
 * @param {email} email
 * @return {boolean} boolean that determines if the email is valid.
 */
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

/**
 * This method validates passwords.
 * Passwords must consist of 8 characters and a number.
 * @param {password} password
 * @return {boolean} boolean that determines if the password is valid.
 */
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

export {validateEmail, validatePassword};
