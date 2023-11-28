import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('should find word in the browser', async ({ page }) => {
  const toFind = "cheese"
  await page.goto('https://www.startpage.com/');
  await page.fill('input[id=q]', toFind);
  page.press('input[id=q]', 'Enter');
  await page.waitForLoadState();

  const firstResult = await page.waitForSelector('div.sidebar-results p');
  const content = await firstResult.textContent();
  console.log(`${toFind}: ${content}`);

  await expect(content).toContain('Cheese');
})
