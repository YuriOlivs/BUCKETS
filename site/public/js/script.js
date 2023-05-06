var jogador = {};

var statsJogador = {};

function CadStatsJogdr() {
    jogador = {
        usuario: false,
        nome: ipt_nome_jogador.value
    };

    statsJogador = {
        jogador: jogador,
        pontos: ipt_pontos.value,
        rebotes: ipt_rebotes.value,
        assistencias: ipt_assists.value,
        tocos: ipt_tocos.value,
        lancesLivresErrados: Number(ipt_ll_tentados.value - ipt_ll_certos.value),
        lancesLivresCertos:ipt_ll_certos.value,
        arremessosErrados: Number(ipt_arrms_tentados.value - ipt_arrms_certos.value),
        arremessosCertos: ipt_arrms_certos.value,
        minutosJogador: ipt_minutos.value
    };
};

function CadStatsTime() {
    statsJogador = {
        jogador: null,
        pontos: ipt_pontos.value,
        rebotes: ipt_rebotes.value,
        assistencias: ipt_assists.value,
        tocos: ipt_tocos.value,
        lancesLivresErrados: Number(ipt_ll_tentados.value - ipt_ll_certos.value),
        lancesLivresCertos:ipt_ll_certos.value,
        arremessosErrados: Number(ipt_arrms_tentados.value - ipt_arrms_certos.value),
        arremessosCertos: ipt_arrms_certos.value,
        minutosJogador: ipt_minutos.value
    }
}

function CadStatsTimeOpp() {
    statsJogador = {
        jogador: null,
        pontos: ipt_pontos.value,
        rebotes: ipt_rebotes.value,
        assistencias: ipt_assists.value,
        tocos: ipt_tocos.value,
        lancesLivresErrados: Number(ipt_ll_tentados.value - ipt_ll_certos.value),
        lancesLivresCertos:ipt_ll_certos.value,
        arremessosErrados: Number(ipt_arrms_tentados.value - ipt_arrms_certos.value),
        arremessosCertos: ipt_arrms_certos.value,
        minutosJogador: ipt_minutos.value
    };
};

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

