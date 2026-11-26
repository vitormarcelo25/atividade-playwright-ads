const { test, expect, abrirPaginaInicial } = require('../support/fixtures');
const { abrirTelaDeLogin, fazerLogin } = require('../support/login');
const { gerarUsuario } = require('../support/usuario');

test('TC03 - Login User with incorrect email and password', {
  annotation: { type: 'description', description: 'Valida a mensagem de erro no login com dados incorretos.' },
}, async ({ page }) => {
  const usuarioInexistente = gerarUsuario();

  await abrirPaginaInicial(page);
  await abrirTelaDeLogin(page);
  await fazerLogin(page, usuarioInexistente.email, usuarioInexistente.senha);

  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});
