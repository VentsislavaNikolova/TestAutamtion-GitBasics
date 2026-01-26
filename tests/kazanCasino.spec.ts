import { test, expect } from '@playwright/test';

test('login in kazancasino', async ({ page }) => {
  await page.goto('https://kazancasino-stage.fsclub.tech');
  let loginButton = page.locator('.user-login-button #buttonHeaderLogin');
  await loginButton.click();

  const iframe = page.frameLocator('iframe#newLoginIframe');

  //const usennameField= page.locator("[data-testif='usenamr']");
  const usernameFieldInput = iframe.getByTestId('userName');
  const pagePasswordInput = iframe.getByTestId('password');

  await usernameFieldInput.fill('vnnikolova1');
  await pagePasswordInput.fill('Password01');

  const loginButtonSubmit = iframe.getByTestId('login-submit-button');
  await loginButtonSubmit.click();

  //const userProfileIcon = page.getByTestId('loggedUserAvatar');
  const loggedUserName = page.getByTestId('loggedUserName');
  await expect(loggedUserName).toBeVisible();
  await expect(loggedUserName).toHaveText('vnnikolova1');

});

test('login with invalid password', async ({ page }) => {
  await page.goto('https://kazancasino-stage.fsclub.tech');
  let loginButton = page.locator('.user-login-button #buttonHeaderLogin');
  await loginButton.click();

  const iframe = page.frameLocator('iframe#newLoginIframe');

  const usernameFieldInput = iframe.getByTestId('userName');
  const pagePasswordInput = iframe.getByTestId('password');

  await usernameFieldInput.fill('vnnikolova');
  await pagePasswordInput.fill('WrongPassword');

  const loginButtonSubmit = iframe.getByTestId('login-submit-button');
  await loginButtonSubmit.click();

  const errorMessage = iframe.locator('.text-on-surface-error');
  await expect(errorMessage).toBeVisible();

});

test('login with invalid username', async ({ page }) => {
  await page.goto('https://kazancasino-stage.fsclub.tech');
  let loginButton = page.locator('.user-login-button #buttonHeaderLogin');
  await loginButton.click();

  const iframe = page.frameLocator('iframe#newLoginIframe');

  const usernameFieldInput = iframe.getByTestId('userName');
  const pagePasswordInput = iframe.getByTestId('password');

  await usernameFieldInput.fill('wrongusername');
  await pagePasswordInput.fill('Password01');

  const loginButtonSubmit = iframe.getByTestId('login-submit-button');
  await loginButtonSubmit.click();

  const errorMessage = iframe.locator('.text-on-surface-error');
  await expect(errorMessage).toBeVisible();

});

test('register user', async ({ page }) => {
  await page.goto('https://kazancasino-stage.fsclub.tech');
  let registerButton = page.locator('.register-button-holder #buttonHeaderRegister');
  await registerButton.click();

  const iframe = page.frameLocator('iframe#newRegistrationIframe');

  const emailfieldInput = iframe.getByTestId('email');
  const passwordInput = iframe.getByTestId('password');
  const usernameFieldInput = iframe.getByTestId('userName');
  const firstNameFieldInput = iframe.getByTestId('firstName');
  const lastNameFieldInput = iframe.getByTestId('lastName');
  const birthdayMonthFieldInput = iframe.getByTestId('dateOfBirth-MM');
  const birthdayDayFieldInput = iframe.getByTestId('dateOfBirth-DD');
  const birthdayYearFieldInput = iframe.getByTestId('dateOfBirth-YYYY');
  const addressInput = iframe.getByTestId('address');
  const cityfieldInput = iframe.getByTestId('city');
  const zipCodeFieldInput = iframe.getByTestId('zipCode');
  const countryDropdown = iframe.locator('[data-testid="userCountryCode"] select');
  const phoneFieldInput = iframe.getByTestId('phone');
  const termsCheckbox = iframe.getByTestId('acceptTermsAndConditions');
  const infoCheckbox = iframe.getByTestId('acceptAttestation');

  const createAccountButton = iframe.getByTestId('registration-submit-button');


  await emailfieldInput.fill('#######+333@######.io');
  await passwordInput.fill('#######!');
  await usernameFieldInput.fill('#######');
  await firstNameFieldInput.fill('#######');
  await lastNameFieldInput.fill('#######');
  await birthdayMonthFieldInput.fill('01');
  await birthdayDayFieldInput.fill('01');
  await birthdayYearFieldInput.fill('1990');
  await addressInput.fill('123 Main St');
  await cityfieldInput.fill('#######');
  await zipCodeFieldInput.fill('1000');
  await countryDropdown.selectOption('TR');
  await phoneFieldInput.fill('5898778269');
  await termsCheckbox.check();
  await infoCheckbox.check();

  await createAccountButton.click();

  const playButton = iframe.getByTestId('play-button');
  await expect(playButton).toBeVisible();

  await playButton.click();

});

test('register with invalid email', async ({ page }) => {
  await page.goto('https://kazancasino-stage.fsclub.tech');
  let registerButton = page.locator('.register-button-holder #buttonHeaderRegister');
  await registerButton.click();

  const iframe = page.frameLocator('iframe#newRegistrationIframe');

  const emailfieldInput = iframe.getByTestId('email');
  await emailfieldInput.fill('invalidemail');

  const errorMessage = iframe.getByTestId('input-email-error');
  await expect(errorMessage).toBeVisible();
});

test('register with invalid username', async ({ page }) => {
  await page.goto('https://kazancasino-stage.fsclub.tech');
  let registerButton = page.locator('.register-button-holder #buttonHeaderRegister');
  await registerButton.click();

  const iframe = page.frameLocator('iframe#newRegistrationIframe');

  const emailfieldInput = iframe.getByTestId('email');
  const passwordInput = iframe.getByTestId('password');
  const usernameFieldInput = iframe.getByTestId('userName');

  await emailfieldInput.fill('#######+333@ventureslab.io');
  await passwordInput.fill('#######!');
  await usernameFieldInput.fill('inv');
  await emailfieldInput.click();
  const errorMessage = iframe.getByTestId('input-userName-error');
  await expect(errorMessage).toBeVisible();
});

test('navigate to casino page', async ({ page }) => {
  await page.goto('https://kazancasino-stage.fsclub.tech');
  const casinoLink = page.locator('#navCasino');
  await casinoLink.click();

  await expect(page).toHaveURL(/.*casino/);
});