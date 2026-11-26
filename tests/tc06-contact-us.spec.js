const path = require('path');
const { test, expect, abrirPaginaInicial } = require('../support/fixtures');

test('TC06 - Contact Us Form', {
  annotation: { type: 'description', description: 'Envia o formulário de contato com um arquivo anexado.' },
}, async ({ page }) => {
  await abrirPaginaInicial(page);
  await page.locator('.navbar-nav').getByRole('link', { name: 'Contact us' }).click();
  await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();

  await page.getByTestId('name').fill('Aluno Teste');
  await page.getByTestId('email').fill('aluno.teste@example.com');
  await page.getByTestId('subject').fill('Teste automatizado');
  await page.getByTestId('message').fill('Mensagem ficticia enviada pelo Playwright.');
  await page.locator('input[name="upload_file"]').setInputFiles(
    path.join(__dirname, '..', 'arquivos', 'arquivo-teste.txt')
  );

  // Espera os scripts da página, que são os responsáveis pela janela de confirmação.
  await page.waitForLoadState('load');
  // Precisa ser registrado antes do clique, para apertar "OK" na janela.
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByTestId('submit-button').click();

  await expect(page.locator('.status.alert-success')).toHaveText(
    'Success! Your details have been submitted successfully.'
  );
  await page.locator('#form-section').getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('https://www.automationexercise.com/');
  await expect(page.locator('#slider')).toBeVisible();
});
