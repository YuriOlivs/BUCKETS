function showUserData() {
    fetch("/stats/listar").then(function (resposta) {
        if(resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                console.log(resposta[0].pontos);
            })
        }
    })
}