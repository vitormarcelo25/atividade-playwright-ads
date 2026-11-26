// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Um teste por vez: o site é público e assim a execução fica mais estável. */
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/resultados.json' }],
  ],
  use: {
    baseURL: 'https://www.automationexercise.com',
    /* O site identifica vários campos com o atributo data-qa (usado por getByTestId). */
    testIdAttribute: 'data-qa',
    /* Guarda um print de cada teste no relatório (evidência). */
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
