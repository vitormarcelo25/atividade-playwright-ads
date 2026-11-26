const { test, expect, abrirPaginaInicial } = require('../support/fixtures');

test('TC08 - Verify All Products and product detail page', {
  annotation: { type: 'description', description: 'Valida a lista de produtos e os detalhes do primeiro.' },
}, async ({ page }) => {
  await abrirPaginaInicial(page);
  await page.locator('.navbar-nav a[href="/products"]').click();

  await expect(page).toHaveURL(/\/products$/);
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();

  await page.getByRole('link', { name: 'View Product' }).first().click();
  await expect(page).toHaveURL(/\/product_details\/1$/);

  const detalhes = page.locator('.product-information');
  await expect(detalhes.getByRole('heading')).toHaveText(/\S+/);
  await expect(detalhes.getByText(/Category:\s*\S+/)).toBeVisible();
  await expect(detalhes.getByText(/^\s*Rs\.\s*\d+\s*$/)).toBeVisible();
  for (const campo of ['Availability', 'Condition', 'Brand']) {
    await expect(detalhes.locator('p', { hasText: `${campo}:` })).toHaveText(
      new RegExp(`${campo}:\\s*\\S+`)
    );
  }
});
