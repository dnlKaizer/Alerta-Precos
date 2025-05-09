let idProduto = null;

/**
 * Atualiza a tabela
 */
async function atualizaTabela() {
    apagarLinhas();

    let alertas = localStorage.getItem("alertas") ? 
    JSON.parse(localStorage.getItem("alertas")) : [];

    if (alertas.length == 0) {
        document.getElementById("tabela-alerta").style.display = "none";
        document.getElementById("msg-alerta").style.display = "block";
        return;
    }

    alertas.forEach((alerta) => {
        adicionarLinha(alerta);
    });

    document.getElementById("tabela-alerta").style.display = "table";
    document.getElementById("msg-alerta").style.display = "none";
}

/**
 * Adiciona uma linha na tabela
 * @param {Alerta} alerta 
 */
function adicionarLinha(alerta) {
	// Cria uma nova linha
	const novaLinha = document.createElement("tr");

	const nome = document.createElement("td");
    nome.textContent = alerta.nome;
	novaLinha.appendChild(nome);
    
	const valor = document.createElement("td");
	valor.textContent = formatarPreco(alerta.valor);
	novaLinha.appendChild(valor);

	const tipo = document.createElement("td");
    tipo.textContent = alerta.isCompra ? "Compra" : "Notificação";
	novaLinha.appendChild(tipo);

    const deleteImg = document.createElement("img");
    deleteImg.src = "img/delete.png";
    deleteImg.classList = "icon2 pointer";
    deleteImg.addEventListener("click", () => {
        deleteAlerta(alerta.id);
    });

    const deleteTd = document.createElement("td");
    deleteTd.style.display = "flex";
    deleteTd.style.justifyContent = "flex-end";
    deleteTd.appendChild(deleteImg);

    novaLinha.appendChild(deleteTd);

	// Adiciona a nova linha ao tbody
	$("#tbody-alerta").append(novaLinha);
}

/**
 * Apaga as linhas da tabela
 */
function apagarLinhas() {
    $("#tbody-alerta").empty();
}

function getAlertas() {
    let alertas;
    if (localStorage.getItem("alertas")) {
        alertas = JSON.parse(localStorage.getItem("alertas"));
    } else {
        alertas = [];
    }
    return alertas;
}

function deleteAlerta(id) {
    const alertas = getAlertas();
    alertas.forEach((alerta, i) => {
        if (alerta.id == id) {
            alertas.splice(i, 1);
            localStorage.setItem("alertas", JSON.stringify(alertas));
            atualizaTabela();
            return;
        }
    });
}