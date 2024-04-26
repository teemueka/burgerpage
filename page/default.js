const createHeader = () => {
  const header = document.getElementById('header');

  const nav = document.createElement('nav');
  nav.className = 'nav';

  const logoContainer = document.createElement('div');
  logoContainer.className = 'logo-container';
  const logoLink = document.createElement('a');
  logoLink.href = '../main/main.html';
  const logo = document.createElement('img');
  logo.src = '../media/Logo.png';
  logo.alt = 'Logo';
  logo.className = 'logo';
  logo.style.height = 120 + 'px';
  logoLink.appendChild(logo);
  logoContainer.appendChild(logoLink);
  nav.appendChild(logoContainer);

  const homeButton = document.createElement('a');
  homeButton.href = '../main/main.html';
  homeButton.textContent = 'Home';
  nav.appendChild(homeButton);

  const menuButton = document.createElement('a');
  menuButton.href = '../menu/menu.html';
  menuButton.textContent = 'Menu';
  nav.appendChild(menuButton);

  const navRight = document.createElement('div');
  navRight.className = 'nav-right';

  const loginButton = document.createElement('a');
  loginButton.href = '../profile/profile.html';

  loginButton.textContent = 'Login';

  if (localStorage.getItem('user')) {
    loginButton.textContent = 'Profile';
  }
  navRight.appendChild(loginButton);

  const cartButton = document.createElement('a');
  cartButton.href = '../order/order.html';
  cartButton.textContent = 'Cart';
  navRight.appendChild(cartButton);

  const languageDropdown = document.createElement('div');
  languageDropdown.className = 'dropdown';
  const languageButton = document.createElement('a');
  languageButton.textContent = 'Language';
  languageDropdown.appendChild(languageButton);

  navRight.appendChild(languageDropdown);

  nav.appendChild(navRight);

  header.appendChild(nav);
};

async function generateHeader() {
  await createHeader();
}

generateHeader();

export {generateHeader};
