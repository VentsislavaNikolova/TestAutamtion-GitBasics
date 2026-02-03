import test, { expect } from "@playwright/test";

test.describe('Register Test Kazan Casino - Smoke', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://kazancasino-stage.fsclub.tech');
        let registerButton = page.locator('.register-button-holder #buttonHeaderRegister');
        await registerButton.click();

    });
    test('register user', async ({ page }) => {

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

    test('navigate to login page', async ({ page }) => {
        const iframe = page.frameLocator('iframe#newRegistrationIframe');
        const loginAccountButton = iframe.getByTestId('registration-sign-in-button');
        await loginAccountButton.click();

        const loginIframe = page.frameLocator('iframe#newLoginIframe');
        const loginSubmitButton = loginIframe.getByTestId('login-submit-button');

        await expect(loginSubmitButton, "The login submit button was not visible after navigating to login page").toBeVisible();
    });
});
