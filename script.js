// Array de perguntas e respostas
let dadosQuiz = [
  // Cada objeto representa uma pergunta do quiz
  {
    pergunta: "Somente três países do mundo utilizam urnas eletrônicas", // Texto da pergunta
    respostaCorreta: "falso", // Resposta correta (verdadeiro ou falso)
    linkInfo:
      "https://www.justicaeleitoral.jus.br/fato-ou-boato/checagens/eleicoes-2018-nao-e-verdade-que-so-tres-paises-usam-urna-eletronica/#", // Link para mais informações sobre a resposta
  },
  {
    pergunta: "As urnas eletrônicas no Brasil são auditáveis",
    respostaCorreta: "verdadeiro",
    linkInfo:
      "https://www.tre-se.jus.br/comunicacao/noticias/2023/Janeiro/voce-sabia-que-o-sistema-eletronico-de-votacao-e-totalmente-auditavel",
  },
  {
    pergunta:
      "Uma convenção de hackers em Las Vegas comprovou que as urnas eletrônicas brasileiras são hackeáveis",
    respostaCorreta: "falso",
    linkInfo:
      "https://www.justicaeleitoral.jus.br/fato-ou-boato/checagens/influenciador-portugues-mente-ao-afirmar-que-urna-eletronica-brasileira-foi-hackeada-nos-estados-unidos/#",
  },
  {
    pergunta:
      "A contagem de votos nas eleições brasileiras é feita por uma empresa terceirizada",
    respostaCorreta: "enganoso",
    linkInfo:
      "https://projetocomprova.com.br/publica%C3%A7%C3%B5es/contagem-de-votos-e-feita-pelo-tse-e-nao-por-empresa-terceirizada-como-afirma-post/",
  },
  {
    pergunta:
      "A maioria dos brasileiros já acreditou em desinformação sobre campanhas eleitorais",
    respostaCorreta: "verdadeiro",
    linkInfo:
      "https://www.estadao.com.br/estadao-verifica/brasileiros-acreditam-fake-news-eleitorais-pesquisa/",
  },
  {
    pergunta: "O eleitor pode votar em qualquer seção eleitoral",
    respostaCorreta: "falso",
    linkInfo:
      "https://www.tse.jus.br/comunicacao/noticias/2024/Marco/transferencia-temporaria-saiba-quais-sao-as-regras-para-poder-votar-em-outra-secao-eleitoral",
  },
  {
    pergunta:
      "Luis Roberto Barroso, atual presidente do STF, disse que eleição não se vence, se toma",
    respostaCorreta: "enganoso",
    linkInfo:
      "https://www.estadao.com.br/estadao-verifica/barroso-eleicao-nao-se-ganha-se-toma-enganoso/",
  },
  {
    pergunta:
      "As urnas eletrônicas atuais são exatamente iguais desde 1996, apenas com mudanças no layout",
    respostaCorreta: "falso",
    linkInfo:
      "https://lupa.uol.com.br/jornalismo/2022/08/17/urnas-eletronicas-1996",
  },
  {
    pergunta:
      "Os resultados das eleições no Brasil são divulgados no mesmo dia da votação",
    respostaCorreta: "verdadeiro",
    linkInfo:
      "https://www.tre-sc.jus.br/comunicacao/noticias/2024/Marco/eleicoes-2024-confira-o-que-acontece-apos-a-votacao-ate-a-divulgacao-dos-resultados",
  },
  {
    pergunta:
      "Em 2022, um site chamado Veja seu Voto quebrou a criptografia de urnas eletrônicas e revelou, a partir do número do CPF, em qual candidato eleitores votaram para presidente",
    respostaCorreta: "falso",
    linkInfo:
      "https://www.estadao.com.br/politica/estadao-verifica/site-veja-seu-voto-cpf/",
  },
];

// Variáveis para controlar o estado do quiz
let indiceAtual = 0; // Índice da pergunta atual
let acertos = 0; // Número de respostas corretas
let totalPerguntas = dadosQuiz.length; // Total de perguntas no quiz

// Função para iniciar o quiz
function iniciarQuiz() {
  mostrarPergunta(indiceAtual); // Mostra a primeira pergunta
  configurarBotoesResposta(); // Configura os botões de resposta
  configurarBotaoInfo(); // Configura o botão de informação
  configurarBotaoRestart(); // Configura o botão de reinício
}

// Função para mostrar a pergunta atual
function mostrarPergunta(indice) {
  const containerQuiz = document.getElementById("quizContainer"); // Obtém o contêiner do quiz
  containerQuiz.innerHTML = ""; // Limpa o conteúdo anterior

  const template = document.getElementById("questionTemplate"); // Obtém o template da pergunta
  const clone = document.importNode(template.content, true); // Clona o template
  const perguntaAtual = dadosQuiz[indice]; // Obtém a pergunta atual do array

  clone.querySelector(".questionText").textContent = `${indice + 1}. ${
    perguntaAtual.pergunta
  }`; // Define o texto da pergunta

  containerQuiz.appendChild(clone); // Adiciona a pergunta clonada ao contêiner do quiz
}

// Função para configurar os botões de resposta
function configurarBotoesResposta() {
  const botoesResposta = document.querySelectorAll(".buttons button"); // Obtém todos os botões de resposta

  botoesResposta.forEach((botao) => {
    botao.addEventListener("click", () => {
      // Adiciona um evento de clique a cada botão
      const respostaSelecionada = botao.textContent.toLowerCase(); // Obtém a resposta selecionada pelo usuário
      const respostaCorreta =
        dadosQuiz[indiceAtual].respostaCorreta.toLowerCase(); // Obtém a resposta correta
      const linkInfo = dadosQuiz[indiceAtual].linkInfo; // Obtém o link de informação
      const divFeedback = document.querySelector(".feedback"); // Obtém o elemento de feedback

      verificarResposta(
        respostaSelecionada,
        respostaCorreta,
        linkInfo,
        divFeedback
      ); // Verifica a resposta
    });
  });
}

// Função para verificar a resposta selecionada pelo usuário
function verificarResposta(
  respostaSelecionada,
  respostaCorreta,
  linkInfo,
  divFeedback
) {
  const proximoButton = document.querySelector(".nextButton"); // Obtém o botão de próxima pergunta
  const botoesResposta = document.querySelectorAll(".buttons button"); // Obtém todos os botões de resposta
  const respostaCorretaElement = document.querySelector(".respostaCorreta"); // Obtém o elemento de resposta correta

  proximoButton.style.display = "block"; // Mostra o botão de próxima pergunta
  botoesResposta.forEach((botao) => (botao.disabled = true)); // Desabilita todos os botões de resposta

  if (respostaSelecionada === respostaCorreta) {
    // Verifica se a resposta está correta
    divFeedback.textContent = "Resposta correta!"; // Define o feedback de resposta correta
    divFeedback.style.color = "black"; // Define a cor do texto do feedback
    divFeedback.style.marginTop = "20px"; // Adiciona margem acima do feedback
    divFeedback.style.marginBottom = "10px"; // Adiciona margem abaixo do feedback
    acertos++; // Incrementa o contador de acertos
  } else {
    // Se a resposta estiver incorreta
    divFeedback.innerHTML = `Ah não, você errou! Clique <a href="${linkInfo}" target="_blank">aqui</a> e entenda.`; // Define o feedback de resposta incorreta
    divFeedback.style.color = "black"; // Define a cor do texto do feedback
    divFeedback.style.marginTop = "20px"; // Adiciona margem acima do feedback
    divFeedback.style.marginBottom = "10px"; // Adiciona margem abaixo do feedback
    respostaCorretaElement.textContent = `Resposta correta: ${respostaCorreta}`; // Mostra a resposta correta
    respostaCorretaElement.style.display = "block"; // Exibe o elemento de resposta correta
  }

  atualizarPainelPontuacao(); // Atualiza o painel de pontuação
  proximoButton.addEventListener("click", proximaPergunta); // Adiciona um evento de clique ao botão de próxima pergunta
}

// Função para mostrar a próxima pergunta
function proximaPergunta() {
  indiceAtual++; // Incrementa o índice da pergunta atual
  if (indiceAtual < totalPerguntas) {
    // Verifica se ainda há perguntas
    mostrarPergunta(indiceAtual); // Mostra a próxima pergunta
    configurarBotoesResposta(); // Configura os botões de resposta
    resetarFeedback(); // Reseta o feedback
  } else {
    // Se não houver mais perguntas
    mostrarResultadoFinal(); // Mostra o resultado final
  }
}

// Função para resetar o feedback
function resetarFeedback() {
  const divFeedback = document.querySelector(".feedback"); // Obtém o elemento de feedback
  divFeedback.textContent = ""; // Limpa o texto do feedback
}

// Função para mostrar o resultado final
function mostrarResultadoFinal() {
  const containerQuiz = document.getElementById("quizContainer"); // Obtém o contêiner do quiz

  // Criar elemento <p> e definir seu conteúdo e estilo diretamente
  const resultadoFinal = document.createElement("p"); // Cria um elemento <p> para o resultado final
  resultadoFinal.textContent = "Você completou o quiz!"; // Define o texto do resultado final
  resultadoFinal.style.textAlign = "center"; // Centraliza o texto
  resultadoFinal.style.fontSize = "18px"; // Define o tamanho da fonte
  resultadoFinal.style.marginTop = "20px"; // Adiciona espaçamento superior

  // Limpar o conteúdo anterior e adicionar o novo elemento
  containerQuiz.innerHTML = ""; // Limpa o conteúdo do contêiner do quiz
  containerQuiz.appendChild(resultadoFinal); // Adiciona o elemento de resultado final ao contêiner do quiz

  // Mostrar o botão de reinício e atualizar o painel de pontuação
  const restartButton = document.getElementById("restartButton"); // Obtém o botão de reinício
  restartButton.style.display = "block"; // Exibe o botão de reinício
  document.getElementById(
    "scorePanel"
  ).textContent = `Acertos: ${acertos}/${totalPerguntas}`; // Atualiza o painel de pontuação
}

// Função para atualizar o painel de pontuação
function atualizarPainelPontuacao() {
  document.getElementById(
    "scorePanel"
  ).textContent = `Acertos: ${acertos}/${totalPerguntas}`; // Atualiza o texto do painel de pontuação
}

// Função para configurar o botão de informação
function configurarBotaoInfo() {
  const infoButton = document.getElementById("infoButton"); // Obtém o botão de informação
  const tooltip = document.getElementById("tooltip"); // Obtém o elemento de tooltip

  infoButton.addEventListener("mouseenter", () => {
    // Adiciona um evento de mouseover ao botão de informação
    const rect = infoButton.getBoundingClientRect(); // Obtém a posição do botão de informação
    tooltip.style.left = `${rect.left}px`; // Define a posição horizontal do tooltip
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`; // Define a posição vertical do tooltip
    tooltip.style.display = "block"; // Exibe o tooltip
  });

  infoButton.addEventListener("mouseleave", () => {
    // Adiciona um evento de mouseout ao botão de informação
    tooltip.style.display = "none"; // Oculta o tooltip
  });
}

// Função para configurar o botão de reinício
function configurarBotaoRestart() {
  const restartButton = document.getElementById("restartButton"); // Obtém o botão de reinício

  // Adicionar classe CSS ao botão de restart
  restartButton.classList.add("restartButton"); // Adiciona uma classe CSS ao botão de reinício

  restartButton.addEventListener("click", () => {
    // Adiciona um evento de clique ao botão de reinício
    indiceAtual = 0; // Reseta o índice da pergunta atual
    acertos = 0; // Reseta o contador de acertos
    mostrarPergunta(indiceAtual); // Mostra a primeira pergunta
    resetarFeedback(); // Reseta o feedback
    document.querySelector(".nextButton").style.display = "none"; // Oculta o botão de próxima pergunta
    restartButton.style.display = "none"; // Oculta o botão de reinício
    document.getElementById(
      "scorePanel"
    ).textContent = `Acertos: 0/${totalPerguntas}`; // Atualiza o painel de pontuação
    configurarBotoesResposta(); // Configura os botões de resposta
  });
}

// Inicializar o quiz
iniciarQuiz(); // Chama a função para iniciar o quiz
