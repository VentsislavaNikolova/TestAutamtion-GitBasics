import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import { HomePage } from "../wPages/homePage";
import { RegisterModal } from "./registerModal";

const LOGIN_MODAL_SELECTORS = {
  iframe: 'iframe#newLoginIframe'
};

const LOGIN_MODAL_TESTIDS = {
  userName: 'userName',
  password: 'password',
  loginSubmitButton: 'login-submit-button',
  registerButton: 'register-button',
  errorMessage: '.text-atoms-input-text-error',
  usernameError: 'input-userName-error',
  passwordError: 'input-password-error',
  resetPasswordButton: 'reset-password-button',
  reserPasswordEmailInput: 'identifier-input',
};

export class LoginModal {
  constructor(private page: Page) { }

  private iframe(): FrameLocator {
    return this.page.frameLocator(LOGIN_MODAL_SELECTORS.iframe);
  }

  private readonly usernameInput: Locator =
    this.iframe().getByTestId(LOGIN_MODAL_TESTIDS.userName);

  private readonly passwordInput: Locator =
    this.iframe().getByTestId(LOGIN_MODAL_TESTIDS.password);

  private readonly submitButton: Locator =
    this.iframe().getByTestId(LOGIN_MODAL_TESTIDS.loginSubmitButton);

  private readonly registerButton: Locator =
    this.iframe().getByTestId(LOGIN_MODAL_TESTIDS.registerButton);

  private readonly errorMessage: Locator =
    this.iframe().locator(LOGIN_MODAL_TESTIDS.errorMessage);

  private readonly resetPasswordEmailInput: Locator =
    this.iframe().getByTestId(LOGIN_MODAL_TESTIDS.reserPasswordEmailInput);


  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();

    return new HomePage(this.page);

  }

  async loginWithoutCredentials() {
    await this.submitButton.click();
  }

  async submit() {
    await this.submitButton.click();
  }

  async navigateToResetPassword() {
    await this.iframe().getByTestId(LOGIN_MODAL_TESTIDS.resetPasswordButton).click();
  }

  async expectResetPasswordFormVisible() {
    await expect(this.resetPasswordEmailInput, "The reset password email input is NOT visible").toBeVisible();
  }

  async expectErrorMessageVisible() {
    await expect(this.errorMessage, "The error message is NOT visible").toBeVisible();
  }

  async expectUsernameErrorMessageVisible() {
    await expect(this.errorMessage, "The username error message is NOT visible").toBeVisible();
  }

  async expectPasswordErrorMessageVisible() {
    await expect(this.errorMessage, "The password error message is NOT visible").toBeVisible();
  }

  async navigateToRegister(): Promise<RegisterModal> {
    await this.registerButton.click();
    return new RegisterModal(this.page);
  }

  async expectLoginModalVisible() {
    await expect(this.usernameInput, "The username input field is NOT visible").toBeVisible();
  }

}
