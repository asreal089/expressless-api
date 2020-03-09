const buscadorcep = require('buscadorcep');

module.exports = function (CEP) {
    const endereco = await buscadorcep(CEP);
    return endereco;
}