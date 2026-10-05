import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/customer.json');

setup('authenticate as customer', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('nav-sign-in').click();
  await page.getByTestId('email').fill(process.env.CUSTOMER_EMAIL!);
  await page.getByTestId('password').fill(process.env.CUSTOMER_PASSWORD!);
  await page.getByTestId('login-submit').click();

  // Vérification que le login a réussi
  await expect(page.getByTestId('page-title')).toContainText(/My account|Mon compte/i);

  // Sauvegarde de la session
  await page.context().storageState({ path: authFile });
});