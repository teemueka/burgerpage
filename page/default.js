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
    console.log(JSON.parse(localStorage.getItem('user')).role);
    if (JSON.parse(localStorage.getItem('user')).role === 'admin') {
      const adminButton = document.createElement('a');
      adminButton.href = '../admin/admin.html';
      adminButton.textContent = 'Admin';
      navRight.appendChild(adminButton);
    }
  }
  navRight.appendChild(loginButton);

  const cartDiv = document.createElement('div');
  const cartButton = document.createElement('a');
  cartButton.href = '../order/order.html';
  cartButton.textContent = 'Cart';
  const cartAmout = document.createElement('span');
  cartAmout.id = 'cart-amount';
  cartDiv.appendChild(cartAmout);
  cartDiv.appendChild(cartButton);
  navRight.appendChild(cartDiv);

  const languageDropdown = document.createElement('div');
  languageDropdown.className = 'dropdown';
  const languageButton = document.createElement('a');
  languageButton.textContent = 'Lang';
  languageDropdown.appendChild(languageButton);

  navRight.appendChild(languageDropdown);

  const themeButton = document.createElement('a');
  themeButton.textContent = 'Theme';

  themeButton.addEventListener('click', () => {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
      const body = document.querySelector('body');
      body.style.setProperty('--primary', '#f2f4f3ff');
      body.style.setProperty('--secondary', '#484538ff');
      body.style.setProperty('--highlight', '#65AFD1ff');
      body.style.setProperty('--bg', '#effaf4');
      body.style.setProperty('--text', '#171717');
      return;
    }

    localStorage.setItem('theme', 'dark');
    const body = document.querySelector('body');
    body.style.setProperty('--primary', '#171717');
    body.style.setProperty('--secondary', 'white');
    body.style.setProperty('--highlight', '#65AFD1ff');
    body.style.setProperty('--bg', 'black');
    body.style.setProperty('--text', 'white');
  });
  navRight.appendChild(themeButton);

  nav.appendChild(navRight);

  header.appendChild(nav);
};

async function generateHeader() {
  await createHeader();
}

if (!localStorage.getItem('theme')) {
  localStorage.setItem('theme', 'light');
} else {
  const body = document.querySelector('body');
  if (localStorage.getItem('theme') === 'dark') {
    body.style.setProperty('--primary', '#171717');
    body.style.setProperty('--secondary', 'white');
    body.style.setProperty('--highlight', '#65AFD1ff');
    body.style.setProperty('--bg', 'black');
    body.style.setProperty('--text', 'white');
  } else {
    body.style.setProperty('--primary', '#f2f4f3ff');
    body.style.setProperty('--secondary', '#484538ff');
    body.style.setProperty('--highlight', '#65AFD1ff');
    body.style.setProperty('--bg', '#effaf4');
    body.style.setProperty('--text', '#171717');
  }
}

generateHeader();

const cartAmountIndicator = document.getElementById('cart-amount');

function updateCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartAmount = cart.length;

  if (cartAmount > 0) {
    cartAmountIndicator.style.display = 'inline';
    cartAmountIndicator.innerText = cartAmount;
  } else {
    cartAmountIndicator.style.display = 'none';
  }
  console.log(cartAmount);
}

updateCart();

export {generateHeader, updateCart};
