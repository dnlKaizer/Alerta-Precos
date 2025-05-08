/**
 * Retorna os produtos da Odinline 
 * em função do usuário
 * @param {User} user 
 * @returns {Cripto[]}
 */
async function getProdutos(user) {
    try {
        const resposta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${user.chave}/usuario`);
        const produtos = await resposta.json();
        return produtos;

    } catch (error) {
        alert("Erro ao buscar produtos.")
        return null;
    }
}

/**
 * Atualiza a tabela
 */
async function atualizaTabela() {
    apagarLinhas();

    const user = getUser();
    if (user == null) return;

    const produtos = await getProdutos(user);
    if (produtos == null) return;

    produtos.forEach(cripto => {
        adicionarLinha(cripto);
    });

    tabela.style.display = "table";
    msg.style.display = "none";
}

/**
 * Adiciona uma linha na tabela
 * @param {Cripto} cripto 
 */
function adicionarLinha(cripto) {
	// Cria uma nova linha
	const novaLinha = document.createElement("tr");

	// Cria e adiciona na nova linha as células com os valores
    const img = document.createElement("img");
    img.src = cripto.urlImagem;
    img.className = "crypto-img";

    const div = document.createElement("div");
    div.classList = "flex-center";
    div.appendChild(img);
	div.appendChild(document.createTextNode(cripto.descricao));

	const nome = document.createElement("td");
    nome.appendChild(div);
	novaLinha.appendChild(nome);

	const valor = document.createElement("td");
	valor.textContent = formatarPreco(cripto.valor);
	novaLinha.appendChild(valor);

    const alertImg = document.createElement("img");
    alertImg.src = "img/alerta.png";
    alertImg.classList = "alert_img";
    alertImg.onclick = alertar;

    const alert = document.createElement("td");
    alert.appendChild(alertImg);

    novaLinha.appendChild(alert);

	// Adiciona a nova linha ao tbody
	$("#tabela-body").append(novaLinha);
}

/**
 * Apaga as linhas da tabela
 */
function apagarLinhas() {
    $("#tabela-body").empty();
}

function alertar() {
    
}