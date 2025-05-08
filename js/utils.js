function getUser() {
    if (localStorage.getItem('user')) 
        return JSON.parse(localStorage.getItem('user'));
    else 
        return null;
}

function formatarPreco(valor) {
    const formato = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formato.format(valor);
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}