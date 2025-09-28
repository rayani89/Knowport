window.addEventListener("DOMContentLoaded", function () {

  const formCadastro = document.getElementById("formCadastro");

  formCadastro.addEventListener("submit", function(event) {
    event.preventDefault();
    //constantes
    const nome =document.getElementById("nomec");
    const email =document.getElementById("emailc");
    const senha =document.getElementById("senhac");
    const confirmar =document.getElementById("confirmarc");

    const nomeValor = nome.value.trim ();
    const emailValor = email.value.trim ();
    const senhaValor = senha.value.trim ();
    const confirmarValor = confirmar.value.trim ();

      // Limpa mensagens anteriores
    document.getElementById("mensagem").textContent = "";
    document.getElementById("msg").textContent = "";
    document.getElementById("mensage").textContent = "";
    document.getElementById("sucesso").textContent = "";


    if ( nomeValor ==="" || emailValor ===""|| senhaValor === ""|| confirmarValor ==="") {
        document.getElementById("mensagem").textContent = "Preencha todos os campos!";
        return;
    }
    if (senhaValor !== confirmarValor) {
        document.getElementById("msg").textContent = "As senhas não coincidem!";
        return;
    }
firebase.auth().createUserWithEmailAndPassword(emailValor, senhaValor)
  .then((userCredential) => {
    const uid = userCredential.user.uid;

    // Salvar nome e email no Realtime Database para associar ao usuário
    firebase.database().ref("usuarios/" + uid).set({
      nome: nomeValor,
      email: emailValor
    })
   .then(() => { // .then() para a operação do Realtime Database
            document.getElementById("sucesso").textContent = "Cadastro realizado com sucesso!";
            setTimeout(() => window.location.href = "login.html", 2000);
        })
        .catch((dbError) => { // .catch() para a operação do Realtime Database
            console.error("Erro ao salvar dados do usuário no Realtime Database:", dbError);
            document.getElementById("mensage").textContent = "Cadastro de usuário realizado, mas não foi possível salvar o nome e e-mail. Por favor, tente novamente ou contate o suporte.";
            // Decide if you still want to redirect here, or let the user try again
            setTimeout(() => window.location.href = "login.html", 4000); // Redirect anyway after longer delay
        });
      })
      .catch((error) => { // .catch() para a operação de autenticação
        // Tratar erros específicos da autenticação do Firebase
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          document.getElementById("mensage").textContent = "A senha é muito fraca. Mínimo de 6 caracteres.";
        } else if (errorCode == 'auth/email-already-in-use') {
          document.getElementById("mensage").textContent = "Este e-mail já está cadastrado.";
        } else if (errorCode == 'auth/invalid-email') {
          document.getElementById("mensage").textContent = "Formato de e-mail inválido.";
        } else if (errorCode == 'auth/operation-not-allowed') {
          document.getElementById("mensage").textContent = "Cadastro por e-mail/senha não habilitado.";
        }
        else {
          document.getElementById("mensage").textContent = "Erro no cadastro: " + errorMessage;
        }
        console.error("Erro no cadastro de usuário Firebase Auth:", error);
      });;
  })

  });

