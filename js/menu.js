// Retorna produtos do odinline em função do usuário
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

async function atualizaTabela() {
    apagarLinhas($("#tabela"));

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

function adicionarLinha(cripto) {
	// Cria uma nova linha
	const novaLinha = document.createElement("tr");

	// Cria e adiciona na nova linha as células com os valores
    const img = document.createElement("img");
    img.src = cripto.urlImagem;
    img.className = "crypto-img";

	const nome = document.createElement("td");
    nome.appendChild(img);
	nome.appendChild(document.createTextNode(cripto.descricao));
	novaLinha.appendChild(nome);

	const valor = document.createElement("td");
	valor.textContent = formatarPreco(cripto.valor);
	novaLinha.appendChild(valor);

	// Adiciona a nova linha ao tbody
	$("#tabela-body").append(novaLinha);
}

function apagarLinhas() {
    $("#tabela-body").empty();
}