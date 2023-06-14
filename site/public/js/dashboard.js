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
                     responsive: true,
                  },
               }
            });
         }
      })
   }).catch(function (erro) {
      console.log("Não foram encontrados dados vindos do banco: "+erro);
   })
}

function listarMediasMes(idUsuario) {
   return new Promise(function(resolve, reject) {
      var data = [];
      var labels = [];

      function handleResponse(resposta) {
         if (resposta.ok) {
            if (resposta.status == 204) {
               console.log("ta vazio");
            } else {
               return resposta.json();
            }
         } else {
            throw new Error("Houve um erro na API.");
         }
      }

      fetch(`/stats/listarAcimaDaMedia/${idUsuario}`)
         .then(handleResponse)
         .then(function (resposta) {
            data.push(resposta[0].qtd_acima);
            labels.push('Acima da média');
         })
         .catch(function (error) {
            console.log(error);
            reject(error);
         });

      fetch(`/stats/listarAbaixoDaMedia/${idUsuario}`)
         .then(handleResponse)
         .then(function (resposta) {
            data.push(resposta[0].qtd_abaixo);
            labels.push('Abaixo da média');
         })
         .catch(function (error) {
            console.log(error);
            reject(error);
         });

      fetch(`/stats/listarNaMedia/${idUsuario}`)
         .then(handleResponse)
         .then(function (resposta) {
            data.push(resposta[0].qtd_media);
            labels.push('Na média');
            resolve({ data, labels });
         })
         .catch(function (error) {
            console.log(error);
            reject(error);
         });
   });
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
                     responsive: true,
                  },
               });
            })
         }
      }
   });
}

async function listarMediasGerais(idUsuario) {
   var spanPIE = document.getElementById("media_pie");
   var spanPTS = document.getElementById("media_pts");
   var spanAST = document.getElementById("media_ast");
   var spanREB = document.getElementById("media_reb");

   try {
      await renderIndicators(spanPIE, spanPTS, spanAST, spanREB, idUsuario);
      verifMedias();
   } catch (error) {
      console.error("Houve um erro:", error);
      // Você pode tomar outras ações aqui, se necessário
   }
}

function renderIndicators(spanPIE, spanPTS, spanAST, spanREB, idUsuario) {
   return new Promise(function (resolve, reject) {
      const fetchPromises = [];

      const avgs = fetch(`/stats/listarAvgPiePts/${idUsuario}`)
         .then(function (resposta) {
            if (resposta.ok) {
               if (resposta.status == 204) {
                  console.log("ta vazio");
               } else {
                  return resposta.json();
               }
            }
         })
         .then(function (resposta) {
            spanPIE.innerText = (resposta[0].media_pie * 100).toFixed(1);
            spanAST.innerText = resposta[0].media_ast.toFixed(1);
            spanPTS.innerText = resposta[0].media_pts.toFixed(1);
         })
         .catch(function (erro) {
            console.error("Houve um erro na API");
            reject(erro);
         });

      fetchPromises.push(avgs);

      const avgReb = fetch(`/stats/listarMediaDeReb/${idUsuario}`)
         .then(function (resposta) {
            if (resposta.ok) {
               if (resposta.status == 204) {
                  console.log("ta vazio");
               } else {
                  return resposta.json();
               }
            }
         })
         .then(function (resposta) {
            spanREB.innerText = resposta[0].media_reb.toFixed(1);
         })
         .catch(function (erro) {
            console.error("Houve um erro na API");
            reject(erro);
         });

      fetchPromises.push(avgReb);

      Promise.all(fetchPromises)
         .then(function () {
            resolve();
         })
         .catch(function (error) {
            console.error("Houve um erro em uma das chamadas fetch");
            reject(error);
         });
   });
}

function listarPtsPie(idUsuario) {
   var pie = [];
   var pontos = [];
   fetch(`/stats/listarPontosPie/${idUsuario}`).then(function (resposta) {
      if(resposta.ok) {
         if(resposta.status == 204) {
            console.log("ta vazio")
         } else {
            resposta.json().then(function (resposta) {
               resposta.forEach(element => {
                  pie.push(element.pie);
                  pontos.push(element.pontos);
               });

               pie = pie.map(x => x * 100);

               var ctx = document.getElementById('scatterChart').getContext('2d');
               new Chart(ctx, {
                 type: 'scatter',
                 data: {
                   datasets: [{
                     label: 'Relação entre Índice PIE e Pontos',
                     data: pie.map((value, index) => ({x: value, y: pontos[index]})),
                     backgroundColor: '#4D89FF12', // Cor de preenchimento
                     borderColor: '#4D89FF', // Cor da borda
                     borderWidth: 1
                   }]
                 },
                 options: {
                   scales: {
                     x: {
                       title: {
                         display: true,
                         text: 'Índice PIE'
                       }
                     },
                     y: {
                       title: {
                         display: true,
                         text: 'Quantidade de Pontos'
                       }
                     }
                   },
                   layout: {
                     padding: {
                        bottom: 30,
                        top: 15
                     },
                  },
                  responsive: true,
                 }
               });
            });
         }
      }
   })
   .catch(function (error) {
      console.error("Houve um erro na API: "+error)
   })
}

function renderCharts() {
   var idUsuario = sessionStorage.ID_USUARIO;

   listarPontos(idUsuario);
   listarPIE(idUsuario);
   listarMediasGerais(idUsuario);
   listarPtsPie(idUsuario);

   listarMediasMes(idUsuario)
   .then(function (medias) {
      var ctx = document.getElementById("medias_historico");
      var mediasChart = new Chart(ctx, {
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
            responsive: true,
         },
      });
   })
   .catch(function (error) {
      console.log(error); // Trate o erro, se necessário
   });

   // var mediasMes = listarMediasMes(idUsuario);

   // mediasChart.data.labels = mediasMes.labels;
   // mediasChart.data.datasets[0].data  = mediasMes.data;
   // mediasChart.update();
   // listarDatas(idUsuario);
}

function verifMedias() {
   var pie = parseInt(Number(document.getElementById("media_pie").innerText));
   var pts = parseInt(Number(document.getElementById("media_pts").innerText));
   var ast = parseInt(Number(document.getElementById("media_ast").innerText));
   var reb = parseInt(Number(document.getElementById("media_reb").innerText));

   var strings = [pts.toString(), ast.toString(), reb.toString()]

   var analise = document.getElementById("media_analise");
   var qtdDouble = 0;

   for (let i = 0; i < strings.length; i++) {
      const element = strings[i];
      if(element.length >= 2) {
         qtdDouble++;
      }
   }

   if(qtdDouble == 3) {
      analise.innerHTML = `Parabéns, você está com uma média de <b id="td_tooltip">Triple Double!</b><i class="ph ph-info" id="td_tooltip"></i>`;
      tippy("#td_tooltip", {
         content: 'Um Triple Double ocorre quando um jogador obtem 2 dígitos em 3 das estatísticas principais.',
         placement: 'bottom',
      });
   } else if(qtdDouble == 2) {
      analise.innerHTML = `Parabéns, você está com uma média de <b id="dd_tooltip">Double Double!</b><i class="ph ph-info" id="dd_tooltip"></i>`;
      tippy("#dd_tooltip", {
         content: 'Um Double Double ocorre quando um jogador obtem 2 dígitos em 2 das estatísticas principais.',
         placement: 'bottom',
      });
   } else if(pts >= 15 && ast >= 7 && reb >= 6 ) {
      analise.innerHTML = `Parabéns, você está com uma média alta em todas as estatísticas!`;      
   } else if(pts >= 15 && ast >= 7) {
      analise.innerHTML = `Parabéns, você está com uma média alta em pontos e assistências`;
   } else if(pts >= 15 && reb >= 6) {
      analise.innerHTML = `Parabens, você está com uma média alta em pontos e rebotes!`;
   } else if(ast >= 7 && reb >= 6) {
      analise.innerHTML = `Parabéns, você está com uma média alta em assistências e rebotes!`;
   } else if(pts >= 15) {
      analise.innerHTML = `Parabéns, você está com uma média alta em pontos!`;
   } else if(ast >= 6) {
      analise.innerHTML = `Parabéns, você está com uma média alta em assistências!`;
   } else if(reb >= 6) {
      analise.innerHTML = `Parabéns, você está com uma média alta em rebotes!`;
   } else {
      analise.innerHTML = `Não há dados relevantes para destacar 😔`;
   }

   if(analise.innerHTML.startsWith("Parabéns") == true) {
      if(pie > 20) {
         analise.innerHTML += ` E possui uma média de PIE muito alta!`;
      } else if(pie > 12) {
         analise.innerHTML += ` E possui uma média de PIE alta!`;
      } else {
         return
      }
   } else {
      if(pie > 20) {
         analise.innerHTML = `Parabéns, você possui uma média de PIE  <b>muito alta</b>!`;
      } else if(pie > 12) {
         analise.innerHTML = `Parabéns, você possui uma média de PIE alta!`;
      } else {
         return
      }
   }
}

function ajustSize(elemento, tamanho, width) {

   if(elemento.startsWith("#")) {
      elemento = elemento.replaceAll("#", '');
      let ajust = document.getElementById(elemento);

      if(width == true) {
         ajust.style.width = tamanho;
         setTimeout(() => {
            ajustSize(elemento, tamanho, true);
         }, 500);
      } else {
         console.log(ajust);
         ajust.style.height = tamanho;
         setTimeout(() => {
            ajustSize(elemento, tamanho, false);
         }, 500);
      }
   } else {
      let ajust = document.querySelectorAll(elemento);

      if(width == true) {
         ajust.forEach(div => {
            div.style.width = tamanho;
         });
         setTimeout(() => {
            ajustSize(elemento, tamanho, true);
         }, 500);
      } else {
         ajust.forEach(div => {
            div.style.height = tamanho;
         });
         setTimeout(() => {
            ajustSize(elemento, tamanho, false);
         }, 500);
      }
   }
}

window.onload = () => {
   renderCharts(),
   greetings(),
   ajustSize(".container", "46vw", true),
   ajustSize("#indicators_large", "31.5vh", false),
   ajustSize("#indicators_large", "37vw", true),
   changeNavDash()
}