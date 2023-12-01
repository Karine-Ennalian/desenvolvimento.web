const mongoose = require('../TrabalhoFinal/connectionDB');

const ProdutoShema = new mongoose.Schema({
    nameProduto: {
        type: String,
        required: true,
    },
    valorProduto: {
        type: Number,
        required: true,
    },
    qtdProduto: {
        type: Number,
        required: true,
    },
    descricaoProduto: {
        type: String,
        required: true,
    }
});

const Produto = mongoose.model('Produto', ProdutoShema);

module.exports = Produto;