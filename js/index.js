/**
 * Verifica se o usuário está logado
 */
function verificarUser() {
    const user = getUser();
    if (user != null) {
        window.location.href = "menu.html";
    }
}

// Regras para validação de formulário de login
$(document).ready(function () {
    $("#form").validate({
        rules: {
            login: { required: true },
            senha: { required: true }
        },
        messages: {
            login: { required: "Campo obrigatório" },
            senha: { required: "Campo obrigatório" }
        },
        submitHandler: function () {
            autenticar();
        }
    });
});

/**
 * Autentica os dados do formulário
 * com a API da OdinLine
 */
async function autenticar() {
    if ($("#form").valid()) {
        const login = $("#login").val();
        const senha = $("#senha").val();

        try {
            const resposta = await fetch(`https://api-odinline.odiloncorrea.com/usuario/${login}/${senha}/autenticar`);
            const usuario = await resposta.json();

            if (usuario.id > 0) {
                localStorage.setItem("user", JSON.stringify(usuario));
                window.location.href = "menu.html";
            } else {
                alert("Usuário ou senha incorretos.")
            }
        } catch (error) {
            alert("Erro ao autenticar usuário.")
        }
    }
}