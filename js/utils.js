/**
 * Retorna o usuário do localStorage
 * @returns {User}
 */
function getUser() {
    if (localStorage.getItem('user')) 
        return JSON.parse(localStorage.getItem('user'));
    else 
        return null;
}

/**
 * Formata o preço
 * @param {float} valor 
 * @returns {string}
 */
function formatarPreco(valor) {
    const formato = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formato.format(valor);
}

/**
 * Desloga o usuário
 */
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}