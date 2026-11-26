const { test, expect, abrirPaginaInicial } = require('../support/fixtures');
const { abrirTelaDeLogin, fazerLogin } = require('../support/login');

test('TC04 - Logout User', {
  annotation: { type: 'description', description: 'Faz login, sai da conta e valida o retorno à tela de login.' },
}, async ({ page, contaExistente }) => {
  await abrirPaginaInicial(page);
  await abrirTelaDeLogin(page);
  await fazerLogin(page, contaExistente.email, contaExistente.senha);
  await expect(page.getByText(`Logged in as ${contaExistente.nome}`)).toBeVisible();

  await page.getByRole('link', { name: 'Logout' }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
});
