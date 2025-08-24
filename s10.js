// Banco de dados local das lições
const topico = {
  l1: [
  {
    tipo: "alternativa",
    pergunta: "'Vire à direita' em inglês é:",
    alternativas: ["Turn left", "Turn right", "Go straight", "Stop here"],
    correta: 1
  },
  {
    tipo: "escrever",
    pergunta: "Complete: '___ me, I’ll show you the way.' → (Follow / Wait / Take)",
    resposta: "Follow"
  },
  {
    tipo: "traduzir-en",
    pergunta: "'Espere por mim.' em inglês é:",
    resposta: "Wait for me"
  },
  {
    tipo: "traduzir-pt",
    pergunta: "'Go straight.' significa:",
    resposta: "Vá em frente"
  },
  {
    tipo: "alternativa",
    pergunta: "Qual NÃO é uma instrução de direção?",
    alternativas: ["Turn left", "Take a turn", "I need your help", "Stop here"],
    correta: 2
  }
],

l2: [
  {
    tipo: "alternativa",
    pergunta: "'Estou perdido, você pode me ajudar?' em inglês é:",
    alternativas: ["Can you show me…?", "I'm lost, can you help me?", "Where is…?", "I need your help"],
    correta: 1
  },
  {
    tipo: "escrever",
    pergunta: "Complete: '___ your help, please.' → (I need / I follow / I turn)",
    resposta: "I need"
  },
  {
    tipo: "traduzir-en",
    pergunta: "'Você pode me mostrar o caminho?' em inglês é:",
    resposta: "Can you show me the way?"
  },
  {
    tipo: "traduzir-pt",
    pergunta: "'Where is the nearest supermarket?' significa:",
    resposta: "Onde fica o supermercado mais próximo?"
  },
  {
    tipo: "alternativa",
    pergunta: "Qual frase é usada para pedir ajuda?",
    alternativas: ["Follow me", "Stop here", "Can you help me?", "Turn left"],
    correta: 2
  }
],

l3: [
  {
    tipo: "alternativa",
    pergunta: "'Obrigado' em inglês é:",
    alternativas: ["Thank you", "Thanks a lot", "I owe you one", "You're a lifesaver"],
    correta: 0
  },
  {
    tipo: "escrever",
    pergunta: "Complete: '___ your help, I found the way!' → (I appreciate / I follow / I turn)",
    resposta: "I appreciate"
  },
  {
    tipo: "traduzir-en",
    pergunta: "'Muito obrigado.' em inglês é:",
    resposta: "Thanks a lot."
  },
  {
    tipo: "traduzir-pt",
    pergunta: "'I owe you one.' significa:",
    resposta: "Eu lhe devo uma."
  },
  {
    tipo: "alternativa",
    pergunta: "Qual NÃO é uma expressão de agradecimento?",
    alternativas: ["Thank you", "Thanks a lot", "Can you help me?", "I appreciate your help"],
    correta: 2
  }
]

};

window.addEventListener("DOMContentLoaded", () => {
  // Descobrir qual lição esta página representa (ex: 'l1' de 'l1.html')
  const urlPath = window.location.pathname;
  const licaoChave = urlPath.split("/").pop().replace(".html", ""); // Resulta em "l1", "l2", etc.

  // Selecionar os elementos HTML usando as classes e IDs do SEU HTML.
  const explicacaoElem = document.querySelector(".explicacaoL");
  const comecarButton = explicacaoElem ? explicacaoElem.querySelector(".comecarL") : null;
  

  const lessonMainContainer = document.getElementById(licaoChave); // Ex: document.getElementById('l1')

  const questionElem = lessonMainContainer ? lessonMainContainer.querySelector(".perguntaL") : null;
  const alternativesBtns = lessonMainContainer ? lessonMainContainer.querySelectorAll(".btnAlternativa") : [];
  const nextButton = lessonMainContainer ? lessonMainContainer.querySelector(".proximaL") : null;
  const alertaSucesso = document.querySelector(".alertaSucesso");
  // Se você adicionar uma div com classe 'alertaFalha' no HTML, a selecione aqui:
   const alertaFalha = document.querySelector(".alertaFalha");
  

  const perguntas = topico[licaoChave];

  // Verificações de segurança e configuração inicial da UI.
  if (!perguntas || !explicacaoElem || !comecarButton || !lessonMainContainer || !questionElem) {
    console.error(`ERRO: Elementos HTML ou dados para a lição '${licaoChave}' não encontrados.
    Verifique:
    - Se o nome do arquivo HTML (ex: l1.html) corresponde à chave no 'topico' (ex: topico.l1).
    - Se as divs '.explicacaoL', '.licaoL' (com o ID correto), '.perguntaL', '.comecarL' existem no seu HTML.
    - Se 'topico.${licaoChave}' contém perguntas.`);
    if (explicacaoElem) {
        explicacaoElem.innerHTML = "<p style='color:red;'>Erro ao carregar a lição. Verifique os arquivos.</p>";
        explicacaoElem.style.display = "block";
    }
    if (lessonMainContainer) lessonMainContainer.style.display = "none";
    return;
  }

  // Garante que a div da lição esteja escondida ao carregar a página
  // e que a div de explicação esteja visível.
  lessonMainContainer.style.display = "none";
  explicacaoElem.style.display = "block";
  if (alertaSucesso) alertaSucesso.style.display = "none";
  // if (alertaFalha) alertaFalha.style.display = "none";


  let questaoAtual = 0;
  let correctAnswersCount = 0;

  // Lógica para o botão "Começar Lição"
  comecarButton.addEventListener("click", () => {
    explicacaoElem.style.display = "none";
    lessonMainContainer.style.display = "block";
    mostrarPergunta();
  });

  // Lógica para os botões de alternativa
  alternativesBtns.forEach((btn, i) => {
    btn.onclick = () => {
      if (perguntas[questaoAtual].tipo !== "alternativa") return;
      const correta = perguntas[questaoAtual].correta;
      const isCorrect = (i === correta);

      if (isCorrect) {
        correctAnswersCount++;
        btn.classList.add("certa");
      }
      else {
      btn.classList.add("errada");
    }
      setTimeout(proximaPergunta, 700);
    };
  });

  // Lógica para o botão "Próxima" (usado para perguntas de "escrever" e "traduzir").
  if (nextButton) {
      nextButton.onclick = () => {
        const pergunta = perguntas[questaoAtual];
        if (pergunta.tipo === "alternativa") return;

        const input = lessonMainContainer.querySelector(".inputResposta");
        const resposta = input?.value.trim().toLowerCase();
        const respostaCerta = pergunta.resposta.trim().toLowerCase();
        const isCorrect = (resposta === respostaCerta);

        if (isCorrect) {
          correctAnswersCount++;
          input.classList.add("certa");
        } else {
       input.classList.add("errada"); // remove se errou depois
       }
       setTimeout(proximaPergunta, 700);
      };
  }

  // Função para exibir a pergunta atual
  function mostrarPergunta() {
    const pergunta = perguntas[questaoAtual];
    questionElem.innerText = pergunta.pergunta;

      alternativesBtns.forEach(b => b.classList.remove("certa", "errada"));
      const input = lessonMainContainer.querySelector(".inputResposta");
if (input) {
  input.classList.remove("certa", "errada");
  input.value = ""; // também limpa o campo, se quiser
}

      
    if (pergunta.tipo === "alternativa") {
      alternativesBtns.forEach(btn => {
        btn.style.display = "inline-block";
      });
      alternativesBtns.forEach((btn, i) => {
        btn.innerText = pergunta.alternativas[i] || "";
      });
      if (nextButton) nextButton.style.display = "none";

      const existingInput = lessonMainContainer.querySelector(".inputResposta");
      if (existingInput) existingInput.remove();

    } else { // Tipos "escrever", "traduzir-en", "traduzir-pt"
      alternativesBtns.forEach(btn => btn.style.display = "none");
      if (nextButton) { nextButton.style.display = "inline-block"; nextButton.innerText = "Enviar"; }

      let input = lessonMainContainer.querySelector(".inputResposta");
      if (!input) {
        input = document.createElement("input");
        input.className = "inputResposta";
        input.placeholder = "Digite sua resposta aqui...";
        lessonMainContainer.appendChild(input);
      }
      input.value = "";
      input.focus();
    }
  }

  // Função para avançar para a próxima pergunta ou finalizar a lição
    // Função para avançar para a próxima pergunta ou finalizar a lição
   // Função para avançar para a próxima pergunta ou finalizar a lição
  function proximaPergunta() {
    questaoAtual++;
    if (questaoAtual < perguntas.length) {
      mostrarPergunta();
    } else {
      // Todas as perguntas foram respondidas, lição concluída!
      lessonMainContainer.style.display = "none"; // Esconde o container da lição

      const totalQuestions = perguntas.length;
      const successThreshold = 0.75;
      const passedLesson = (correctAnswersCount / totalQuestions) >= successThreshold;

      // Mostrar o alerta de sucesso ou falha
      if (passedLesson) {
        if (alertaSucesso) alertaSucesso.style.display = "block";
        if (alertaFalha) alertaFalha.style.display = "none"; // Garante que o de falha esteja escondido
      } else {
        if (alertaSucesso) alertaSucesso.style.display = "none"; // Esconde o de sucesso
        if (alertaFalha) alertaFalha.style.display = "block"; // MOSTRA o de falha
      }
      // === FIM DA DEPURACÃO DO ALERTA ===


      // Salvar progresso no Firebase
      const currentUser = firebase.auth().currentUser;

      if (!currentUser) {
          console.error("ERRO: Nenhum usuário logado no Firebase Authentication. Não é possível salvar o progresso.");
          return;
      }

      const uid = currentUser.uid;
      const topicoAtual = "topico1";

      if (uid && licaoChave) {
        const db = firebase.database();
        const ref = db.ref(`usuarios/${uid}/progresso/${topicoAtual}/${licaoChave}`);

        ref.set({
            concluido: passedLesson,
            score: correctAnswersCount,
            total: totalQuestions
          })
          .then(() => console.log(`Lição ${licaoChave} salva com sucesso! Status: ${passedLesson ? 'Concluída' : 'Não concluída'}. Score: ${correctAnswersCount}/${totalQuestions}`))
          .catch((error) => console.error("Erro ao salvar lição no Firebase:", error));
      } else {
        console.warn("UID do usuário autenticado não disponível ou chave da lição ausente. Progresso não salvo.");
      }
    }
  }

});

