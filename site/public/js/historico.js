const containerHistorico = document.getElementById("container_historico");
const slctStats = document.getElementById("slct_stats");

function listarPIE(idUsuario) {
   fetch(`/stats/listar/${idUsuario}`)
   .then(function (resposta) {
      resposta.json().then(function (resposta) {
         if(resposta.status == 204) {
            console.log("ta vazio");
         } else {
            console.log("listar");
            console.log(resposta)
         }
      }) 
   }).catch(function (erro) {
      console.log("Não foram encontrados dados vindos do banco");
   })
}

function listarMedias(idUsuario) {
   var medias = [];

   fetch(`/stats/listarAcimaDaMedia/${idUsuario}`).then(function (resposta) {
      if(resposta.ok) {
         if(resposta.status == 204) {
            console.log("ta vazio");
         } else {
            resposta.json().then(function (resposta) {
               medias.push(resposta[0].qtd_acima);
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
               medias.push(resposta[0].qtd_abaixo);
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
               medias.push(resposta[0].qtd_media);
            });
         }
      }
   }).catch(function (resposta) {
      console.log("Houve um erro na API");
   });

   console.log(medias)
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
   var dados = {
      data: [],
      labels: []
   }

   fetch(`/stats/listarPontos/${idUsuario}`).then(function (resposta) {
      if(resposta.ok) {
         if(resposta.status == 204) {
            console.log("ta vazio");
         } else {
            resposta.json().then(function (resposta) {
               resposta.forEach(element => {
                  dados.labels.push(element.dataStat);
                  dados.data.push(element.pontos);
               });
            })
         }
      }
   });

   return dados
}

// function puxarDados() {
//    var idUsuario = sessionStorage.ID_USUARIO;

//    listarDatas(idUsuario);
//    listarPIE(idUsuario);
//    listarMedias(idUsuario);
//    listarPontos(idUsuario);
// } 