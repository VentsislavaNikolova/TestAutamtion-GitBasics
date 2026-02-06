import { test } from '@playwright/test';
import { LandingPage } from '../pages/wPages/landingPage';

test('navigate to casino page', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.navigate();
  const casinoPage = await landingPage.goToCasino();

  await casinoPage.expectIsOpened();
});
