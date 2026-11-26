const { test, expect, abrirPaginaInicial } = require('../support/fixtures');
const { abrirTelaDeLogin, fazerLogin } = require('../support/login');

test('TC02 - Login User with correct email and password', {
  annotation: { type: 'description', description: 'Faz login com dados corretos e exclui a conta.' },
}, async ({ page, contaExistente }) => {
  await abrirPaginaInicial(page);
  await abrirTelaDeLogin(page);
  await fazerLogin(page, contaExistente.email, contaExistente.senha);

  await expect(page.getByText(`Logged in as ${contaExistente.nome}`)).toBeVisible();
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByTestId('account-deleted')).toHaveText(/account deleted!/i);
});
