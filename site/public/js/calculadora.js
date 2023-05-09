validarSessao();
   
var jogador = {};
var time = {};

function getJogadorStats() {
   jogador = {
      nome: ipt_nome_jogador.value,
      pontos: Number(ipt_pontos.value),
      assists: Number(ipt_assists.value),
      rebotesDef: Number(ipt_rebotes_def.value),
      rebotesOff: Number(ipt_rebotes_off.value),
      arrmsErr: Number(ipt_arrms_tentados.value) - Number(ipt_arrms_certos.value),
      arrmsCert: Number(ipt_arrms_certos.value),
      llErr: Number(ipt_ll_certos.value) - Number(ipt_ll_tentados.value),
      llCert: Number(ipt_ll_tentados.value),
      minutos: Number(minutos),
      foulComet: Number(ipt_foul_cometidas.value),
      foulSofri:  Number(ipt_foul_sofridas.value),
      roubosBola: Number(ipt_roubos_bola.value),
      tocos: Number(ipt_tocos.value),
      turnovers: Number(ipt_turnovers.value)
   }

   console.log(jogador);
   btnCalc.setAttribute("onclick", "getTeamStats()");
}

function getTeamStats() {
   time = {
      pontos: Number(ipt_pontos.value),
      assists: Number(ipt_assists.value),
      rebotesDef: Number(ipt_rebotes_def.value),
      rebotesOff: Number(ipt_rebotes_off.value),
      arrmsErr: Number(ipt_arrms_tentados.value) - Number(ipt_arrms_certos.value),
      arrmsCert: Number(ipt_arrms_certos.value),
      llErr: Number(ipt_ll_certos.value) - Number(ipt_ll_tentados.value),
      llCert: Number(ipt_ll_tentados.value),
      minutos: Number(minutos),
      foulComet: Number(ipt_foul_cometidas.value),
      foulSofri:  Number(ipt_foul_sofridas.value),
      roubosBola: Number(ipt_roubos_bola.value),
      tocos: Number(ipt_tocos.value),
      turnovers: Number(ipt_turnovers.value)
   }

   console.log(time);
   btnCalc.setAttribute("onclick", "calcPIE()");
}

function calcPIE() {
   // var efcJogador = (pontosJogador + assistsJogador + offRebotesJogador + defRebotesJogador + tocosJogador + foulSofridasJogador + roubosBolaJogador) - (arrmsErradosJogador + llErradosJogador + errosJogador +foulCometidasJogador)         
   var pie =  (jogador.pontos + jogador.arrmsCert + jogador.llCert - jogador.arrmsErr - jogador.llErr + jogador.rebotesDef + jogador.rebotesOff/2 + jogador.assists + jogador.roubosBola + jogador.tocos/2 - jogador.foulComet - jogador.turnovers) / (time.pontos + time.arrmsCert + time.llCert - time.arrmsErr - time.llErr + time.rebotesDef + time.rebotesOff/2 + time.assists + time.roubosBola + time.tocos/2 - time.foulComet - time.turnovers)
   pie =  pie.toFixed(2) * 100+'%';
   
   return pie;
}

function cadStats() {

  fetch("/stats/cadastrar", {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify({
      nomeServer: jogador.nome,
      pontosServer: jogador.pontos,
      assistsServer: jogador.assists,
      rebotesDefServer: jogador.rebotesDef,
      rebotesOffServer: jogador.rebotesOff,
      arrmsErradosServer: jogador.arrmsErr,
      arrmsCertosServer: jogador.arrmsCert,
      llCertosServer: jogador.llCert,
      llErradosServer: jogador.llErr,
      minutosServer: jogador.minutos,
      foulCometidasServer: jogador.foulComet,
      foulSofridasServer: jogador.foulSofri,
      roubosBolaServer: jogador.roubosBola,
      tocosServer: jogador.tocos,
      turnoversServer: jogador.turnovers,
      pieServer: calcularPIE()
  })
  }).then(function (resposta) {

      console.log("resposta: ", resposta);

      if (resposta.ok) {
        alert('Cadastro realizado com sucesso')
      } else {
          throw ("Houve um erro ao tentar realizar o cadastro!");
      }
  }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
  });

  return false;
}