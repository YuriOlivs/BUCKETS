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

   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
   }
}

function getJogadorStats() {
   var nome;
   if(ipt_nome_jogador.value = "") {
      nome = sessionStorage.NOME_USUARIO;
   } else {
      nome = ipt_nome_jogador.value;
   }

   jogador = {
      id: sessionStorage.ID_USUARIO,
      nome: nome,
      pontos: Number(ipt_pontos.value),
      assists: Number(ipt_assists.value),
      rebotesDef: Number(ipt_rebotes_def.value),
      rebotesOff: Number(ipt_rebotes_off.value),
      arrmsErr: Number(ipt_arrms_tentados.value) - Number(ipt_arrms_certos.value),
      arrmsCert: Number(ipt_arrms_certos.value),
      llErr: Number(ipt_ll_tentados.value) - Number(ipt_ll_certos.value),
      llCert: Number(ipt_ll_tentados.value),
      minutos: ipt_minutos.value,
      foulComet: Number(ipt_foul_cometidas.value),
      foulSofri: Number(ipt_foul_sofridas.value),
      roubosBola: Number(ipt_roubos_bola.value),
      tocos: Number(ipt_tocos.value),
      turnovers: Number(ipt_turnovers.value),
   }

   ipt_nome_jogador.disabled = true;
   iptbox_nome_jogador.style.backgroundColor = '#292929'
   limparInputs();
   msg_form_user.innerText = `Agora insira as estatísticas totais que seu time do seu time na partida!`;
   msg_form_user.classList.add(`animate__pulse`);
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
      llErr: Number(ipt_ll_tentados.value) - Number(ipt_ll_certos.value),
      llCert: Number(ipt_ll_tentados.value),
      minutos: ipt_minutos.value,
      foulComet: Number(ipt_foul_cometidas.value),
      foulSofri: Number(ipt_foul_sofridas.value),
      roubosBola: Number(ipt_roubos_bola.value),
      tocos: Number(ipt_tocos.value),
      turnovers: Number(ipt_turnovers.value)
   }

   limparInputs();
   btn_calc.setAttribute("onclick", "calcPIE()");
   cadStats();
}

function calcPIE() {
   // var efcJogador = (pontosJogador + assistsJogador + offRebotesJogador + defRebotesJogador + tocosJogador + foulSofridasJogador + roubosBolaJogador) - (arrmsErradosJogador + llErradosJogador + errosJogador +foulCometidasJogador)         
   var pie = (jogador.pontos + jogador.arrmsCert + jogador.llCert - jogador.arrmsErr - jogador.llErr + jogador.rebotesDef + jogador.rebotesOff / 2 + jogador.assists + jogador.roubosBola + jogador.tocos / 2 - jogador.foulComet - jogador.turnovers) / (time.pontos + time.arrmsCert + time.llCert - time.arrmsErr - time.llErr + time.rebotesDef + time.rebotesOff / 2 + time.assists + time.roubosBola + time.tocos / 2 - time.foulComet - time.turnovers)
   pie = pie.toFixed(1);

   user_pie.innerText = pie;
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
         idUsuarioServer: jogador.id,
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
         console.log('Cadastro realizado com sucesso')
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

   setTimeout(function () {
      getPlayerData(searchJogador, anoStats, function () {
         if (ipt_search_jogador.value == jogadorData.nomes[0]) {
            sp_search_jogador.innerHTML = ``;
         } else if (ipt_search_jogador.value == '') {
            sp_search_jogador.innerHTML = ``;
         } else if (!jogadorData.nomes[0]) {
            sp_search_jogador.innerHTML = ``;
         } else if (!jogadorData.nomes[1]) {
            sp_search_jogador.innerHTML = `
               <button id="btn_select_player1" class="suggestion-btn" onclick="selectPlayer1()">${jogadorData.nomes[0]}</button>
            `;
         } else if (!jogadorData.nomes[2]) {
            sp_search_jogador.innerHTML = `
               <button id="btn_select_player1" class="suggestion-btn" onclick="selectPlayer1()">${jogadorData.nomes[0]}</button> <br>
               <button id="btn_select_player2" class="suggestion-btn" onclick="selectPlayer2()">${jogadorData.nomes[1]}</button>
            `;
         } else {
            sp_search_jogador.innerHTML = `
               <button id="btn_select_player1" class="suggestion-btn" onclick="selectPlayer1()">${jogadorData.nomes[0]}</button> <br>
               <button id="btn_select_player2" class="suggestion-btn" onclick="selectPlayer2()">${jogadorData.nomes[1]}</button> <br>
               <button id="btn_select_player3" class="suggestion-btn" onclick="selectPlayer3()">${jogadorData.nomes[2]}</button> <br>
            `;
         }

         idJogador = jogadorData.ids[0];
         nomeJogador = jogadorData.nomes[0];
      });
   }, 100);
}

function enterKeyPressed(e) {
   if (e.keyCode == 13) {
      selectPlayer1();
   }
}

function showUserStats() {
   user_nome.style.color = 'white';
   user_nome.innerText = jogador.nome;
   user_pts.innerText = jogador.pontos.toFixed(1);
   user_ast.innerText = jogador.assists.toFixed(1);
   user_stl.innerText = jogador.roubosBola.toFixed(1);
   user_oreb.innerText = jogador.rebotesOff.toFixed(1);
   user_dreb.innerText = jogador.rebotesDef.toFixed(1);
   user_fga.innerText = (jogador.arrmsCert + jogador.arrmsErr).toFixed(1);
   user_fgm.innerText = jogador.arrmsCert.toFixed(1);
   user_blk.innerText = jogador.tocos.toFixed(1);
   user_fta.innerText = (jogador.llCert + jogador.llErr).toFixed(1);
   user_ftm.innerText = jogador.llCert.toFixed(1);
   user_pf.innerText = jogador.foulComet.toFixed(1);
   user_fs.innerText = jogador.foulSofri.toFixed(1);
   user_to.innerText = jogador.turnovers.toFixed(1);
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
   for (let i = 2022; i > 1946; i--) {
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

var teste = [1, 2, 3, 5, 6]

var ctxUser = document.getElementById('user_chart').getContext('2d');
var userChart = new Chart(ctxUser, {
   type: 'radar',
   data: {
      labels: ['Arremessos errados', 'Lances livres errados', 'Turnovers', 'Arremessos certos', 'Lances livres certos', 'Bolas roubadas'],
      datasets: [{
         label: 'Estatísticas',
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
         label: 'Estatísticas',
         data: [0, 0, 0, 0, 0, 0],
         backgroundColor: '#4D89FF12',
         borderColor: '#4D89FF',
         borderWidth: 1
      }],
   },
   options: chartOption
});

//tooltips
tippy("#ipt_oreb_tooltip", {
   content: 'O rebote ocorre quando um jogador erra um arremesso e a bola sobra para alguém, um rebote ofensivo é quando um jogador arremessa e um companheiro de time, ou  próprio jogador, pega a bola e mantém a posse',
   placement: 'bottom',
});

tippy("#ipt_dreb_tooltip", {
   content: 'O rebote ocorre quando um jogador erra um arremesso e a bola sobra para alguém, um rebote defensivo é quando um jogador adversário arremessa e um companheiro de time pega e bola e recupera a posse',
   placement: 'bottom',
});

tippy("#ipt_to_tooltip", {
   content: 'Turnover é usado para descrever a perda da bola de um determinado jogador para o time adversário.',
   placement: 'bottom',
});

tippy("#pts_tooltip", {
   content: 'PTS é um sigla usada para referenciar os pontos feitos por um jogador.',
   placement: 'bottom',
});

tippy("#ast_tooltip", {
   content: 'AST é uma sigla usada para referenciar as assistências feitas por um jogador.',
   placement: 'bottom',
});


tippy("#stl_tooltip", {
   content: 'STL é uma sigla usada para refenciar os roubos de bola de um jogador (STEALS)',
   placement: 'bottom',
});


tippy("#fga_tooltip", {
   content: 'FGA é uma sigla usada para referenciar os arremessos tentados de um jogador. (FIELD GOALS ATTEPTED)',
   placement: 'bottom',
});


tippy("#fgm_tooltip", {
   content: 'FGM é uma sigla usada para referenciar os arremessos certos de um jogador. (FIELD GOALS MADE)',
   placement: 'bottom',
});

tippy("#blk_tooltip", {
   content: 'BLK é uma sigla usada para referenciar os tocos feitos de um jogador. (BLOCKS)',
   placement: 'bottom',
});

tippy("#fta_tooltip", {
   content: 'FTA é uma sigla usada pra referenciar os lances livres tentandos de um jogador. (FREE THROW ATTEMPTED)',
   placement: 'bottom',
});

tippy("#ftm_tooltip", {
   content: 'FTM é uma sigla usada para referenciar os lances livres certos de um jogador. (FREE THROW MADE)',
   placement: 'bottom',
});

tippy("#pf_tooltip", {
   content: 'PF é uma sigla para referenciar as faltas cometidas por um jogador. (PERSONAL FOULS)',
   placement: 'bottom',
});

tippy("#fs_tooltip", {
   content: 'FS é uma sigla usada para referenciar as faltas sofridas por um jogador . (FOULS SUFFERED)',
   placement: 'bottom',
});

tippy("#to_tooltip", {
   content: 'TO é uma sigla usada para referenciar os turnovers de um jogador.',
   placement: 'bottom',
});

tippy("#min_tooltip", {
   content: 'MIN é uma sigla usada para referenciar os minutos jogado por um jogador.',
   placement: 'bottom',
});

tippy("#oreb_tooltip", {
   content: 'OREB é uma sigla usada para referenciar os rebotes ofensivos de um jogador. (OFFENSIVE REBOUNDS)',
   placement: 'bottom',
});

tippy("#dreb_tooltip", {
   content: 'DREB é uma sigla usada para referenciar os rebotes defensivos de um jogador. (DEFENSIVE REBOUND)',
   placement: 'bottom',
});

// ADICIONANDO AS FUNÇÕES AOS ELEMENTOS
ipt_search_jogador.addEventListener('input', showPlayer);
ipt_search_jogador.addEventListener('keydown', enterKeyPressed);
ipt_search_jogador.addEventListener('blur', selectPlayer1);
slct_ano_stats.addEventListener('change', selectAno);
close_modal.addEventListener('click', closeModal)
btn_search.addEventListener('click', function () {
   getPlayerStats(idJogador, nomeJogador, anoStats);
});

window.onload = () => {
   changeNavDash();
   greetings();
}

renderOptions();