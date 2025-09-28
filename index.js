window.addEventListener("DOMContentLoaded", () => {
  const apresentarmsg = document.getElementById("apresentar");
  const sair = document.getElementById("sair");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      sair.style.display = "block";
      const uid = user.uid;

      firebase.database().ref("usuarios/" + uid).once("value")
        .then(snapshot => {
          console.log("Chegou no then, snapshot:", snapshot);
          const dados = snapshot.val();
          console.log("Dados do usuário:", dados);

          const nome = dados?.nome || "usuário";
          apresentarmsg.textContent = `Bem-vindo(a), ${nome}! Desfrute do conteúdo disponível abaixo para aprender um pouco conosco!`;
        })
        .catch((error) => {
          console.log("Erro ao carregar dados:", error);
          apresentarmsg.textContent = "Erro ao carregar seus dados.";
        });
    } else {
      sair.style.display = "none";
      apresentarmsg.innerHTML = '<a href="./assets/html/login.html"><em>Entre em sua conta</em></a> e aproveite o conteúdo!';
    }
     })
     sair.addEventListener("click", () => {
      firebase.auth().signOut()
      .then(() => {
        window.location.href ="./assets/html/login.html";
      })
      .catch ((error) => {
        console.log ("Erro ao sair:", error);
      })
  });
});