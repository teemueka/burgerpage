import {generateHeader} from '../default.js';

const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const registration = () => {
  form.innerHTML = `
    <h1>Registration</h1>
    <div class="input-control">
      <label for="username">Username</label>
      <input id="username" name="username" type="text" required />
      <div class="error" id="username-error"></div>
    </div>
    <div class="input-control">
      <label for="email">Email</label>
      <input id="email" name="email" type="text" required />
      <div class="error" id="email-error"></div>
    </div>
    <div class="input-control">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" required />
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
      <label for="username">Username</label>
      <input id="username" name="username" type="text" required />
      <div class="error" id="username-error"></div>
    </div>
    <div class="input-control">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" required />
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

const validateEmail = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

login();
