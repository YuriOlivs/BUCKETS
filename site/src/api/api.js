var jogadorData = {};

function getPlayerData() {
   const xhr = new XMLHttpRequest();
   xhr.open('GET', `https://www.balldontlie.io/api/v1/players/237`);

   xhr.onload = function() {
      const jogadorJSON = JSON.parse(xhr.response);
      console.log(jogadorJSON);

      var nomeJogadorVar = jogadorJSON.data[0].first_name +' '+jogadorJSON.data[0].last_name;
      var posicaoJogadorVar = jogadorJSON.data[0].position;
      var timeJogadorVar = jogadorJSON.data[0].team.abbreviation;   

      jogadorData = {
         nome: nomeJogadorVar,
         posicao: posicaoJogadorVar,
         time: timeJogadorVar
      };
   }

   xhr.send();
};

getPlayerData();

export default {
   jogadorData
}
