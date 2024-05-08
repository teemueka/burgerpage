// @ts-check
const {test, expect} = require('@playwright/test');

test('Register', async ({page}) => {
  await page.goto('http://localhost:3040/page/main/main.html');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Yeps & Burgers/);

  // Click the login button.
  await page.locator('a:has-text("Login")').click();

  // Expect page to have a 'login' text
  await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();

  // Click the register button.
  await page.locator('text=Sign up').click();

  // Expect page to have a 'register' text

  await expect(page.getByRole('heading', {name: 'Registration'})).toBeVisible();

  // Fill the form.
  await page.locator('input[name="email"]').fill('johnTest@test.test');
  await page.locator('input[name="password"]').fill('test1234');

  // Submit the form.
  await page.locator('button:has-text("Register")').click();

  // Expect page to redirect to main page
  await expect(page).toHaveTitle('Yeps & Burgers');

  // Click the login button.
  await page.locator('a:has-text("Profile")').click();
  await page.locator('text="Me"').click();

  // Expect page to have a 'me' text
  await expect(
    page.getByRole('heading', {name: 'Update profile'})
  ).toBeVisible();

  // remove user
  await page.locator('text=Delete account').click();
  await page.locator('#deleteUser').click();

  // Expect page to redirect to main page

  await expect(page).toHaveTitle('Login');
});

test('Login', async ({page}) => {
  await page.goto('http://localhost:3040/page/main/main.html');

  // Click the login button.
  await page.locator('a:has-text("Login")').click();

  // Expect page to have a 'login' text
  await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();

  // Fill the form.
  await page.locator('input[name="email"]').fill('testitesti@testi.testi');
  await page.locator('input[name="password"]').fill('test1234');

  // Submit the form.
  await page.locator('button:has-text("Log in")').click();

  // Expect page to redirect to main page
  await expect(page).toHaveTitle('Yeps & Burgers');
});

test('add item to cart', async ({page}) => {
  await page.goto('http://localhost:3040/page/main/main.html');

  // Click the menu.
  await page.locator('#header').getByRole('link', {name: 'Menu'}).click();

  // wait that cheese burger is visible
  await expect(
    page.getByRole('heading', {name: 'Cheese Burger'})
  ).toBeVisible();

  // Click the product.
  await page.getByRole('heading', {name: 'Cheese Burger'}).click();

  // Click the add button.
  await page.locator('#add-94').click();

  // Click to cart
  await page.locator('#orderBtn').click();

  // Check that the cart has the item.
  await page.locator('#cart-button').click();

  await expect(page).toHaveTitle('Order');

  await expect(
    page.getByRole('heading', {name: 'Cheese Burger'})
  ).toBeVisible();
});
