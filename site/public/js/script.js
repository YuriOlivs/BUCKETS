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

