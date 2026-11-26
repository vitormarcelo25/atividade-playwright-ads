const base = require('@playwright/test');
const { gerarUsuario, criarContaPelaApi, excluirContaPelaApi } = require('./usuario');

const { expect } = base;

// Domínios de anúncios que podem cobrir botões e quebrar os testes.
const ANUNCIOS = /googlesyndication|doubleclick|googleadservices|adservice\.google|fundingchoicesmessages/;

const test = base.test.extend({
  context: async ({ context }, use) => {
    await context.route(ANUNCIOS, (route) => route.abort());
    await use(context);
  },

  // Dados de um usuário que ainda não existe. A conta é apagada ao final,
  // mesmo que o teste falhe no meio.
  novoUsuario: async ({ request }, use) => {
    const usuario = gerarUsuario();
    await use(usuario);
    await excluirContaPelaApi(request, usuario);
  },

  // Conta criada pela API antes do teste e apagada depois dele.
  contaExistente: async ({ novoUsuario, request }, use) => {
    await criarContaPelaApi(request, novoUsuario);
    await use(novoUsuario);
  },
});

// Passos 1 a 3, comuns a todos os casos de teste.
async function abrirPaginaInicial(page) {
  await page.goto('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page.locator('#slider')).toBeVisible();
}

module.exports = { test, expect, abrirPaginaInicial };
