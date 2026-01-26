import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test ('homepage title', async ({page}) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await expect(page).toHaveTitle('The Internet');
});


test('successful login', async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  let username = page.getByRole('textbox', { name: 'Username' });
  let password = page.getByRole('textbox', { name: 'Password' });
  let loginButton = page.getByRole('button', { name: 'Login' })
  let successMessage = page.getByText('You logged into a secure area');

  await username.fill('tomsmith');
  await password.fill('SuperSecretPassword!');
  await loginButton.click();
  
  
  await expect(successMessage).toBeVisible();

});

test('failed login', async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  let username = page.getByRole('textbox', { name: 'Username' });
  let password = page.getByRole('textbox', { name: 'Password' });
  let loginButton = page.getByRole('button', { name: 'Login' })
  let errorMessage = page.getByText('Your username is invalid!');

  await username.fill('invalidUser');
  await password.fill('invalidPassword');
  await loginButton.click();
    
  await expect(errorMessage).toBeVisible();

});

test('logout after login', async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Form Authentication' }).click();

  let username = page.getByRole('textbox', { name: 'Username' });
  let password = page.getByRole('textbox', { name: 'Password' });
  let loginButton = page.getByRole('button', { name: 'Login' })
  let logoutButton = page.getByRole('link', { name: 'Logout' });
  let logoutMessage = page.getByText('You logged out of the secure area!');

  await username.fill('tomsmith');
  await password.fill('SuperSecretPassword!');

  await loginButton.click();
  await logoutButton.click();
  
  await expect(logoutMessage).toBeVisible();

});

test  ('add element', async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Add/Remove Elements' }).click();

  let addButton = page.getByRole('button', { name: 'Add Element' });
  let deleteButton = page.getByRole('button', { name: 'Delete' });

  await addButton.click();

  await expect(deleteButton).toBeVisible();
});

test  ('remove element', async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Add/Remove Elements' }).click();

  let addButton = page.getByRole('button', { name: 'Add Element' });
  let deleteButton = page.getByRole('button', { name: 'Delete' });

  await addButton.click();
  await deleteButton.click();

  await expect(deleteButton).not.toBeVisible();
});

test ('dropdown ', async ({page})=> {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dropdown' }).click();

  let dropdown = page.locator('#dropdown')

  await dropdown.click();
  await dropdown.selectOption('Option 2');

  await expect(dropdown).toHaveValue('2');
});

test ('login in kazancasino', async ({page})=> {
  await page.goto('https://kazancasino-stage.fsclub.tech');
  let loginButton = page.locator('.user-login-button #buttonHeaderLogin');
  await loginButton.click();

  const iframe = page.frameLocator('#newLoginIframe');

  //const usennameField= page.locator("[data-testif='usenamr']");
  const usernameFieldInput = iframe.getByTestId('userName');
  const pagePasswordInput = iframe.getByTestId('password');



  await usernameFieldInput.fill('#######');
  await pagePasswordInput.fill('#######');

  const loginButtonSubmit = iframe.getByTestId('login-submit-button');
  await loginButtonSubmit.click();

  //const userProfileIcon = page.getByTestId('loggedUserAvatar');
  const loggedUserName = page.getByTestId('loggedUserName');
  await expect(loggedUserName).toBeVisible();
  await expect(loggedUserName).toHaveText('#######');

});