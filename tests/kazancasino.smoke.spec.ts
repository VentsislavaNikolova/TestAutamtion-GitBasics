import { test, expect } from '@playwright/test';


test('navigate to casino page', async ({ page }) => {
  await page.goto('https://kazancasino-stage.fsclub.tech');
  const casinoLink = page.locator('#navCasino');
  await casinoLink.click();

  await expect(page).toHaveURL(/.*casino/);
});