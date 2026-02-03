import { test, expect } from '@playwright/test';

test.describe('Login Test Kazan Casino - Regression', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://kazancasino-stage.fsclub.tech');
    let loginButton = page.locator('.user-login-button #buttonHeaderLogin');
    await loginButton.click();
  });
  test('login in kazancasino', async ({ page }) => {

    const iframe = page.frameLocator('iframe#newLoginIframe');

    const usernameFieldInput = iframe.getByTestId('userName');
    const pagePasswordInput = iframe.getByTestId('password');
    const loginButtonSubmit = iframe.getByTestId('login-submit-button');
    const loggedUserName = page.getByTestId('loggedUserName');

    await usernameFieldInput.fill('#######');
    await pagePasswordInput.fill('#######');
    await loginButtonSubmit.click();

    await expect(loggedUserName, "The logged in user name is NOT visible").toBeVisible();
    await expect(loggedUserName, "The logged in user name is NOT correct").toHaveText('#######');

  });

  test('login with invalid password', async ({ page }) => {

    const iframe = page.frameLocator('iframe#newLoginIframe');

    const usernameFieldInput = iframe.getByTestId('userName');
    const pagePasswordInput = iframe.getByTestId('password');
    const loginButtonSubmit = iframe.getByTestId('login-submit-button');
    const errorMessage = iframe.locator('.text-on-surface-error');


    await usernameFieldInput.fill('#######');
    await pagePasswordInput.fill('WrongPassword');
    await loginButtonSubmit.click();


    await expect(errorMessage, "The error message is NOT visible").toBeVisible();

  });

  test('login with invalid username', async ({ page }) => {


    const iframe = page.frameLocator('iframe#newLoginIframe');

    const usernameFieldInput = iframe.getByTestId('userName');
    const pagePasswordInput = iframe.getByTestId('password');
    const loginButtonSubmit = iframe.getByTestId('login-submit-button');
    const errorMessage = iframe.locator('.text-on-surface-error');


    await usernameFieldInput.fill('wrongusername');
    await pagePasswordInput.fill('Password01');
    await loginButtonSubmit.click();

    await expect(errorMessage, "The error message is NOT visible").toBeVisible();

  });

  test('log in without credentials', async ({ page }) => {

    const iframe = page.frameLocator('iframe#newLoginIframe');
    const loginButtonSubmit = iframe.getByTestId('login-submit-button');
    const usernameErrorMessage = iframe.getByTestId('input-userName-error');
    const passwordErrorMessage = iframe.getByTestId('input-password-error');

    await loginButtonSubmit.click();

    await expect(usernameErrorMessage, "The username error message is NOT visible").toBeVisible();
    await expect(passwordErrorMessage, "The password error message is NOT visible").toBeVisible();

  });

  test('createAccountButton works', async ({ page }) => {

    const iframe = page.frameLocator('iframe#newLoginIframe');
    const createAccountButton = iframe.getByTestId('register-button');
    const registrationIframe = page.frameLocator('iframe#newRegistrationIframe');
    const registrationEmailField = registrationIframe.getByTestId('email');

    await createAccountButton.click();

    await expect(registrationEmailField, "The registration form is NOT visible").toBeVisible();
  });

});