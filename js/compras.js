
/**
 * Atualiza a tabela
 */
async function atualizaTabela() {
    apagarLinhas();

    let compras = localStorage.getItem("compras") ? 
    JSON.parse(localStorage.getItem("compras")) : [];

    if (compras.length == 0) {
        document.getElementById("tabela-compras").style.display = "none";
        document.getElementById("msg-compras").style.display = "block";
        return;
    }

    compras.forEach((compra) => {
        adicionarLinha(compra);
    });

    document.getElementById("tabela-compras").style.display = "table";
    document.getElementById("msg-compras").style.display = "none";
}

/**
 * Adiciona uma linha na tabela
 * @param {Compra} compra 
 */
function adicionarLinha(compra) {
	// Cria uma nova linha
	const novaLinha = document.createElement("tr");

	const nome = document.createElement("td");
    nome.textContent = compra.nome;
	novaLinha.appendChild(nome);

	const valor = document.createElement("td");
	valor.textContent = formatarPreco(compra.valor);
	novaLinha.appendChild(valor);

    const data = document.createElement("td");
    data.textContent = compra.data;
    novaLinha.appendChild(data);

	// Adiciona a nova linha ao tbody
	$("#tbody-compras").append(novaLinha);
}

/**
 * Apaga as linhas da tabela
 */
function apagarLinhas() {
    $("#tbody-compras").empty();
}