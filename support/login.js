const { expect } = require('@playwright/test');

async function abrirTelaDeLogin(page) {
  await page.locator('.navbar-nav').getByRole('link', { name: 'Signup / Login' }).click();
}

async function fazerLogin(page, email, senha) {
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(senha);
  await page.getByTestId('login-button').click();
}

module.exports = { abrirTelaDeLogin, fazerLogin };
