import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/wPages/landingPage';
import { LoginModal } from '../pages/modals/loginModal';
import { HomePage } from '../pages/wPages/homePage';
import { invalidUser, validUser } from '../test-data/credentials';
import { RegisterModal } from '../pages/modals/registerModal';

test.describe('Login Test Kazan Casino - Regression', () => {
  let landingPage: LandingPage;
  let loginModal: LoginModal;
  let homePage: HomePage;
  let registerModal: RegisterModal;
  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.navigate();
    loginModal = await landingPage.openLogin();
  });
  test('login in kazancasino', async ({ page }) => {

    homePage = await loginModal.login(validUser.username, validUser.password);
    await homePage.expectUserIsLoggedIn(validUser.displayName);
  });

  test('login with invalid password', async ({ page }) => {

    await loginModal.login(validUser.username, invalidUser.password);
    await loginModal.expectErrorMessageVisible()
  });

  test('login with invalid username', async ({ page }) => {

    await loginModal.login(invalidUser.username, validUser.password);
    await loginModal.expectErrorMessageVisible()
  });

  test('navigate to reset password', async ({ page }) => {
    await loginModal.navigateToResetPassword();
    await loginModal.expectResetPasswordFormVisible();
  });
  test('createAccountButton works', async ({ page }) => {

    registerModal = await loginModal.navigateToRegister();
    await registerModal.expectRegistrationModalVisible();
  });

});