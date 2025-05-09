/**
 * Verifica se o produto chegou no preço determinado.
 * @param {Alerta} alerta 
 * @returns 
 */
async function verificaProduto(alerta) {
    try {
        const resposta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${alerta.id}`);
        const produto = await resposta.json();

        if (produto.valor < alerta.valor) {
            if (alerta.isCompra) {
                let compras = localStorage.getItem("compras") ? 
                JSON.parse(localStorage.getItem("compras")) : [];

                compras.push(new Compra(alerta.id, alerta.nome, alerta.valor, (new Date()).toLocaleDateString('pt-BR')));

                localStorage.setItem("compras", JSON.stringify(compras));

                alert("A moeda " + alerta.nome + " foi comprada por " + formatarPreco(alerta.valor) + ".");
            } else {
                alert("A moeda " + alerta.nome + " chegou ao valor estipulado de " + formatarPreco(alerta.valor) + ".");
            }
            removerAlerta(alerta);
        }
    } finally {}
}

function removerAlerta(alerta) {
    const alertas = localStorage.getItem("alertas") ? 
        JSON.parse(localStorage.getItem("alertas")) : [];

    alertas.forEach((item, i) => {
        if (item.id == alerta.id) {
            alertas.splice(i, 1);
            localStorage.setItem("alertas", JSON.stringify(alertas));
            return;
        }
    });
}

async function verificarTodosAlertas() {
    const alertas = localStorage.getItem("alertas") ? 
        JSON.parse(localStorage.getItem("alertas")) : [];

    // Executa todas as verificações em paralelo (sem travar o navegador)
    await Promise.all(alertas.map(alerta => verificaProduto(alerta)));
}

// Inicia a verificação a cada 30 segundos
setInterval(verificarTodosAlertas, 5000); // 5000 = 5 segundos