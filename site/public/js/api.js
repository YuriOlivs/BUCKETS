function getPlayerData(nome_jogador, callback) {
   const xhr = new XMLHttpRequest();

   var endpoint = xhr.open('GET', `https://www.balldontlie.io/api/v1/players?search=${nome_jogador}`);

   xhr.onload = function() {
      const jogadorJSON = JSON.parse(xhr.response);
      // console.log(jogadorJSON);
      
      var jogadores = {};

      jogadorData = {
         ids: [],
         nomes: [],
      };

      for(let i=0; i < 3; i++) {
         if(jogadorJSON.data[i]) {
            jogadores[`idJogador${i}`] = jogadorJSON.data[i].id;
            jogadores[`nomeJogador${i}`] = jogadorJSON.data[i].first_name+' '+jogadorJSON.data[i].last_name;

            jogadorData.ids.push(jogadores[`idJogador${i}`]);
            jogadorData.nomes.push(jogadores[`nomeJogador${i}`]);
         }
      }

      callback(jogadorData);
   }
   xhr.send();
};

function getPlayerStats(id_jogador, nome_jogador) {
   const xhr = new XMLHttpRequest();
   xhr.open('GET', `https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${id_jogador}`);

   xhr.onload = function () {
      const jogadorStatsJSON = JSON.parse(xhr.response)

      const jogadorStats = {
         pts: jogadorStatsJSON.data[0].pts,
         ast: jogadorStatsJSON.data[0].ast,
         oreb: jogadorStatsJSON.data[0].oreb,
         dreb: jogadorStatsJSON.data[0].dreb,
         fga: jogadorStatsJSON.data[0].fga,
         fgm: jogadorStatsJSON.data[0].fgm,
         fta: jogadorStatsJSON.data[0].fta,
         ftm: jogadorStatsJSON.data[0].ftm,
         min: jogadorStatsJSON.data[0].min,
         blk: jogadorStatsJSON.data[0].blk,
         to: jogadorStatsJSON.data[0].turnover,
         stl: jogadorStatsJSON.data[0].stl,
         pf: jogadorStatsJSON.data[0].pf,
         fs: jogadorStatsJSON.data[0].fta
      }

      player_name.innerText = nome_jogador;
      player_pts.innerText = jogadorStats.pts;
      player_ast.innerText = jogadorStats.ast;
      player_stl.innerText = jogadorStats.stl;
      player_oreb.innerText = jogadorStats.oreb;
      player_dreb.innerText = jogadorStats.dreb;
      player_fga.innerText = jogadorStats.fga;
      player_fgm.innerText = jogadorStats.fgm;
      player_blk.innerText = jogadorStats.blk;
      player_fta.innerText = jogadorStats.fta;
      player_ftm.innerText = jogadorStats.ftm;
      player_pf.innerText = jogadorStats.pf;
      player_fs.innerText = jogadorStats.fs;
      player_to.innerText = jogadorStats.to;
      player_min.innerText = jogadorStats.min;
   }

   xhr.send();
}