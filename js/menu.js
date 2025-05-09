let produtoAtual = null;

$("#preco-alerta").maskMoney({
    prefix:'R$ ', allowNegative: false, thousands:'.', decimal:',', affixesStay: false
});

$('#modal-form').submit(function(event) {
    event.preventDefault(); // Impede o envio do formulário
    criarAlerta();
});

/**
 * Retorna os produtos da Odinline 
 * em função do usuário
 * @param {User} user 
 * @returns {Cripto[]}
 */
async function getProdutos(user) {
    if (user == null) return [];
    try {
        const resposta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${user.chave}/usuario`);
        const produtos = await resposta.json();
        return produtos;

    } catch (error) {
        alert("Erro ao buscar produtos.")
        return [];
    }
}

/**
 * Atualiza a tabela
 */
async function atualizaTabela() {
    apagarLinhas();

    const user = getUser();
    const produtos = await getProdutos(user);
    if (produtos.length == 0) {
        document.getElementById("tabela-menu").style.display = "none";
        document.getElementById("legenda-menu").style.display = "none";
        document.getElementById("msg-menu").style.display = "block";
        return;
    }

    produtos.forEach((cripto) => {
        adicionarLinha(cripto);
    });

    document.getElementById("tabela-menu").style.display = "table";
    document.getElementById("legenda-menu").style.display = "block";
    document.getElementById("msg-menu").style.display = "none";
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
    alertImg.classList = "icon pointer";
    alertImg.setAttribute("data-bs-toggle", "modal");
    alertImg.setAttribute("data-bs-target", "#modal-form");
    alertImg.addEventListener("click", () => {
        produtoAtual = cripto; // produto pode vir de localStorage ou da linha da tabela
        const precoAtual = cripto.valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        document.querySelector("#preco-alerta").value = precoAtual;
    });

    const alert = document.createElement("td");
    alert.style.display = "flex";
    alert.style.justifyContent = "flex-end";
    alert.appendChild(alertImg);

    novaLinha.appendChild(alert);

	// Adiciona a nova linha ao tbody
	$("#tbody-menu").append(novaLinha);
}

/**
 * Apaga as linhas da tabela
 */
function apagarLinhas() {
    $("#tbody-menu").empty();
}

function converterPrecoFloat(string) {
    return parseFloat(string.replace(/\./g, '').replace(',', '.'));
}

function criarAlerta() {
    let preco = converterPrecoFloat($("#preco-alerta").val());
    let acao = $('input[name="acao-alerta"]:checked').val() == 'comprar' ? true : false;
    let alertas = localStorage.getItem("alertas") ? JSON.parse(localStorage.getItem("alertas")) : [];

    const existe = alertas.some(alerta => alerta.id == produtoAtual.id);
    if (existe) {
        alert("Produto já possui alerta");
        return;
    }

    alertas.push(new Alerta(produtoAtual.id, produtoAtual.descricao, preco, acao));
    localStorage.setItem("alertas", JSON.stringify(alertas));
}