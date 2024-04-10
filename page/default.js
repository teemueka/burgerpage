const createHeader = () => {
  const header = document.getElementById('header');

  const nav = document.createElement('nav');
  nav.className = 'nav';

  const logoContainer = document.createElement('div');
  logoContainer.className = 'logo-container';
  const logoLink = document.createElement('a');
  logoLink.href = '/page/main/main.html';
  const logo = document.createElement('img');
  logo.src = '/page/media/logo.png';
  logo.alt = 'Logo';
  logo.className = 'logo';
  logo.herf = '/page/main/main.html';
  logo.style.height = 120 + 'px';
  logoLink.appendChild(logo);
  logoContainer.herf = '/page/main/main.html';
  logoContainer.appendChild(logoLink);
  nav.appendChild(logoContainer);

  const homeButton = document.createElement('a');
  homeButton.href = '/page/main/main.html';
  homeButton.textContent = 'Home';
  nav.appendChild(homeButton);

  const menuButton = document.createElement('a');
  menuButton.href = '/page/menu/menu.html';
  menuButton.textContent = 'Menu';
  nav.appendChild(menuButton);

  const navRight = document.createElement('div');
  navRight.className = 'nav-right';

  const loginButton = document.createElement('a');
  loginButton.href = '/page/profile/profile.html';
  loginButton.textContent = 'Login';
  navRight.appendChild(loginButton);

  const cartButton = document.createElement('a');
  cartButton.href = '/page/order/order.html';
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
}
async function generateHeader() {
 await createHeader();
}

generateHeader();

