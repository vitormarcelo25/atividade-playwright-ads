const { expect } = require('@playwright/test');

// Gera dados fictícios com e-mail único, para o teste poder rodar várias vezes.
function gerarUsuario() {
  const id = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
  return {
    nome: 'Aluno Teste',
    email: `aluno.teste.${id}@example.com`,
    senha: `Senha-ficticia-${id}`,
    primeiroNome: 'Aluno',
    sobrenome: 'Teste',
    empresa: 'Empresa Ficticia',
    endereco: 'Rua das Flores, 100',
    complemento: 'Sala 2',
    pais: 'Canada',
    estado: 'Ontario',
    cidade: 'Toronto',
    cep: '12345',
    celular: '11999999999',
  };
}

async function criarContaPelaApi(request, usuario) {
  const resposta = await request.post('/api/createAccount', {
    form: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: 'Mr',
      birth_date: '10',
      birth_month: '5',
      birth_year: '2000',
      firstname: usuario.primeiroNome,
      lastname: usuario.sobrenome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.complemento,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular,
    },
  });
  // A API informa o resultado no corpo da resposta (responseCode).
  const corpo = await resposta.json();
  expect(corpo.responseCode, corpo.message).toBe(201);
}

// Usada como limpeza. Se o teste já excluiu a conta, a API só avisa que ela não existe.
async function excluirContaPelaApi(request, usuario) {
  await request.delete('/api/deleteAccount', {
    form: { email: usuario.email, password: usuario.senha },
  });
}

module.exports = { gerarUsuario, criarContaPelaApi, excluirContaPelaApi };
