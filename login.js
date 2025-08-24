window.addEventListener("DOMContentLoaded", function()
 {
 const formLogin =document.getElementById("formLog");

 formLogin.addEventListener("submit", function(event) {
    event.preventDefault();
    //constantes
    const emailLogin= document.getElementById("emaillogin").value.trim()
    const senhaLogin= document.getElementById("senhalogin").value.trim()

    if (emailLogin === "" || senhaLogin === "") {
        document.getElementById("errormsg").textContent = "Preencha todos os campos!";
        return;
    }
    firebase.auth().signInWithEmailAndPassword(emailLogin, senhaLogin)
    .then((userCredential) => {
      const user = userCredential.user;

      // Armazena o ID do usuário para uso posterior
      localStorage.setItem("usuarioLogado", user.uid);

      window.location.href = "../../index.html";
    })
    .catch((error) => {
      document.getElementById("errormsg2").textContent = "E-mail ou senha incorretos.";
    });
 });
 });