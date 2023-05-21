const containerHistorico = document.getElementById("container_historico");
const slctStats = document.getElementById("slct_stats");

function showUserStats() {
    fetch('/stats/listar', {
       method: 'GET',
       heahders: {
          "Content-type": "application/json"
       }
    }).then(function (resposta) {
       if(resposta.ok) {
          resposta.json().then(function (resposta) {
             for (let i = 0; i < resposta.length; i++) {
                var stat = resposta[i];

                var option = `<option value=""> ${stat.data_stat} </option>`
                slctStats.innerHMTL += option;
                console.log(stat.data_stat)
             }
          })
       } else {
          throw('Houve um erro na API');
       }
    })
 }

 window.onload = () => {
    showUserStats();
 }