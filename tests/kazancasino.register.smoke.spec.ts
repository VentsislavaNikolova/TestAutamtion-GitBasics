import { test } from "@playwright/test";
import { LandingPage } from "../pages/wPages/landingPage";
import { RegisterModal } from "../pages/modals/registerModal";
import { createSmokeUser } from "../test-data/users";

test.describe('Register Test Kazan Casino - Smoke', () => {
    let landingPage: LandingPage;
    let registerModal: RegisterModal;
    test.beforeEach(async ({ page }) => {

        landingPage = new LandingPage(page);
        await landingPage.navigate();
        registerModal = await landingPage.openRegister();

    });
    test('register user', async () => {

        const user = createSmokeUser();

        await registerModal.registerUser(user.email,
            user.password,
            user.username,
            user.firstName,
            user.lastName,
            user.birthMonth,
            user.birthDay,
            user.birthYear,
            user.address,
            user.city,
            user.zipCode,
            user.countryCode,
            user.phone);

        await registerModal.expectPlayButtonVisible();

    });

    test('navigate to login page', async () => {

        const loginModal = await registerModal.navigateToLogin();

        await loginModal.expectLoginModalVisible();
    });
});
