import {generateHeader} from '../default.js';

import {validatePassword, validateEmail} from '../validators/userValidator.js';
import {
  checkEmailAvailability,
  createUser,
  getAvatar,
  updateUser,
  uploadAvatar,
  userLogin,
  getCurrentUser,
  deleteUser,
} from '../api.js';

let valid = false;

/**
 * This method populates the registration form
 */
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
    <button type="submit" class="defaultBtn" >Register</button>`;

  document.getElementById('switchToLogin').addEventListener('click', login);
};

/**
 * This method populates the login form.
 */
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
    <button type="submit" class="defaultBtn">Log in</button>`;

  document
    .getElementById('switchToRegistration')
    .addEventListener('click', registration);
};

/**
 * This method populates the profile form and handles avatar change.
 * @return {Promise<void>}
 */
const profile = async () => {
  form.innerHTML = `<div id="mainContainer">
  <form id="updateUserForm" method="POST">
    <h2 id="profileHeader">Update profile</h2>
    <div class="pfp">
      <img src="https://placehold.co/400" alt="image loading failed" id="profilePicture" class="avatar">
      <label for="photo" class="custom-file-upload">Update picture</label>
    <input type="file" name="photo" id="photo" style="display: none;">
    </div>
    <div class="profile-inputs">
      <label for="profileEmail">Email</label>
      <input id="profileEmail" name="profileEmail" type="text" readonly>
      <div class="error" id="email-error"></div>
    </div>
    <div class="profile-inputs">
      <label for="profilePassword">Password</label>
      <input id="profilePassword" name="profilePassword" type="password">
      <div class="error" id="password-error"></div>
    </div>
    <div class="profile-inputs">
      <label for="profileNewPassword">New password</label>
      <input id="profileNewPassword" name="profileNewPassword" type="password">
      <div class="error" id="newPassword-error"></div>
    </div>
    <div class="profile-inputs">
      <label for="profileNewDuplicatePassword">Confirm new password</label>
      <input id="profileNewDuplicatePassword" name="profileNewDuplicatePassword" type="password">
      <div class="error" id="duplicatePassword-error"></div>
    </div>
    <button type="submit" class="defaultBtn">Update</button>
    <button type="button" id="delete" class="delete">Delete account</button>
  </form>
  <dialog class="modal">
    <h2>Are you sure?</h2>
    <button id="dontDelete" class="defaultBtn">no</button>
    <button id="deleteUser" class="delete">yes</button>
  </dialog>
</div>`;
  document.getElementById('profileEmail').value = currentUser.email;
  document.getElementById('profilePicture').src = await getAvatar(
    currentUser.id
  );
  const profilePhotoInput = document.getElementById('photo');
  const profilePicture = document.getElementById('profilePicture');

  profilePhotoInput.addEventListener('change', async (evt) => {
    const avatar = {
      id: currentUser.id,
      file: evt.target.files[0],
    };

    try {
      await uploadAvatar(avatar, token);
      const reader = new FileReader();
      reader.onload = () => {
        profilePicture.src = reader.result;
      };
      reader.readAsDataURL(evt.target.files[0]);
    } catch (error) {
      console.log('Error uploading avatar', error);
    }
  });

  const modal = document.querySelector('.modal');

  document.getElementById('delete').addEventListener('click', async () => {
    modal.show();
  });
  document.getElementById('dontDelete').addEventListener('click', (evt) => {
    modal.close();
    evt.preventDefault();
  });
  document
    .getElementById('deleteUser')
    .addEventListener('click', async (evt) => {
      evt.preventDefault();
      try {
        await deleteUser(currentUser, token);
      } catch (e) {
        console.log('error deleting user', e.message);
      }
    });
};

try {
  const user = await getCurrentUser();
  if (!user) {
    valid = false;
  }
} catch (e) {
  /* empty */
}

const currentUser = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const form = document.getElementById('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const regEmailInput = document.getElementById('reg-email');
  const regPasswordInput = document.getElementById('reg-password');

  const loginEmailInput = document.getElementById('login-email');
  const loginPasswordInput = document.getElementById('login-password');

  const profileEmailInput = document.getElementById('profileEmail');
  const profilePasswordInput = document.getElementById('profilePassword');
  const profileNewPasswordInput = document.getElementById('profileNewPassword');
  const profileNewDuplicatePasswordInput = document.getElementById(
    'profileNewDuplicatePassword'
  );

  if (regEmailInput && regPasswordInput) {
    const email = regEmailInput.value.trim();
    const password = regPasswordInput.value.trim();

    let hasErrors = false;

    if (!validateEmail(email)) {
      document.getElementById('email-error').innerHTML = '<p>Invalid email</p>';
      hasErrors = true;
    } else {
      try {
        const emailAvailable = await checkEmailAvailability(email);
        document.getElementById('email-error').innerHTML = '';

        if (!emailAvailable) {
          document.getElementById('email-error').innerHTML =
            '<p>Email already in use</p>';
          hasErrors = true;
        }
      } catch (e) {
        document.getElementById('email-error').innerHTML =
          '<p>Error validating email</p>';
        hasErrors = true;
      }
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

    const userData = {
      email: email,
      password: password,
    };

    try {
      await userLogin(userData);
      window.location.href = '../../page/main/main.html';
    } catch (error) {
      document.getElementById('password-error').innerHTML =
        '<p>Incorrect email or password</p>';
    }
  } else {
    const email = profileEmailInput.value.trim();
    const password = profilePasswordInput.value.trim();
    const newPassword = profileNewPasswordInput.value.trim();
    const newPasswordAgain = profileNewDuplicatePasswordInput.value.trim();

    let hasErrors = false;

    const oldUser = {
      email: email,
      password: password,
    };

    const validUser = await userLogin(oldUser);
    document.getElementById('password-error').innerHTML = '';
    if (validUser === undefined) {
      document.getElementById('password-error').innerHTML =
        '<p>current password incorrect</p>';
      return;
    }

    if (!validatePassword(newPassword)) {
      document.getElementById('newPassword-error').innerHTML =
        '<p>Password must contain 8 characters and a number</p>';
      hasErrors = true;
    } else {
      document.getElementById('newPassword-error').innerHTML = '';
    }

    if (newPassword !== newPasswordAgain) {
      document.getElementById('duplicatePassword-error').innerHTML =
        '<p>Passwords must match</p>';
      hasErrors = true;
    } else {
      document.getElementById('duplicatePassword-error').innerHTML = '';
    }

    if (hasErrors) {
      return;
    }

    const userData = {
      id: currentUser.id,
      email: email,
      password: newPassword,
    };

    try {
      const responseData = await updateUser(userData, token);
      console.log(responseData);
    } catch (error) {
      console.error('Update failed', error);
    }
  }
});

/**
 * This method handles the user registration process.
 * This method creates new user, logs the new user in and redirects user to main if the following are successful.
 * @param {object} userData object consisting of user information.
 * @return {Promise<void>}
 */
const handleRegistration = async (userData) => {
  try {
    await createUser(userData);
    await userLogin(userData);
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

if (valid) {
  profile();
} else {
  login();
}
