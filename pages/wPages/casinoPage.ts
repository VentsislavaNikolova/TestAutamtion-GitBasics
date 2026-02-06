// pages/wPages/casinoPage.ts
import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CasinoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectIsOpened() {
    await expect(this.page).toHaveURL(/.*casino/);
  }
}
