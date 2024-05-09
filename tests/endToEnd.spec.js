// @ts-check
const {test, expect} = require('@playwright/test');

// Test that user can register
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

  await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();
});

// Test that user can log in
test('Login', async ({page}) => {
  await page.goto('http://localhost:3040/page/main/main.html');

  // Click the login button.
  await page.locator('a:has-text("Login")').click();

  // Expect page to have a 'login' text
  await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();

  // Fill the form.
  await page.locator('input[name="email"]').fill('testitesti@testi.testi');
  await page.locator('input[name="password"]').fill('testi1234');

  // Submit the form.
  await page.locator('button:has-text("Log in")').click();

  // Expect page to redirect to main page
  await expect(page).toHaveTitle('Yeps & Burgers');

  // Find the Profile button.
  await page.locator('text=Profile').isVisible();
});

// Test that can add item to cart
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

  // add another item
  await page.locator('text=+').click();
  await expect(page.locator('text=x2')).toBeVisible();

  // click log in
  await page.locator('text=Log in to order').click();

  // Expect page to have a 'login' text
  await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();

  // Fill the form.
  await page.locator('input[name="email"]').fill('testitesti@testi.testi');
  await page.locator('input[name="password"]').fill('testi1234');

  // Submit the form.
  await page.locator('button:has-text("Log in")').click();

  // Expect page to redirect to main page
  await expect(page).toHaveTitle('Yeps & Burgers');

  // Find the Profile button.
  await page.locator('text=Profile').isVisible();

  // Click the cart button.
  await page.locator('#cart-button').click();

  // Expect page to have a 'name' text
  await expect(page.locator('text=name')).toBeVisible();

  // fill the name and address fields
  await page.fill('#userName', 'testi');
  await page.fill('#userAddress', 'testi');

  // click order
  await page.getByRole('button', {name: 'Order'}).click();
});
