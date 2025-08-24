// Banco de dados local das lições
const topico = {
l1: [
  {
    tipo: "alternativa",
    pergunta: "“Ir para a cama” em inglês é:",
    alternativas: ["Wake up", "Go to bed", "Get dressed", "Take a shower"],
    correta: 1
  },
  {
    tipo: "escrever",
    pergunta: "Complete: 'I ___ TV at night.' → (watch / brush / wake)",
    resposta: "watch"
  },
  {
    tipo: "traduzir-en",
    pergunta: "Traduza para o inglês: 'Escovar os dentes'.",
    resposta: "Brush teeth"
  },
  {
    tipo: "traduzir-pt",
    pergunta: "Traduza para o português: 'I have breakfast.'",
    resposta: "Eu tomo café da manhã."
  },
  {
    tipo: "alternativa",
    pergunta: "Qual dessas opções NÃO é uma ação do dia a dia?",
    alternativas: ["Wake up", "Cook pasta", "Go to work", "Take a shower"],
    correta: 1
  }
],

l2: [
  {
    tipo: "alternativa",
    pergunta: "“Mesa” em inglês é:",
    alternativas: ["Chair", "Door", "Table", "Window"],
    correta: 2
  },
  {
    tipo: "escrever",
    pergunta: "Complete: 'The ___ is open.' → (door / bike / computer)",
    resposta: "door"
  },
  {
    tipo: "traduzir-en",
    pergunta: "Traduza para o inglês: 'Bicicleta'.",
    resposta: "Bike"
  },
  {
    tipo: "traduzir-pt",
    pergunta: "Traduza para o português: 'I have a car.'",
    resposta: "Eu tenho um carro."
  },
  {
    tipo: "alternativa",
    pergunta: "Qual desses NÃO é um objeto da lista?",
    alternativas: ["House", "Book", "Phone", "Love"],
    correta: 3
  }
],

l3: [
  {
    tipo: "alternativa",
    pergunta: "“Roxo” em inglês é:",
    alternativas: ["Purple", "Pink", "Blue", "Gray"],
    correta: 0
  },
  {
    tipo: "escrever",
    pergunta: "Complete: 'The sky is ___.' → (blue / black / red)",
    resposta: "blue"
  },
  {
    tipo: "traduzir-en",
    pergunta: "Traduza para o inglês: 'Cinza'.",
    resposta: "Gray"
  },
  {
    tipo: "traduzir-pt",
    pergunta: "Traduza para o português: 'My car is white.'",
    resposta: "Meu carro é branco."
  },
  {
    tipo: "alternativa",
    pergunta: "Qual dessas opções NÃO é uma cor?",
    alternativas: ["Red", "Book", "Black", "Green"],
    correta: 1
  }
],

l4: [
  {
    tipo: "alternativa",
    pergunta: "“Espelho” em inglês é:",
    alternativas: ["Mirror", "Clock", "Window", "Bag"],
    correta: 0
  },
  {
    tipo: "escrever",
    pergunta: "Complete: 'I need my ___ to open the door.' → (keys / shoes / bed)",
    resposta: "keys"
  },
  {
    tipo: "traduzir-en",
    pergunta: "Traduza para o inglês: 'Carteira'.",
    resposta: "Wallet"
  },
  {
    tipo: "traduzir-pt",
    pergunta: "Traduza para o português: 'My shoes are black.'",
    resposta: "Meus sapatos são pretos."
  },
  {
    tipo: "alternativa",
    pergunta: "Qual dessas opções significa \"cama\" em inglês?",
    alternativas: ["Hairbrush", "Bed", "Computer", "Toothbrush"],
    correta: 1
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

