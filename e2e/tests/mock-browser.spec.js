import { test, expect } from '@playwright/test';

// Configure mock API before each test.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    // Intercept form submission requests
    page.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the actual form submission
      return false; // To stop event propagation
    });
  });

  await page.route('http://localhost:8080/submit**', (route) => {
    // Return a mocked response
    route.fulfill({
      body: '<h1>Submitted data</h1><p id="username" name="username">Username: test</p><br><p id="email" name="email">Email: test@test.com</p>',
    });
  });
});

test('show username after mocked form submission', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  // Trigger the form submission
  await page.evaluate(() => {
    // eslint-disable-next-line no-undef
    document.querySelector('form').submit();
  });

  // Wait for navigation or any relevant state change after submission
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('Username')).toContainText('Username: test');
  await expect(page.getByText('Email')).toContainText('Email: test@test.com');
});
