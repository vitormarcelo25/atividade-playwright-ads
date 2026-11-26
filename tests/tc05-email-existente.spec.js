const { test, expect, abrirPaginaInicial } = require('../support/fixtures');
const { abrirTelaDeLogin } = require('../support/login');

test('TC05 - Register User with existing email', {
  annotation: { type: 'description', description: 'Impede o cadastro com um e-mail já usado.' },
}, async ({ page, contaExistente }) => {
  await abrirPaginaInicial(page);
  await abrirTelaDeLogin(page);

  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  await page.getByTestId('signup-name').fill(contaExistente.nome);
  await page.getByTestId('signup-email').fill(contaExistente.email);
  await page.getByTestId('signup-button').click();

  await expect(page.getByText('Email Address already exist!')).toBeVisible();
});
