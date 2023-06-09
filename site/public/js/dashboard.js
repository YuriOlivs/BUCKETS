const containerHistorico = document.getElementById("container_historico");
const slctStats = document.getElementById("slct_stats");

function listarPIE(idUsuario) {
   var data = [];
   var labels = [];
   fetch(`/stats/listarPIE/${idUsuario}`)
   .then(function (resposta) {
      resposta.json().then(function (resposta) {
         if(resposta.status == 204) {
            data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
         } else {
            resposta.forEach(element => {
               data.push(element.pie);
               labels.push(element.dataStat);
            });

            data = data.map(x => x * 100);

            console.log(data);

            var ctx = document.getElementById("pie_historico");
            new Chart(ctx, {
               type: 'line',
               data: {
                  labels: labels,
                  datasets: [{
                     label: 'Índice PIE',
                     data: data,
                     backgroundColor: '#4D89FF12',
                     borderColor: '#4D89FF',
                     borderWidth: 1
                  }]
               },
               options: {
                  layout: {
                     padding: {
                        bottom: 15,
                        top: 15
                     },
                  },
               }
            });
         }
      })
   }).catch(function (erro) {
      console.log("Não foram encontrados dados vindos do banco: "+erro);
   })
}

function listarMedias(idUsuario) {
   var data = [];
   var labels = [];

   fetch(`/stats/listarAcimaDaMedia/${idUsuario}`).then(function (resposta) {
      if(resposta.ok) {
         if(resposta.status == 204) {
            console.log("ta vazio");
         } else {
            resposta.json().then(function (resposta) {
               data.push(resposta[0].qtd_acima);
               labels.push('Acima da média');
            });
         }
      }
   }).catch(function (resposta) {
      console.log("Houve um erro na API.");
   });

   fetch(`/stats/listarAbaixoDaMedia/${idUsuario}`).then(function (resposta) {
      if(resposta.ok) {
         if(resposta.status == 204) {
            console.log("ta vazio");
         } else {
            resposta.json().then(function (resposta) {
               data.push(resposta[0].qtd_abaixo);
               labels.push('Abaixo da média');
            });
         }
      }
   }).catch(function (resposta) {
      console.log("Houve um erro na API");
   });

   fetch(`/stats/listarNaMedia/${idUsuario}`).then(function (resposta) {
      if(resposta.ok) {
         if(resposta.status == 204) {
            console.log("ta vazio");
         } else {
            resposta.json().then(function (resposta) {
               data.push(resposta[0].qtd_media);
               labels.push('Na média');
            });
         }
      }
   }).catch(function (resposta) {
      console.log("Houve um erro na API");
   });

   var medias = {
      data,
      labels
   }

   console.log("Medias")
   console.log(labels);
   console.log(data);
   console.log("Medias fim")

   return medias
}

function listarDatas(idUsuario) {
   const select = document.getElementById("slct_stats");
   fetch(`/stats/listarDatasStats/${idUsuario}`).then(function (resposta) {
      if(resposta.ok) {
            if(resposta.status == 204) {
               console.error("ta vazio");
            } else {
               resposta.json().then(function (resposta) {
                  resposta.forEach(data => {
                     let option = document.createElement("option");
                     option.setAttribute("value", data.idStats);
                     option.textContent = data.datas;
                     select.appendChild(option);
                  });
               })
            }
      }
   }).catch(function (resposta) {

   })
}

function listarPontos(idUsuario) {
   var data = [];
   var labels = []
   fetch(`/stats/listarPontos/${idUsuario}`).then(function (resposta) {
      if(resposta.ok) {
         if(resposta.status == 204) {
            data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
         } else {
            resposta.json().then(function (resposta) {
               resposta.forEach(element => {
                  data.push(element.pontos);
                  labels.push(element.dataStat);
               });

               var ctx = document.getElementById("pontos_historico");
               new Chart(ctx, {
                  type: 'line',
                  data: {
                     labels: labels,
                     datasets: [{
                        label: 'Estatísticas',
                        data: data,
                        backgroundColor: '#4D89FF12',
                        borderColor: '#4D89FF',
                        borderWidth: 1
                     }]
                  },
                  options: {
                     layout: {
                        padding: {
                           bottom: 15,
                           top: 15
                        },
                     },
                  }
               });
            })
         }
      }
   });
}

function renderCharts() {
   var idUsuario = sessionStorage.ID_USUARIO;

   listarPontos(idUsuario);
   listarPIE(idUsuario);
   var medias = listarMedias(idUsuario);

   var ctx = document.getElementById("medias_historico");
   new Chart(ctx, {
      type: 'bar',
      data: {
         labels: medias.labels,
         datasets: [{
            label: 'Índice PIE',
            data: medias.data,
            backgroundColor: '#4D89FF12',
            borderColor: '#4D89FF',
            borderWidth: 1
         }]
      },
      options: {
         layout: {
            padding: {
               bottom: 15,
               top: 15
            },
         },
      }
   });
   // listarDatas(idUsuario);
}

// var ctxMedias = document.getElementById("medias_historico");
// var mediasLineChart = new Chart(ctxMedias, {
//    type: 'line',
//    data: {
//       labels: ['Arremessos errados', 'Lances livres errados', 'Turnovers', 'Arremessos certos', 'Lances livres certos', 'Bolas roubadas'],
//       datasets: [{
//          label: 'Estatísticas',
//          data: [0, 0, 0, 0, 0, 0],
//          backgroundColor: '#4D89FF12',
//          borderColor: '#4D89FF',
//          borderWidth: 1
//       }],
//    },
//    options: chartOption
// });