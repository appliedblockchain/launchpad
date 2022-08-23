import { expect,test } from '@playwright/test';

test('first page has React in title and should redirect to /login', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle(/React/);

  await expect(page).toHaveURL(/.*login/);
});
