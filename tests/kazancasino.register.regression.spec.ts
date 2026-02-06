import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/wPages/landingPage';
import { RegisterModal } from '../pages/modals/registerModal';
import { invalidBirthYear, invalidEmail, invalidPassword, invalidUsername, validBirthDay, validBirthMonth, validBirthYear, validEmail, validFirstName, validLastName, validPassword } from '../test-data/credentials';

test.describe('Register Test Kazan Casino - Regression', () => {
    let landingPage: LandingPage;
    let registerModal: RegisterModal;
    test.beforeEach(async ({ page }) => {

        landingPage = new LandingPage(page);
        await landingPage.navigate();
        registerModal = await landingPage.openRegister();

    });


    test('register with invalid email', async ({ page }) => {

        await registerModal.fillEmail(invalidEmail);

        await registerModal.expectInvalidEmailError();

    });

    test('register with invalid username', async ({ page }) => {

        await registerModal.fillEmail(validEmail);
        await registerModal.fillPassword(validPassword);
        await registerModal.fillUsername(invalidUsername);
        await registerModal.clickOutsideTestedField();

        await registerModal.expectInvalidUsernameError();
    });

    test('register with incorrect yearOfBirth', async ({ page }) => {

        await registerModal.fillBirthDate(validBirthDay, validBirthMonth, invalidBirthYear);

        await registerModal.expectInvalidBirthDateError();
    });

    test('register with short password', async ({ page }) => {

        await registerModal.fillPassword(invalidPassword);
        await registerModal.clickOutsideTestedField();

        await registerModal.expectShortPasswordError();
    });

    test('register without first name enetered', async ({ page }) => {

        await registerModal.submit();

        await registerModal.expectMissingFirstNameError();

    });

});       