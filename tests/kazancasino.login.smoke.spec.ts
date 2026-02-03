import { test, expect } from '@playwright/test';




test.describe('Login Test Kazan Casino - Smoke', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://kazancasino-stage.fsclub.tech');
    let loginButton = page.locator('.user-login-button #buttonHeaderLogin');
    await loginButton.click();
  });
  test('login in kazancasino', async ({ page }) => {

    const iframe = page.frameLocator('iframe#newLoginIframe');

    const usernameFieldInput = iframe.getByTestId('userName');
    const pagePasswordInput = iframe.getByTestId('password');

    await usernameFieldInput.fill('#######');
    await pagePasswordInput.fill('#######');

    const loginButtonSubmit = iframe.getByTestId('login-submit-button');
    await loginButtonSubmit.click();

    const loggedUserName = page.getByTestId('loggedUserName');
    await expect(loggedUserName).toBeVisible();
    await expect(loggedUserName).toHaveText('#######');

  });

  test('forgot password link works', async ({ page }) => {
    const iframe = page.frameLocator('iframe#newLoginIframe');
    const forgotPasswordLink = iframe.getByTestId('reset-password-button');
    await forgotPasswordLink.click();

    const sendPasswordResetButton = iframe.getByTestId('request-reset-button');
    await expect(sendPasswordResetButton, "The send password reset button is NOT visible").toBeVisible();
  });
});