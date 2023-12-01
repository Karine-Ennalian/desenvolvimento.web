const mongoose = require('../TrabalhoFinal/connectionDB');

const ClienteShema = new mongoose.Schema({
    nameCliente: {
        type: String,
        required: true,
    },
    sobrenomeCliente: {
        type: String,
        required: true,
    },
    emailCliente: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    cidade: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    cep: {
        type: String,
        required: true,
    }
});

const Cliente = mongoose.model('Cliente', ClienteShema);

module.exports = Cliente;