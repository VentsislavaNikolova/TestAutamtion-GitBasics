import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import { LoginModal } from "./loginModal";

const REGISTER_MODAL_SELECTORS = {
    iframe: 'iframe#newRegistrationIframe',
    userCountryCodeSelect: '[data-testid="userCountryCode"] select',
};

const REGISTER_MODAL_TESTIDS = {
    email: 'email',
    password: 'password',
    userName: 'userName',
    firstName: 'firstName',
    lastName: 'lastName',
    dateOfBirthMM: 'dateOfBirth-MM',
    dateOfBirthDD: 'dateOfBirth-DD',
    dateOfBirthYYYY: 'dateOfBirth-YYYY',
    address: 'address',
    city: 'city',
    zipCode: 'zipCode',
    phone: 'phone',
    acceptTermsAndConditions: 'acceptTermsAndConditions',
    acceptAttestation: 'acceptAttestation',
    registrationSubmitButton: 'registration-submit-button',
    loginAccountButton: 'registration-sign-in-button',
    playButton: 'play-button',
};

export class RegisterModal {
    constructor(private page: Page) { }

    private iframe(): FrameLocator {
        return this.page.frameLocator(REGISTER_MODAL_SELECTORS.iframe);
    }

    private readonly emailField: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.email);
    private readonly passwordInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.password);
    private readonly usernameFieldInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.userName);
    private readonly firstNameFieldInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.firstName);
    private readonly lastNameFieldInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.lastName);
    private readonly birthdayMonthFieldInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.dateOfBirthMM);
    private readonly birthdayDayFieldInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.dateOfBirthDD);
    private readonly birthdayYearFieldInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.dateOfBirthYYYY);
    private readonly addressInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.address);
    private readonly cityfieldInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.city);
    private readonly zipCodeFieldInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.zipCode);
    private readonly countryDropdown: Locator = this.iframe().locator(REGISTER_MODAL_SELECTORS.userCountryCodeSelect);
    private readonly phoneFieldInput: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.phone);
    private readonly termsCheckbox: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.acceptTermsAndConditions);
    private readonly infoCheckbox: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.acceptAttestation);
    private readonly createAccountButton: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.registrationSubmitButton);
    private readonly loginAccountButton: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.loginAccountButton);
    private readonly playButton: Locator = this.iframe().getByTestId(REGISTER_MODAL_TESTIDS.playButton);

    async registerUser(
        email: string,
        password: string,
        username: string,
        firstName: string,
        lastName: string,
        birthMonth: string,
        birthDay: string,
        birthYear: string,
        address: string,
        city: string,
        zipCode: string,
        countryCode: string,
        phone: string
    ) {
        this.fillRegistrationFormField(
            email,
            password,
            username,
            firstName,
            lastName,
            birthMonth,
            birthDay,
            birthYear,
            address,
            city,
            zipCode,
            countryCode,
            phone
        );

        await this.createAccountButton.click();
    }

    async fillRegistrationFormField(
        email: string,
        password: string,
        username: string,
        firstName: string,
        lastName: string,
        birthMonth: string,
        birthDay: string,
        birthYear: string,
        address: string,
        city: string,
        zipCode: string,
        countryCode: string,
        phone: string
    ) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillUsername(username);
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillBirthDate(birthDay, birthMonth, birthYear);
        await this.fillAddress(address);
        await this.fillCity(city);
        await this.fillZipCode(zipCode);
        await this.fillCountry(countryCode);
        await this.fillPhone(phone);
        await this.checkTermsAndConditions();
        await this.checkInfoAttestation();

    }

    async navigateToLogin(): Promise<LoginModal> {
        await this.loginAccountButton.click();
        return new LoginModal(this.page);
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillUsername(username: string) {
        await this.usernameFieldInput.fill(username);
    }

    async fillFirstName(firstName: string) {
        await this.firstNameFieldInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameFieldInput.fill(lastName);
    }

    async fillBirthDate(birthDay: string, birthMonth: string, birthYear: string) {
        await this.birthdayDayFieldInput.fill(birthDay);
        await this.birthdayMonthFieldInput.fill(birthMonth);
        await this.birthdayYearFieldInput.fill(birthYear);
    }

    async fillAddress(address: string) {
        await this.addressInput.fill(address);
    }
    
    async fillCity(city: string) {
        await this.cityfieldInput.fill(city);
    }

    async fillZipCode(zipCode: string) {
        await this.zipCodeFieldInput.fill(zipCode);
    }

    async fillPhone(phone: string) {
        await this.phoneFieldInput.fill(phone);
    }

    async fillCountry(countryCode: string) {
        await this.countryDropdown.selectOption(countryCode);
    }

    async checkTermsAndConditions() {
        await this.termsCheckbox.check();
    }

    async checkInfoAttestation() {
        await this.infoCheckbox.check();
    }

    async clickOutsideTestedField() {
        await this.emailField.click();
    }

    async submit() {
        await this.firstNameFieldInput.click();
    }

    async expectMissingFirstNameError() {
        const errorMessage = this.iframe().getByTestId('input-firstName-error');
        await expect(errorMessage, "The error message for missing first name was not visible").toBeVisible();
    }

    async expectShortPasswordError() {
        const errorMessage = this.iframe().getByTestId('input-password-error');
        await expect(errorMessage, "The error message for short password was not visible").toBeVisible();
    }

    async expectInvalidBirthDateError() {
        const errorMessage = this.iframe().getByTestId('input-dateOfBirth-error');
        await expect(errorMessage, "The error message for incorrect yearOfBirth was not visible").toBeVisible();
    }

    async expectInvalidUsernameError() {
        const errorMessage = this.iframe().getByTestId('input-userName-error');
        await expect(errorMessage, "The error message for invalid username was not visible").toBeVisible();
    }

    async expectInvalidEmailError() {
        const errorMessage = this.iframe().getByTestId('input-email-error');
        await expect(errorMessage, "The ERROR message was not visible for invalid email").toBeVisible();
    }

    async expectRegistrationModalVisible() {
        await expect(this.emailField, "The registration form is NOT visible").toBeVisible();
    }

    async expectPlayButtonVisible() {
        await expect(this.playButton, "The play button is NOT visible").toBeVisible();
    }

}