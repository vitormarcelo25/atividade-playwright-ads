// Copia o relatório HTML da última execução para a pasta enviada ao GitHub.
const fs = require('fs');
const path = require('path');

const origem = path.join(__dirname, '..', 'playwright-report');
const destino = path.join(__dirname, '..', 'evidencias', 'relatorio-html');

if (!fs.existsSync(origem)) {
  console.error('Relatório não encontrado. Rode "npm test" primeiro.');
  process.exit(1);
}
fs.cpSync(origem, destino, { recursive: true });
console.log(`Relatório copiado para ${destino}`);
