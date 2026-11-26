# Atividade Playwright - ADS

Automação dos 10 primeiros casos de teste do site
[Automation Exercise](https://www.automationexercise.com/test_cases),
com JavaScript e Playwright Test. Disciplina: Teste e Qualidade de Software.

## Integrantes

| Nome | Papel |
|---|---|
| Vitor Marcelo Araújo Santana | Front-end |
| Sabrina Kayllane | Front-end |
| Kawan Karlos Santos de Sena | Back-end |
| David Ranielly Pereira Silva | Back-end |
| Antonio Guilherme Xavier Caminha | Banco de Dados |

## Instalação

É preciso ter o Node.js e o Git instalados.

```bash
npm install
npx playwright install chromium
```

## Execução

| Comando | O que faz |
|---|---|
| `npm test` | Roda os 10 testes no Chromium |
| `npm run test:headed` | Roda mostrando o navegador |
| `npx playwright test tc03` | Roda apenas um caso de teste |
| `npm run report` | Abre o relatório HTML |
| `npm run evidencias` | Copia o relatório para `evidencias/relatorio-html` |

## Casos de teste

| Arquivo em `tests/` | Cenário |
|---|---|
| `tc01-register-user.spec.js` | Register User |
| `tc02-login-valido.spec.js` | Login User with correct email and password |
| `tc03-login-invalido.spec.js` | Login User with incorrect email and password |
| `tc04-logout.spec.js` | Logout User |
| `tc05-email-existente.spec.js` | Register User with existing email |
| `tc06-contact-us.spec.js` | Contact Us Form |
| `tc07-test-cases-page.spec.js` | Verify Test Cases Page |
| `tc08-produtos-e-detalhe.spec.js` | Verify All Products and product detail page |
| `tc09-busca-de-produto.spec.js` | Search Product |
| `tc10-subscription.spec.js` | Verify Subscription in home page |

## Organização

- `support/`: código reaproveitado (dados fictícios, login e preparação dos testes).
- `arquivos/`: arquivo anexado no TC06.
- `scripts/`: cópia do relatório para as evidências.

## Dados de teste

- Todos os dados são fictícios, e cada cadastro usa um e-mail único.
- Nos cenários que exigem uma conta existente (TC02, TC04 e TC05), ela é criada
  pela API do site antes do teste, para que um teste não dependa do outro.
- Ao final, o código solicita à API a exclusão da conta, mesmo se o teste falhar.
- Os domínios de anúncios são bloqueados, para não cobrirem os botões.

## Evidências

Veja o resultado de cada cenário em [evidencias/resultados.md](evidencias/resultados.md).
