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
  cartDiv.id = 'cartNav';
  const cartButton = document.createElement('a');
  cartButton.id = 'cart-button';
  cartButton.href = '../order/order.html';
  const cartImage = document.createElement('span');
  // cartImage.src = '.././media/cart.svg';
  cartImage.innerHTML = `<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.24 357.76">
  <defs>
    <style>
      .cls-1 {
        fill: transparent;
        stroke-miterlimit: 10;
        stroke-width: 10px;
        stroke: currentColor;

      }
    </style>
  </defs>
  <g id="Layer_1-2" data-name="Layer 1">
    <polygon class="cls-1" stroke="currentColor" points="83.64 254.91 372.11 254.91 449.12 42.02 83.65 42.02 83.64 254.91"/>
    <line class="cls-1" stroke="currentColor" x1="83.62" y1="116.57" x2="422.15" y2="116.57"/>
    <line class="cls-1" stroke="currentColor" x1="83.63" y1="77.37" x2="436.33" y2="77.37"/>
    <line class="cls-1" stroke="currentColor" x1="83.63" y1="156.11" x2="407.85" y2="156.11"/>
    <line class="cls-1" stroke="currentColor" x1="83.62" y1="195.33" x2="394.74" y2="195.33"/>
    <line class="cls-1" stroke="currentColor" x1="83.62" y1="225.62" x2="381.1" y2="225.62"/>
    <circle class="cls-1" stroke="currentColor" cx="125.96" cy="320.71" r="32.05"/>
    <circle class="cls-1" stroke="currentColor" cx="334.91" cy="320.71" r="32.05"/>
    <polyline class="cls-1" stroke="currentColor" points="83.62 254.91 66.83 323 93.91 323"/>
    <line class="cls-1" stroke="currentColor" x1="157.92" y1="323" x2="299.74" y2="323"/>
    <path class="cls-1" stroke="currentColor" d="m86.43,42.02c-.11-.72-17.23-31.12-17.25-31.13-9.33-6.28-19.66-6.1-39.62-5.75-12.15.21-22.1,1.48-28.76,2.56"/>
  </g>
</svg>
`;
  cartImage.alt = 'Cart';
  cartImage.className = 'cart-image';
  cartButton.appendChild(cartImage);

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
