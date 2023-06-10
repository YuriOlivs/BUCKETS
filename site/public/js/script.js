var jogador = {};

window.onscroll = function () {
    var nav = document.getElementById("navbar");

    if(window.scrollY == 0) {
        nav.classList.remove("navbar-ativo");
    } else {
        nav.classList.add("navbar-ativo");
    };
}

var menuAtivo = false;

function closeNav() {
    var line1 = document.getElementById("line1"),
        line2 = document.getElementById("line2"),
        line3 = document.getElementById("line3"),
        navItem = document.getElementsByClassName("nav-item")

    if(menuAtivo == false) {
        line1.classList.add("line1-ativo");
        line2.classList.add("line2-ativo");
        line3.classList.add("line3-ativo");

        for(i = 0; i < navItem.length; i++) {
            navItem[i].classList.add("nav-item-ativo")
        }

        menuAtivo = true;
    } else {
        line2.classList.remove("line2-ativo");
        line1.classList.remove("line1-ativo");
        line3.classList.remove("line3-ativo");

        for(i = 0; i < navItem.length; i++) {
            navItem[i].classList.remove("nav-item-ativo")
        }

        menuAtivo = false;
    }
}

function cadastrar() {
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
        alert("Todos os campos estão em branco")
        return false;
    }
    else {
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                modal_success.style.top = '12%';

                setTimeout(() => {
                    modal_success.style.top = '-100%';
                    window.location = "login.html";
                }, "1000")

                limparFormulario();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }

    return false;
}

function entrar() {
    aguardar();

    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        finalizarAguardar();
        return false;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "home/calculadora.html";
                }, 1000); 

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");
            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function changeNavDash() {
    var url = window.location.href;
    var icone;

    if(url.endsWith("calculadora.html")) {
        icone = document.getElementById("calculatorIcon");
        icone.style.color = `white`;
    } else {
        icone = document.getElementById("chartIcon");
        icone.style.color = `white`;
    }
}

function greetings() {
    var dataAtual = new Date();
    var horaAtual = dataAtual.getHours();

    const saudacaoSpan = document.getElementById("sp_saudacao");
    var saudacao;
    var nome = sessionStorage.NOME_USUARIO;

    if (horaAtual >= 0 && horaAtual < 12) {
    saudacao = "Bom dia";
    } else if (horaAtual >= 12 && horaAtual < 18) {
    saudacao = "Boa tarde";
    } else {
    saudacao = "Boa noite";
    }

    saudacaoSpan.innerText = `${saudacao}, ${nome}!`;
}