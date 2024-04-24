import {generateHeader} from '../default.js';

import {validatePassword, validateEmail} from '../validators/userValidator.js';
import {createUser, updateUser, userLogin} from '../api.js';
const currentUser = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
console.log('current user', currentUser);
console.log('token', token);
const form = document.getElementById('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const regEmailInput = document.getElementById('reg-email');
  const regPasswordInput = document.getElementById('reg-password');

  const loginEmailInput = document.getElementById('login-email');
  const loginPasswordInput = document.getElementById('login-password');

  const profileEmailInput = document.getElementById('profileEmail');
  const profilePasswordInput = document.getElementById('profilePassword');

  if (regEmailInput && regPasswordInput) {
    console.log('cock');
    const email = regEmailInput.value.trim();
    const password = regPasswordInput.value.trim();
    let hasErrors = false;

    if (!validateEmail(email)) {
      document.getElementById('email-error').innerHTML = '<p>Invalid email</p>';
      hasErrors = true;
    } else {
      document.getElementById('email-error').innerHTML = '';
    }

    if (!validatePassword(password)) {
      document.getElementById('password-error').innerHTML =
        '<p>Password must contain 8 characters and a number</p>';
      hasErrors = true;
    } else {
      document.getElementById('password-error').innerHTML = '';
    }

    if (hasErrors) {
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    try {
      await handleRegistration(userData);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  } else if (loginEmailInput && loginPasswordInput) {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value.trim();

    try {
      await userLogin(email, password);
      window.location.href = '../../page/main/main.html';
    } catch (error) {
      document.getElementById('password-error').innerHTML =
        '<p>Incorrect email or password</p>';
      console.log('error logging in', error);
    }
  } else {
    const email = profileEmailInput.value.trim();
    const password = profilePasswordInput.value.trim();

    let hasErrors = false;

    if (!validateEmail(email)) {
      document.getElementById('email-error').innerHTML = '<p>Invalid email</p>';
      hasErrors = true;
    } else {
      document.getElementById('email-error').innerHTML = '';
    }

    if (!validatePassword(password)) {
      document.getElementById('password-error').innerHTML =
        '<p>Password must contain 8 characters and a number</p>';
      hasErrors = true;
    } else {
      document.getElementById('password-error').innerHTML = '';
    }

    if (hasErrors) {
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    try {
      const responseData = await updateUser(userData, token);
      console.log(responseData);
    } catch (error) {
      console.error('Update failed', error);
    }
  }
});

const handleRegistration = async (userData) => {
  try {
    await createUser(userData);
    const {email, password} = userData;
    await userLogin(email, password);
    window.location.href = '../../page/main/main.html';
  } catch (error) {
    console.error('Error registering user: ', error.message);
    if (error.message.includes('email already exists')) {
      document.getElementById('email-error').innerHTML = '<p>Email in use</p>';
    } else {
      document.getElementById('email-error').innerHTML = '';
    }
    throw new Error('Registration failed');
  }
};

const registration = () => {
  form.innerHTML = `
    <h1>Registration</h1>
    <div class="input-control">
      <label for="reg-email">Email</label>
      <input id="reg-email" name="email" type="email" required />
      <div class="error" id="email-error"></div>
    </div>
    <div class="input-control">
      <label for="reg-password">Password</label>
      <input id="reg-password" name="password" type="password" required />
      <div class="error" id="password-error"></div>
    </div>
    <div class="alreadyUser">
      <p>Already have an account?</p>
      <a href="#" id="switchToLogin">Sign in</a>
    </div>
    <button type="submit" >Register</button>`;

  document.getElementById('switchToLogin').addEventListener('click', login);
};

const login = () => {
  form.innerHTML = `
    <h1>Login</h1>
    <div class="input-control">
      <label for="login-email">Email</label>
      <input id="login-email" name="email" type="email" required />
      <div class="error" id="email-error"></div>
    </div>
    <div class="input-control">
      <label for="login-password">Password</label>
      <input id="login-password" name="password" type="password" required />
      <div class="error" id="password-error"></div>
    </div>
    <div class="alreadyUser">
      <p>Make an account</p>
      <a href="#" id="switchToRegistration">Sign up</a>
    </div>
    <button type="submit">Log in</button>`;

  document
    .getElementById('switchToRegistration')
    .addEventListener('click', registration);
};

const profile = () => {
  form.innerHTML = `<div id="mainContainer">
  <form id="updateUserForm" method="POST">
    <h2>Update profile</h2>
    <div class="profile-inputs">
      <label for="profileEmail">Email</label>
      <input id="profileEmail" name="profileEmail" type="text">
      <div class="error" id="email-error"></div>
    </div>
    <div class="profile-inputs">
      <label for="profilePassword">Password</label>
      <input id="profilePassword" name="profilePassword" type="password">
      <div class="error" id="password-error"></div>
    </div>
    <button type="submit">Update</button>
    <button type="button" id="delete" class="delete">Delete account</button>
  </form>
  <dialog class="modal">
    <h2>Are you sure?</h2>
    <button id="dontDelete">no</button>
    <button id="deleteUser" class="delete">yes</button>
  </dialog>
</div>`;
};

// if (currentUser !== null) {
//   profile();
// } else {
//   registration();
// }

login();
