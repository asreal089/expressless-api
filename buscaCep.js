const buscadorcep = require("buscadorcep");

module.exports = async function(CEP) {
	const endereco = await buscadorcep(CEP);
	return endereco;
};
