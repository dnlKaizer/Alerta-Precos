let idProduto = null;

$("#preco-alerta").maskMoney({
    prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: false
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

    produtos.forEach((cripto) => {
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
    alertImg.setAttribute("data-bs-toggle", "modal");
    alertImg.setAttribute("data-bs-target", "#modal-form");
    alertImg.addEventListener("click", () => {
        idProduto = cripto.id; // produto pode vir de localStorage ou da linha da tabela
    });

    const alert = document.createElement("td");
    alert.style.display = "flex";
    alert.style.justifyContent = "flex-end";
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

function criarAlerta() {
    let preco = parseFloat($("#preco-alerta").val().replace(/\./g, '').replace(',', '.'));
    let acao = $('input[name="acao-alerta"]:checked').val() == 'comprar' ? true : false;
    let alertas = localStorage.getItem("alertas") ? JSON.parse(localStorage.getItem("alertas")) : [];

    const existe = alertas.some(alerta => alerta.id == idProduto);
    if (existe) {
        alert("Produto já possui alerta");
        return;
    }

    alertas.push(new Alerta(idProduto, preco, acao));
    localStorage.setItem("alertas", JSON.stringify(alertas));
}