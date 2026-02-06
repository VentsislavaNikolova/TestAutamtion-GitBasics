import { Locator, Page, expect } from "@playwright/test";

export class Button {
  readonly button: Locator;

  constructor(page: Page, selector: string) {
    this.button = page.getByTestId(selector);
  }

  async click() {
    await this.button.click();
  }

  async expectVisible() {
    await expect(this.button).toBeVisible();
  }

  async expectDisabled() {
    await expect(this.button).toBeDisabled();
  }

  async expectText(text: string) {
    await expect(this.button).toHaveText(text);
  }
}
