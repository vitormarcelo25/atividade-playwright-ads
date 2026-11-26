const { test, expect, abrirPaginaInicial } = require('../support/fixtures');

test('TC09 - Search Product', {
  annotation: { type: 'description', description: 'Pesquisa um produto e valida os resultados.' },
}, async ({ page }) => {
  const termo = 'Blue Top';

  await abrirPaginaInicial(page);
  await page.locator('.navbar-nav a[href="/products"]').click();
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

  await page.waitForLoadState('load');
  await page.getByPlaceholder('Search Product').fill(termo);
  await page.locator('#submit_search').click();
  await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();

  const nomes = page.locator('.features_items .productinfo p');
  await expect(nomes.first()).toBeVisible();
  for (const nome of await nomes.all()) {
    await expect(nome).toBeVisible();
    await expect(nome).toContainText(termo, { ignoreCase: true });
  }
});
