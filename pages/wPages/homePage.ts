import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { Button } from "../components/button";

// Изнесени селектори / testIds
const HOME_PAGE_SELECTORS = {
    loginButton: '#buttonHeaderLogin',
};

const HOME_PAGE_TESTIDS = {
    loggedUserName: 'loggedUserName',
    logoutButton: 'logout',
};

export class HomePage extends BasePage {
    private readonly loggedUserName: Locator;
    private readonly logoutButton: Button;
    private readonly loginButton: Button;

    constructor(page: Page) {
        super(page);
        this.loggedUserName = page.getByTestId(HOME_PAGE_TESTIDS.loggedUserName);
        this.logoutButton = new Button(page, HOME_PAGE_TESTIDS.logoutButton);
        this.loginButton = new Button(page, HOME_PAGE_SELECTORS.loginButton);
    }

    async expectUserIsLoggedIn(expectedUsername: string) {
        await expect(this.loggedUserName, 'Logged in user name is not visible').toBeVisible();
        await expect(this.loggedUserName, `Expected logged in user name to be "${expectedUsername}"`).toHaveText(expectedUsername);
    }

    async logout() {
        await this.loggedUserName.click();
        await this.logoutButton.click();
    }

    async expectUserIsLoggedOut() {
        await expect(this.loginButton.button, 'Login button is not visible after logout').toBeVisible();
    }
}
