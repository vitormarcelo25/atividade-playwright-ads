const { test, expect, abrirPaginaInicial } = require('../support/fixtures');
const { abrirTelaDeLogin } = require('../support/login');

test('TC01 - Register User', {
  annotation: { type: 'description', description: 'Cadastra um novo usuário e depois exclui a conta.' },
}, async ({ page, novoUsuario }) => {
  await abrirPaginaInicial(page);
  await abrirTelaDeLogin(page);

  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  await page.getByTestId('signup-name').fill(novoUsuario.nome);
  await page.getByTestId('signup-email').fill(novoUsuario.email);
  await page.getByTestId('signup-button').click();

  await expect(page.getByText('Enter Account Information')).toBeVisible();
  await page.locator('#id_gender1').check();
  await expect(page.locator('#name')).toHaveValue(novoUsuario.nome);
  await expect(page.locator('#email')).toHaveValue(novoUsuario.email);
  await page.getByTestId('password').fill(novoUsuario.senha);
  await page.getByTestId('days').selectOption('10');
  await page.getByTestId('months').selectOption('5');
  await page.getByTestId('years').selectOption('2000');
  await page.locator('#newsletter').check();
  await page.locator('#optin').check();

  await page.getByTestId('first_name').fill(novoUsuario.primeiroNome);
  await page.getByTestId('last_name').fill(novoUsuario.sobrenome);
  await page.getByTestId('company').fill(novoUsuario.empresa);
  await page.getByTestId('address').fill(novoUsuario.endereco);
  await page.getByTestId('address2').fill(novoUsuario.complemento);
  await page.getByTestId('country').selectOption(novoUsuario.pais);
  await page.getByTestId('state').fill(novoUsuario.estado);
  await page.getByTestId('city').fill(novoUsuario.cidade);
  await page.getByTestId('zipcode').fill(novoUsuario.cep);
  await page.getByTestId('mobile_number').fill(novoUsuario.celular);
  await page.getByTestId('create-account').click();

  await expect(page.getByTestId('account-created')).toHaveText(/account created!/i);
  await page.getByTestId('continue-button').click();
  await expect(page.getByText(`Logged in as ${novoUsuario.nome}`)).toBeVisible();

  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByTestId('account-deleted')).toHaveText(/account deleted!/i);
  await page.getByTestId('continue-button').click();
});
