const { test, expect, abrirPaginaInicial } = require('../support/fixtures');

test('TC07 - Verify Test Cases Page', {
  annotation: { type: 'description', description: 'Valida a navegação até a página Test Cases.' },
}, async ({ page }) => {
  await abrirPaginaInicial(page);
  await page.locator('.navbar-nav').getByRole('link', { name: 'Test Cases' }).click();

  await expect(page).toHaveURL(/\/test_cases$/);
  await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible();
});
