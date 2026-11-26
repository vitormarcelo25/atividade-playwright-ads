const { test, expect, abrirPaginaInicial } = require('../support/fixtures');

test('TC10 - Verify Subscription in home page', {
  annotation: { type: 'description', description: 'Inscreve um e-mail pelo rodapé da página inicial.' },
}, async ({ page }) => {
  await abrirPaginaInicial(page);

  const rodape = page.locator('#footer');
  await rodape.scrollIntoViewIfNeeded();
  await expect(rodape.getByRole('heading', { name: 'Subscription' })).toBeVisible();

  await rodape.getByPlaceholder('Your email address').fill('aluno.teste@example.com');
  await rodape.locator('#subscribe').click();

  await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();
});
