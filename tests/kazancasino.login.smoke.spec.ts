import { test } from '@playwright/test';
import { LandingPage } from '../pages/wPages/landingPage';
import { LoginModal } from '../pages/modals/loginModal';
import { validUser } from '../test-data/credentials';
import { HomePage } from '../pages/wPages/homePage';


test.describe('Login Test Kazan Casino - Smoke', () => {
  let landingPage: LandingPage;
  let loginModal: LoginModal;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.navigate();
    loginModal = await landingPage.openLogin();
  });

  test('login in kazancasino', async () => {
    homePage = await loginModal.login(validUser.username, validUser.password);

    await homePage.expectUserIsLoggedIn(validUser.displayName);
  });

  test('logout successfully', async () => {
    homePage = await loginModal.login(
      validUser.username,
      validUser.password
    );

    await homePage.logout();
    await landingPage.loginButtonIsVisible();
  });
});