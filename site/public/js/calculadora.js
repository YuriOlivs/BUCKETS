validarSessao();

var jogador = {};
var time = {};
var idJogador;
var nomeJogador;
var anoStats;
var keyCheck = false;

function closeModal() {
   modal_erro.style.top = '-100%'
   modal_erro.style.opacity = 0;
}

function limparInputs() {
   var inputs = document.querySelectorAll("input[type=text]");

   for(let i=0; i < inputs.length; i++) {
      inputs[i].value = '';
   }
}

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
   minutos: ipt_minutos.value,
   foulComet: Number(ipt_foul_cometidas.value),
   foulSofri:  Number(ipt_foul_sofridas.value),
   roubosBola: Number(ipt_roubos_bola.value),
   tocos: Number(ipt_tocos.value),
   turnovers: Number(ipt_turnovers.value)
}
showUserStats();
console.log(jogador);
ipt_nome_jogador.disabled = true;
iptbox_nome_jogador.style.backgroundColor  = '#292929'
limparInputs();
btn_calc.setAttribute("onclick", "getTeamStats()");
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
   minutos: ipt_minutos.value,
   foulComet: Number(ipt_foul_cometidas.value),
   foulSofri:  Number(ipt_foul_sofridas.value),
   roubosBola: Number(ipt_roubos_bola.value),
   tocos: Number(ipt_tocos.value),
   turnovers: Number(ipt_turnovers.value)
}

console.log(time);
limparInputs();
btn_calc.setAttribute("onclick", "calcPIE()");

cadStats();
}

function calcPIE() {
// var efcJogador = (pontosJogador + assistsJogador + offRebotesJogador + defRebotesJogador + tocosJogador + foulSofridasJogador + roubosBolaJogador) - (arrmsErradosJogador + llErradosJogador + errosJogador +foulCometidasJogador)         
var pie =  (jogador.pontos + jogador.arrmsCert + jogador.llCert - jogador.arrmsErr - jogador.llErr + jogador.rebotesDef + jogador.rebotesOff/2 + jogador.assists + jogador.roubosBola + jogador.tocos/2 - jogador.foulComet - jogador.turnovers) / (time.pontos + time.arrmsCert + time.llCert - time.arrmsErr - time.llErr + time.rebotesDef + time.rebotesOff/2 + time.assists + time.roubosBola + time.tocos/2 - time.foulComet - time.turnovers)
pie =  pie.toFixed(2);

return pie;
}

function cadStats() {
showUserStats();

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
   pieServer: calcPIE()
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

// FUNÇÕES PARA SEARCH E SELECT DE JOGADORES
function selectAno() {
   anoStats = Number(slct_ano_stats.value);
}

function selectPlayer1() {
   ipt_search_jogador.value = btn_select_player1.innerText;
   sp_search_jogador.innerHTML = ``;
}

function selectPlayer2() {
   ipt_search_jogador.value = btn_select_player2.innerText;
   sp_search_jogador.innerHTML = ``;
}

function selectPlayer3() {
   ipt_search_jogador.value = btn_select_player3.innerText;
   sp_search_jogador.innerHTML = ``;
}



function showPlayer() {
   var searchJogador = ipt_search_jogador.value.toLowerCase();
   searchJogador = searchJogador.replaceAll(' ', '_');

   setTimeout(function() {
      getPlayerData(searchJogador, anoStats, function() {
         if(ipt_search_jogador.value == jogadorData.nomes[0]) {
            sp_search_jogador.innerHTML = ``;
         } else if(ipt_search_jogador.value == '') {
            sp_search_jogador.innerHTML = ``;
         } else if(!jogadorData.nomes[0]) {
            sp_search_jogador.innerHTML = ``;
         } else if(!jogadorData.nomes[1]) {
            sp_search_jogador.innerHTML = `
               <button id="btn_select_player1" class="suggestion-btn" onclick="selectPlayer1()">${jogadorData.nomes[0]}</button>
            `;
         } else if(!jogadorData.nomes[2]) {
            sp_search_jogador.innerHTML = `
               <button id="btn_select_player1" class="suggestion-btn" onclick="selectPlayer1()">${jogadorData.nomes[0]}</button> <br>
               <button id="btn_select_player2" class="suggestion-btn" onclick="selectPlayer2()">${jogadorData.nomes[1]}</button>
            `;
         } else  {
            sp_search_jogador.innerHTML = `
               <button id="btn_select_player1" class="suggestion-btn" onclick="selectPlayer1()">${jogadorData.nomes[0]}</button> <br>
               <button id="btn_select_player2" class="suggestion-btn" onclick="selectPlayer2()">${jogadorData.nomes[1]}</button> <br>
               <button id="btn_select_player3" class="suggestion-btn" onclick="selectPlayer3()">${jogadorData.nomes[2]}</button> <br>
            `;
         }
   
         idJogador = jogadorData.ids[0];
         nomeJogador = jogadorData.nomes[0];
      });
   }, 1000);
}

function enterKeyPressed(e) {
   if(e.keyCode == 13) {
      selectPlayer1();
   }
}

function showUserStats() {
   user_nome.innerText = jogador.nome;
   user_pts.innerText = jogador.pontos;
   user_ast.innerText = jogador.assists;
   user_stl.innerText = jogador.roubosBola;
   user_oreb.innerText = jogador.rebotesOff;
   user_dreb.innerText = jogador.rebotesDef;
   user_fga.innerText = jogador.arrmsCert + jogador.arrmsErr;
   user_fgm.innerText = jogador.arrmsCert;
   user_blk.innerText = jogador.tocos;
   user_fta.innerText = jogador.llCert + jogador.llErr;
   user_ftm.innerText = jogador.llCert;
   user_pf.innerText = jogador.foulComet;
   user_fs.innerText = jogador.foulSofri;
   user_to.innerText = jogador.turnovers;
   user_min.innerText = jogador.minutos;

   userChart.data.datasets[0].data[0] = jogador.arrmsErr;
   userChart.data.datasets[0].data[1] = jogador.llErr;
   userChart.data.datasets[0].data[2] = jogador.turnovers;
   userChart.data.datasets[0].data[3] = jogador.arrmsCert;
   userChart.data.datasets[0].data[4] = jogador.llCert;
   userChart.data.datasets[0].data[5] = jogador.roubosBola;
   userChart.update();
}

// RENDERIZAR OPÇÕES
function renderOptions() {
   for(let i = 2022; i > 1946; i--)  {
      var option = document.createElement("option");
      option.setAttribute("value", i);
      option.text = i;
      slct_ano_stats.appendChild(option);
   }
}

//GRÁFICOS
var chartOption = {
   responsive: true,
   maintainAspectRatio: false,
    scales: {
      r: {
         ticks: {
            display: false
         },
         grid: {
            color: '#616161'
         },
         angleLines: {
            display: false,
         },
         suggestedMin: 0,
         suggestedMax: 20
      },
    }
}

var teste = [1, 2,3 ,5 ,6]

var ctxUser = document.getElementById('user_chart').getContext('2d');
var userChart = new Chart(ctxUser, {
  type: 'radar',
  data: {
    labels: ['Arremessos errados', 'Lances livres errados', 'Turnovers', 'Arremessos certos', 'Lances livres certos', 'Bolas roubadas'],
    datasets: [{
      label: 'Vendas',
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: '#4D89FF12',
      borderColor: '#4D89FF',
      borderWidth: 1
    }],
  },
  options: chartOption
});

var ctxPlayer = document.getElementById('player_chart').getContext('2d');
var playerChart = new Chart(ctxPlayer, {
  type: 'radar',
  data: {
   labels: ['Arremessos errados', 'Lances livres errados', 'Turnovers', 'Arremessos certos', 'Lances livres certos', 'Bolas roubadas'],
    datasets: [{
      label: 'Vendas',
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: '#4D89FF12',
      borderColor: '#4D89FF',
      borderWidth: 1
    }],
  },
  options: chartOption
});


// ADICIONANDO AS FUNÇÕES AOS ELEMENTOS
ipt_search_jogador.addEventListener('input', showPlayer);
ipt_search_jogador.addEventListener('keydown', enterKeyPressed);
ipt_search_jogador.addEventListener('blur', selectPlayer1);
slct_ano_stats.addEventListener('change', selectAno);
close_modal.addEventListener('click', closeModal)
btn_search.addEventListener('click', function() {
   getPlayerStats(idJogador, nomeJogador, anoStats);
});

renderOptions();