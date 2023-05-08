function getPlayerData(nome_jogador, callback) {
   const xhr = new XMLHttpRequest(nome_jogador);
   xhr.open('GET', `https://www.balldontlie.io/api/v1/players?search=${nome_jogador}`);

   xhr.onload = function() {
      const jogadorJSON = JSON.parse(xhr.response);
      console.log(jogadorJSON);

      var nomeJogadorVar = jogadorJSON.data[0].first_name +' '+jogadorJSON.data[0].last_name;
      var posicaoJogadorVar = jogadorJSON.data[0].position;
      var timeJogadorVar = jogadorJSON.data[0].team.abbreviation;   

      const jogadorData = {
         nome: nomeJogadorVar,
         posicao: posicaoJogadorVar,
         time: timeJogadorVar
      };

      callback(jogadorData);
   }
   xhr.send();
};

