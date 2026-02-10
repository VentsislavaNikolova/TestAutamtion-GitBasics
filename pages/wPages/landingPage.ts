import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { RegisterModal } from "../modals/registerModal";
import { LoginModal } from "../modals/loginModal";
import { CasinoPage } from "./casinoPage";

const LANDING_SELECTORS = {
  registerButton: '.register-button-holder #buttonHeaderRegister',
  loginButton: '.user-login-button #buttonHeaderLogin',
  casinoLink: '#navCasino',
};

export class LandingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.page.goto('https://kazancasino-stage.fsclub.tech');
  }

  private registerButton: Locator = this.page.locator(LANDING_SELECTORS.registerButton);
  private loginButton: Locator = this.page.locator(LANDING_SELECTORS.loginButton);
  private casinoLink: Locator = this.page.locator(LANDING_SELECTORS.casinoLink);
   
  async openRegister(): Promise<RegisterModal> {
    await this.registerButton.click();
    return new RegisterModal(this.page);
  }

  async openLogin(): Promise<LoginModal> {
    await this.loginButton.click();
    return new LoginModal(this.page);
  }

  async goToCasino(): Promise<CasinoPage> {
    await this.casinoLink.click();
    return new CasinoPage(this.page);
  }

  async loginButtonIsVisible() {
    return this.loginButton.isVisible();
  }
}
