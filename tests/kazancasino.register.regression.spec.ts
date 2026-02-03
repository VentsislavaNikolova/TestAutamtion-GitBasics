import { test, expect } from '@playwright/test';

test.describe('Register Test Kazan Casino - Regression', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://kazancasino-stage.fsclub.tech');
        let registerButton = page.locator('.register-button-holder #buttonHeaderRegister');
        await registerButton.click();

    });

    test('register with invalid email', async ({ page }) => {

        const iframe = page.frameLocator('iframe#newRegistrationIframe');
        const emailfieldInput = iframe.getByTestId('email');

        await emailfieldInput.fill('invalidemail');

        const errorMessage = iframe.getByTestId('input-email-error');

        await expect(errorMessage, "The ERROR message was not visible for invalid email").toBeVisible();
    });

    test('register with invalid username', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');

        const emailfieldInput = iframe.getByTestId('email');
        const passwordInput = iframe.getByTestId('password');
        const usernameFieldInput = iframe.getByTestId('userName');

        await emailfieldInput.fill('#######+333@ventureslab.io');
        await passwordInput.fill('#######!');
        await usernameFieldInput.fill('inv');
        await emailfieldInput.click();

        const errorMessage = iframe.getByTestId('input-userName-error');

        await expect(errorMessage, "The errorMessage was not visible for invalid username").toBeVisible();
    });

    test('register with incorrect yearOfBirth', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');

        const emailfieldInput = iframe.getByTestId('email');
        const passwordInput = iframe.getByTestId('password');
        const usernameFieldInput = iframe.getByTestId('userName');
        const firstNameFieldInput = iframe.getByTestId('firstName');
        const lastNameFieldInput = iframe.getByTestId('lastName');
        const birthdayMonthFieldInput = iframe.getByTestId('dateOfBirth-MM');
        const birthdayDayFieldInput = iframe.getByTestId('dateOfBirth-DD');
        const birthdayYearFieldInput = iframe.getByTestId('dateOfBirth-YYYY');

        await emailfieldInput.fill('#######+333@######.io');
        await passwordInput.fill('#######!');
        await usernameFieldInput.fill('#######');
        await firstNameFieldInput.fill('#######');
        await lastNameFieldInput.fill('#######');
        await birthdayMonthFieldInput.fill('01');
        await birthdayDayFieldInput.fill('01');
        await birthdayYearFieldInput.fill('1900');
        const errorMessage = iframe.getByTestId('input-dateOfBirth-error');

        await expect(errorMessage, "The error message for incorrect yearOfBirth was not visible").toBeVisible();
    });

    test('register with short password', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');
        const passwordInput = iframe.getByTestId('password');
        const emailfieldInput = iframe.getByTestId('email');
        const errorMessage = iframe.getByTestId('input-password-error');

        await passwordInput.fill('short');
        await emailfieldInput.click();

        await expect(errorMessage, "The error message for short password was not visible").toBeVisible();
    });

    test('register without first name enetered', async ({ page }) => {

        const iframe = page.frameLocator('iframe#newRegistrationIframe');
        const emailfieldInput = iframe.getByTestId('email');
        const firstNameFieldInput = iframe.getByTestId('firstName');
        const createAccountButton = iframe.getByTestId('registration-submit-button');
        firstNameFieldInput.click();
        const errorMessage = iframe.getByTestId('input-firstName-error');


        await expect(errorMessage, "The error message for missing first name was not visible").toBeVisible();
    });

});       