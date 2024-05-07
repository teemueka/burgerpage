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

  const themeNav = document.createElement('div');
  themeNav.id = 'theme-nav';
  const themeButton = document.createElement('span');
  themeButton.id = 'theme-icon';

  const changeTheme = () => {
    localStorage.getItem('theme') === 'light'
      ? (themeButton.innerHTML = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512" height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g><g>

    <style>
    .theme-icon{

    stroke-miterlimit: 10;
    stroke-width: 10px;
    }
    </style>
    <path class="theme-icon" d="M256,144c-61.75,0-112,50.25-112,112s50.25,112,112,112s112-50.25,112-112S317.75,144,256,144z M256,336    c-44.188,0-80-35.812-80-80c0-44.188,35.812-80,80-80c44.188,0,80,35.812,80,80C336,300.188,300.188,336,256,336z M256,112    c8.833,0,16-7.167,16-16V64c0-8.833-7.167-16-16-16s-16,7.167-16,16v32C240,104.833,247.167,112,256,112z M256,400    c-8.833,0-16,7.167-16,16v32c0,8.833,7.167,16,16,16s16-7.167,16-16v-32C272,407.167,264.833,400,256,400z M380.438,154.167    l22.625-22.625c6.25-6.25,6.25-16.375,0-22.625s-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625    S374.188,160.417,380.438,154.167z M131.562,357.834l-22.625,22.625c-6.25,6.249-6.25,16.374,0,22.624s16.375,6.25,22.625,0    l22.625-22.624c6.25-6.271,6.25-16.376,0-22.625C147.938,351.583,137.812,351.562,131.562,357.834z M112,256    c0-8.833-7.167-16-16-16H64c-8.833,0-16,7.167-16,16s7.167,16,16,16h32C104.833,272,112,264.833,112,256z M448,240h-32    c-8.833,0-16,7.167-16,16s7.167,16,16,16h32c8.833,0,16-7.167,16-16S456.833,240,448,240z M131.541,154.167    c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625l-22.625-22.625c-6.25-6.25-16.374-6.25-22.625,0    c-6.25,6.25-6.25,16.375,0,22.625L131.541,154.167z M380.459,357.812c-6.271-6.25-16.376-6.25-22.625,0    c-6.251,6.25-6.271,16.375,0,22.625l22.625,22.625c6.249,6.25,16.374,6.25,22.624,0s6.25-16.375,0-22.625L380.459,357.812z"  /></g></g></svg>
      `)
      : (themeButton.innerHTML = `<?xml version="1.0" ?>
    <!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
    <svg xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512" height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
        <style>
        .theme-icon{
        stroke-miterlimit: 10;
        stroke-width: 10px;
        }
        </style>
        <path class="theme-icon" d="M349.852,343.15c-49.875,49.916-131.083,49.916-181,0c-49.916-49.918-49.916-131.125,0-181.021  c13.209-13.187,29.312-23.25,47.832-29.812c5.834-2.042,12.293-0.562,16.625,3.792c4.376,4.375,5.855,10.833,3.793,16.625  c-12.542,35.375-4,73.666,22.25,99.917c26.209,26.228,64.5,34.75,99.916,22.25c5.792-2.062,12.271-0.582,16.625,3.793  c4.376,4.332,5.834,10.812,3.771,16.625C373.143,313.838,363.06,329.941,349.852,343.15z M191.477,184.754  c-37.438,37.438-37.438,98.354,0,135.771c40,40.021,108.125,36.416,143-8.168c-35.959,2.25-71.375-10.729-97.75-37.084  c-26.375-26.354-39.333-61.771-37.084-97.729C196.769,179.796,194.039,182.192,191.477,184.754z" fill=" currentColor "/></svg>
    `);
  };
  changeTheme();

  themeButton.addEventListener('click', async () => {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
      await changeTheme();
      const body = document.querySelector('body');
      body.style.setProperty('--primary', '#f2f4f3ff');
      body.style.setProperty('--secondary', '#484538ff');
      body.style.setProperty('--highlight', '#65AFD1ff');
      body.style.setProperty('--bg', '#effafa');
      body.style.setProperty('--text', '#171717');
      return;
    }

    localStorage.setItem('theme', 'dark');
    await changeTheme();
    const body = document.querySelector('body');
    body.style.setProperty('--primary', '#1a1a1a');
    body.style.setProperty('--secondary', '#2d2d27');
    body.style.setProperty('--highlight', '#65AFD1ff');
    body.style.setProperty('--bg', '#131313');
    body.style.setProperty('--text', '#e3e3dd');
  });

  themeNav.appendChild(themeButton);
  navRight.appendChild(themeNav);

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
    body.style.setProperty('--primary', '#1a1a1a');
    body.style.setProperty('--secondary', '#2d2d27');
    body.style.setProperty('--highlight', '#65AFD1ff');
    body.style.setProperty('--bg', '#131313');
    body.style.setProperty('--text', '#e3e3dd');
  } else {
    body.style.setProperty('--primary', '#f2f4f3ff');
    body.style.setProperty('--secondary', '#484538ff');
    body.style.setProperty('--highlight', '#65AFD1ff');
    body.style.setProperty('--bg', '#effafa');
    body.style.setProperty('--text', '#171717');
  }
}

generateHeader();

function updateCart() {
  const cartAmountIndicator = document.getElementById('cart-amount');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartAmount = cart.length;

  if (cartAmount > 0) {
    cartAmountIndicator.style.setProperty('display', 'inline');
    cartAmountIndicator.innerText = cartAmount;
  } else {
    cartAmountIndicator.style.setProperty('display', 'none');
  }
  console.log(cartAmount);
}

updateCart();

export {generateHeader, updateCart};
