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

function sair() {
    sessionStorage.clear()

    setTimeout(function () {
        window.location = "../login.html";
    }, 1000); 
}

function validarSessao() {
    
}

function renderTopPlayers() {
    var top10 = document.getElementById("jogadores_top10");
    var jogadores = [
        {
            nome: "Joel Embiid",
            time_nome: "Philadelphia 76ers",
            img: "joel.png",
            time_img: "sixers.png",
            stats: {
                ppg: 33.1,
                rpg: 10.2,
                apg: 4.2,
                pie: 21.3
            },
            vencedor: true,
        },
        {
            nome: "Nikola Jokic",
            time_nome: "Denver Nuggets",
            img: "jokic.png",
            time_img: "nuggets.png",
            stats: {
                ppg: 24.5,
                rpg: 11.8,
                apg: 9.8,
                pie: 21.1
            },
            vencedor: false,
        },
        {
            nome: "Antetokounmpo",
            time_nome: "Milwaukee Bucks",
            img:"giannis.png",
            time_img: "bucks.png",
            stats: {
                ppg: 31.1,
                rpg: 11.8,
                apg: 5.7,
                pie: 20.4
            },
            vencedor: false,
        },
        {
            nome: "Jayson Tatum",
            time_nome: "Boston Celtics",
            img: "tatum.png",
            time_img: "celtics.png",
            stats: {
                ppg: 30.1,
                rpg: 8.8,
                apg: 4.6,
                pie: 16.7
            },
            vencedor: false,
        },
        {
            nome: "Donovan Mitchell",
            time_nome: "Cleveland Cavaliers",
            img: "mitchell.png",
            time_img: "cavs.png",
            stats: {
                ppg: 28.3,
                rpg: 4.3,
                apg: 4.4,
                pie: 14.9
            },
            vencedor: false,
        },
        {
            nome: "Domantas Sabonis",
            time_nome: "Sacramento Kings",
            img: "sabonis.png",
            time_img: "kings.png",
            stats: {
                ppg: 19.1,
                rpg: 12.3,
                apg: 7.3,
                pie: 16.1
            },
            vencedor: false,
        },
        {
            nome: "Gilgeous-Alexander",
            time_nome: "Oklahoma City Thunder",
            img: "shai.png",
            time_img: "okc.png",
            stats: {
                ppg: 31.4,
                rpg: 4.8,
                apg: 5.5,
                pie: 17.5
            },
            vencedor: false,
        },
        {
            nome: "Luka Doncic",
            time_nome: "Dallas Mavericks",
            img: "doncic.png",
            time_img: "mavs.png",
            stats: {
                ppg: 32.4,
                rpg: 8.6,
                apg: 8.0,
                pie: 20.2
            },
            vencedor: false,
        },
        {
            nome: "James Harden",
            time_nome: "Philadelphia 76ers",
            img: "harden.png",
            time_img: "sixers.png",
            stats: {
                ppg: 21.1,
                rpg: 6.1,
                apg: 10.7,
                pie: 15.9
            },
            vencedor: false,
        },
        {
            nome: "Kevin Durant",
            time_nome: "Phoenix Suns",
            img: "durant.png",
            time_img: "suns.png",
            stats: {
                ppg: 29.1,
                rpg: 6.7,
                apg: 5.0,
                pie: 18.5
            },
            vencedor: false,
        }
    ];

    var contador = 0;
    jogadores.forEach(jogador => {
        contador++;

        var divJogador = document.createElement("div");
        if(contador % 2 == 0) {
            divJogador.className = "jogador-right";
        } else {
            divJogador.className = "jogador-left";
        }
        
        var imgsJogador = document.createElement("div");
        imgsJogador.className = "imgs-jogador";
        
        var imgJogador = document.createElement("img");
        imgJogador.src = `assets/players/profile/players/${jogador.img}`; 
        imgJogador.alt = jogador.nome;
        imgJogador.className = "img-jogador";
        
        var imgTime = document.createElement("img");
        imgTime.src = `assets/players/profile/teams/${jogador.time_img}`; 
        imgTime.alt = "";
        imgTime.className = "img-time";
        
        var gradient = document.createElement("div");
        gradient.className = "gradient";
        
        imgsJogador.appendChild(imgJogador);
        imgsJogador.appendChild(imgTime);
        imgsJogador.appendChild(gradient);
        
        divJogador.appendChild(imgsJogador);
        
        var descJogador = document.createElement("div");
        descJogador.className = "desc-jogador";
        
        var titleJogador = document.createElement("div");
        titleJogador.className = "title-jogador";
        
        var nomeJogador = document.createElement("div");
        nomeJogador.className = "nome-jogador";
        nomeJogador.textContent = `${jogador.nome}`; 
        
        var timeJogador = document.createElement("div");
        timeJogador.className = "time-jogador";
        timeJogador.textContent = jogador.time_nome; 

        if(jogador.vencedor == true) {
            nomeJogador.classList.add("winner");
            timeJogador.classList.add("winner");
            nomeJogador.innerHTML += `<span id="crown">♔</span>`;

            tippy("#crown", {
                content: `${jogador.nome} foi o vencedor da corrida para MVP 2023!`,
                placement: 'bottom',
             });
        }
        
        titleJogador.appendChild(nomeJogador);
        titleJogador.appendChild(timeJogador);
        
        var stats = document.createElement("div");
        stats.className = "stats-mvp";
        if(jogador.vencedor == true) {
            stats.classList.add("winner");
        }
        
        var flexRow1 = document.createElement("div");
        flexRow1.className = "flex-row";
        
        var pontos = document.createElement("span");
        pontos.id = "pontos";
        pontos.textContent = `${jogador.stats.ppg} ppg`; 
        
        var assist = document.createElement("span");
        assist.id = "assist";
        assist.textContent = `${jogador.stats.apg} apg`; 
        
        flexRow1.appendChild(pontos);
        flexRow1.appendChild(assist);
        
        var flexRow2 = document.createElement("div");
        flexRow2.className = "flex-row";
        
        var rebotes = document.createElement("span");
        rebotes.id = "rebotes";
        rebotes.textContent = `${jogador.stats.rpg} rpg`; 
        
        var pie = document.createElement("span");
        pie.id = "pie";
        pie.textContent = `${jogador.stats.pie} pie`; 
        
        flexRow2.appendChild(rebotes);
        flexRow2.appendChild(pie);
        
        stats.appendChild(flexRow1);
        stats.appendChild(flexRow2);
        
        descJogador.appendChild(titleJogador);
        descJogador.appendChild(stats);
        
        divJogador.appendChild(imgsJogador);
        divJogador.appendChild(descJogador);
        
        top10.appendChild(divJogador);
    });
}