// sessão
function validarSessao() {
    // aguardar();
    var user = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    if (user != null && nome != null) {
        //window.alert(`Seja bem-vindo, ${nome}!`);
        ipt_nome_jogador.placeholder = user;

        window.localtion = "home/calculadora.html"
        // finalizarAguardar();
    } else {
        // window.location = "../index.html";
        // alert("você não está logado");
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "index.html";
}

// carregamento (loading)
function aguardar() {
    
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

