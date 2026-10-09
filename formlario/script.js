// Passo 2: captura dos elementos do DOM
const form = document.getElementById('cadastroForm');

const campos = {
  nome:    { input: document.getElementById('nome'),          erro: document.getElementById('erroNome') },
  email:   { input: document.getElementById('email'),         erro: document.getElementById('erroEmail') },
  senha:   { input: document.getElementById('senha'),         erro: document.getElementById('erroSenha') },
  confirma:{ input: document.getElementById('confirmaSenha'), erro: document.getElementById('erroConfirma') },
  perfil:  { input: document.getElementById('perfil'),        erro: document.getElementById('erroPerfil') },
  termos:  { input: document.getElementById('termos'),        erro: document.getElementById('erroTermos') }
};

const saida = document.getElementById('saida');
const vazio = document.getElementById('vazio');
const sucesso = document.getElementById('sucesso');

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mostrarErro(campo, mensagem) {
  campo.erro.textContent = mensagem;
  campo.input.classList.add('invalido');
}

function limparErros() {
  Object.values(campos).forEach(function (campo) {
    campo.erro.textContent = '';
    campo.input.classList.remove('invalido');
  });
}

// Retorna true se todos os campos forem válidos
function validar(dados) {
  let valido = true;

  if (dados.nome === '') {
    mostrarErro(campos.nome, 'Informe seu nome completo.');
    valido = false;
  } else if (dados.nome.split(/\s+/).length < 2) {
    mostrarErro(campos.nome, 'Digite nome e sobrenome.');
    valido = false;
  }

  if (dados.email === '') {
    mostrarErro(campos.email, 'Informe seu e-mail.');
    valido = false;
  } else if (!regexEmail.test(dados.email)) {
    mostrarErro(campos.email, 'Formato inválido. Exemplo: nome@exemplo.com');
    valido = false;
  }

  if (dados.senha === '') {
    mostrarErro(campos.senha, 'Crie uma senha.');
    valido = false;
  } else if (dados.senha.length < 6) {
    mostrarErro(campos.senha, 'A senha deve ter no mínimo 6 caracteres.');
    valido = false;
  }

  if (dados.confirma === '') {
    mostrarErro(campos.confirma, 'Confirme a senha.');
    valido = false;
  } else if (dados.senha !== dados.confirma) {
    mostrarErro(campos.confirma, 'As senhas não conferem.');
    valido = false;
  }

  if (dados.perfil === '') {
    mostrarErro(campos.perfil, 'Selecione um perfil técnico.');
    valido = false;
  }

  if (!dados.termos) {
    mostrarErro(campos.termos, 'É necessário aceitar os termos de uso.');
    valido = false;
  }

  return valido;
}

// Passo 3: tratamento do evento submit
form.addEventListener('submit', function (evento) {
  // Impede o recarregamento da página (submissão padrão)
  evento.preventDefault();

  limparErros();
  sucesso.hidden = true;

  const dados = {
    nome:    campos.nome.input.value.trim(),
    email:   campos.email.input.value.trim(),
    senha:   campos.senha.input.value,
    confirma:campos.confirma.input.value,
    perfil:  campos.perfil.input.value,
    termos:  campos.termos.input.checked
  };

  // Passo 4: se houver erro, mensagens aparecem na interface e o envio é interrompido
  if (!validar(dados)) {
    return;
  }

  // Atualização dinâmica do DOM com os dados validados (a senha nunca é exibida)
  document.getElementById('saidaNome').textContent = dados.nome;
  document.getElementById('saidaEmail').textContent = dados.email;
  document.getElementById('saidaPerfil').textContent = dados.perfil;
  document.getElementById('saidaTermos').textContent = 'Aceitos';

  vazio.hidden = true;
  saida.hidden = false;
  sucesso.hidden = false;

  // Limpa o formulário
  form.reset();
  campos.nome.input.focus();
});

// Remove a mensagem de erro de um campo assim que o usuário volta a editá-lo
Object.values(campos).forEach(function (campo) {
  const evento = campo.input.type === 'checkbox' || campo.input.tagName === 'SELECT' ? 'change' : 'input';
  campo.input.addEventListener(evento, function () {
    campo.erro.textContent = '';
    campo.input.classList.remove('invalido');
  });
});
