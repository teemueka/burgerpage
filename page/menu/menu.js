// eslint-disable-next-line no-unused-vars
// noinspection ES6UnusedImports
import {generateHeader} from '../default.js';

const burgers = document.getElementById('burgers');
const sides = document.getElementById('sides');
const desserts = document.getElementById('desserts');

for (let i = 0; i < 3; i++) {
  burgers.innerHTML += `<div class="menu-item">
<img src="https://placehold.co/300x300">
<h5>yummy burger <span>10€</span></h5>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, animi!</p>
</div>`;
}

for (let i = 0; i < 3; i++) {
  sides.innerHTML += `<div class="menu-item">
<img src="https://placehold.co/300x300">
<h5>yummy side <span>5€</span></h5>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, animi!</p>
</div>`;
}

for (let i = 0; i < 3; i++) {
  desserts.innerHTML += `<div class="menu-item">
<img src="https://placehold.co/300x300">
<h5>yummy dessert <span>4€</span></h5>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, animi!</p>
</div>`;
}
