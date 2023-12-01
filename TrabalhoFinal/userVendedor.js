const mongoose = require('../TrabalhoFinal/connectionDB');
const ProdutoShema = require('./userProduto');
//const userProduto = require('../back-end/userProdutos')

const VendedorShema = new mongoose.Schema({
    nameVendedor: {
        type: String,
        required: true,
    },
    emailVendedor: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    tipoProduto: {
        type: String,
        required: false,
    },
    cep: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    }
});

const Vendedor = mongoose.model('Vendedor', VendedorShema);

module.exports = Vendedor;