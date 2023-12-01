const express = require('express')
const bodyparser = require('body-parser')
const handlebars = require('express-handlebars')
const { request, response, params } = require('express');

const userCliente = require('../TrabalhoFinal/userClientes');
const userVendedor = require('../TrabalhoFinal/userVendedor');
const userProduto = require('../TrabalhoFinal/userProduto');

const router = express();

router.engine('handlebars', handlebars({defaultLayout: 'main'}))
router.set('view engine', 'handlebars')
router.use(bodyparser.urlencoded({extended: true}))
router.use(bodyparser.json())

router.get('/', async (request, response) => {
        try{
            const vendedores = await userVendedor.find(request.body);
            console.log(vendedores)
            response.render('./index', { vendedores: vendedores.map( vendedor => vendedor.toJSON()) })
        }catch(err){
            console.log(err);
            return response.status(400).send({error: 'Falha na busca dos Vendedores'});
              
        }
    
});

//rota de cadastro de cliente
router.post('/cadastroCliente', async (request,response) => {
    try{
        const cliente = await userCliente.create(request.body);
        return response.redirect('/login');
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha no Cadastrado do Cliente'});
    }
});

//busca de clientes
router.get('/cadastroCliente', async (request, response) => {
    response.render('cadastroCliente')
});

//atualizacao de clientes
router.put('/cadastroCliente/:id', async (request, response) => {
    const id = request.params.id;
    const name = request.body.name
    const sobrenome = request.body.sobrenome
    const email = request.body.email
    const cpf = request.body.cpf
    const senha = request.body.senha
    const cidade = request.body.cidade
    const estado = request.body.estado
    const cep = request.body.cep
    try {
        const cliente = await userCliente.findByIdAndUpdate(id,{
            $set: {
                name: name,
                sobrenome: sobrenome,
                email: email,
                cpf: cpf,
                senha: senha,
                cidade: cidade,
                estado: estado,
                cep: cep,
                
            },
        
        });
        return response.send({ cliente })
    } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Falha na atualização do Cliente'});
    }
});

//delete de clientes
router.delete('/cadastroCliente/:id', async (request, response) =>{
    const id = request.params.id;
    try {
       const cliente = await userCliente.findByIdAndDelete(id, (erro, result) => {
            if(erro)
                return response.send(500, erro)
        return response.send(result)
       })
    } catch (error) {
        response.status(500).send({message: 'Falha na remoção do Cliente'})
    }
});


router.get('/loja', (request, response) => {
    response.render('loja')
})

router.get('/detalhes', (request, response) => {
    response.render('detalhes')
})

router.get('/carrinho', (request, response) => {
    response.render('carrinho')
})

router.get('/finalizarCompra', (request, response) => {
    response.render('compra')
})

//rota de cadastro de Vendedores
router.post('/admVendedor', async (request,response) => {  
      try{
        const vendedor = await userVendedor.create(request.body);
        response.redirect('/');
      }catch(error){
        console.log(error);
        return response.status(400).send({erro: 'Falha no Cadastrado do Vendedor'});
      }
  });


// busca de Vendedores
router.get('/admVendedor', async (request, response) => {
    response.render('cadastroVendedor')
});

// atualizacao de empresa
router.put('/admVendedor/:id', async (request, response) => {
    const id = request.params.id;
    const nome = request.body.nameEmpresa
    const email = request.body.emailEmpresa
    const cpf = request.body.cpf
    const tipoProduto = request.body.tipoProduto
    const cep = request.body.cep
    const estado = request.body.estado
    const city = request.body.cidade
    try {
        const vendedor = await userVendedor.findByIdAndUpdate(id,{
            $set: {
                nameEmpresa: nome,
                emailEmpresa: email,
                cpf: cpf,
                tipoProduto: tipoProduto,
                cep: cep,
                estado: estado,
                cidade: city, 
            },
        
        });
        return response.send({vendedor})
    } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Falha na atualização da Empresa'});
    }
});

//Deletar Vendedores
router.delete('/admVendedor/:id', async (request, response) =>{
    const id = request.params.id;
    try {
       const vendedor = await userVendedor.findByIdAndDelete(id, (err, result) => {
            if(err)
                return response.send(500, err)
        return response.send(result)
       })
    } catch (error) {
        response.status(500).send({message: 'Falha na remoção do Vendedor'})
    }
});

//rota de cadastro de produto
router.post('/cadastroProduto', async (request,response) => {  
    try{
        const produto = await userProduto.create(request.body);
        return response.redirect('./cadastroProduto');
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha no Cadastrado de Produto'});
    }
});

// lista produto
router.get('/cadastroProduto', async (request, response) => {
    try{
        const produtos = await userProduto.find(request.body);
        response.render('./cadastroProduto', { produtos: produtos.map( produtos => produtos.toJSON()) })
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha na busca de Produtos'});
          
    }
});

//Update de protudo
router.post('/cadastroProdutoAtt/:id', async (request, response) => {
    const id = request.params.id;
    const nome = request.body.nameProduto
    const valorPro = request.body.valorProduto
    const qtd = request.body.qtdProduto
    const description = request.body.descricaoProduto
    console.log(nome)
    console.log(valorPro)
    console.log(qtd)
    console.log(description)

    try {
        const produto = await userProduto.findByIdAndUpdate(id,{
            $set: {
                nameProduto: nome,
                valorProduto: valorPro,
                qtdProduto: qtd,
                descricaoProduto: description,
            },
        });
        response.send({ produto })
        //response.redirect('/cadastroProduto')
    } catch (error) {
        console.log(error);
        return response.status(400).send({error: 'Falha na atualização do Produto'});
    }
});

// delete de produto 
router.get('/cadastroProduto/:id', async (request, response) =>{
    const id = request.params.id;
    try {
       const produtos = await userProduto.findByIdAndDelete(id, (err, result) => {
        return response.redirect('./')
            if(err)
                return response.send(500, err)
        
       })
    } catch (error) {
        response.status(500).send({message: 'deu ruim ao remover'})
    }
});

// AUtenticacao de login
router.get('/login', async (request, response) => {
    response.render('login')
    response.send({user});
});

router.get('/logadoVendedor', async (request, response) => {
    try{
        const vendedores = await userVendedor.find(request.body);
        console.log(vendedores)
        response.render('./logadoVendedor', { vendedor: vendedores.map( vendedor => vendedor.toJSON()) })
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha na busca do Vendedor'});
          
    }

});

router.get('/logado', async (request, response) => {
    try{
        const vendedores = await userVendedor.find(request.body);
        console.log(vendedores)
        response.render('./logado', { vendedor: vendedores.map( vendedor => vendedor.toJSON()) })
    }catch(err){
        console.log(err);
        return response.status(400).send({error: 'Falha na busca do Vendedor'});
          
    }

});


router.post('/login', async (request, response) => {
    const { email } = request.body.email;

    const userVendedores = await userVendedor.findOne({ email });
    const userClientes = await userCliente.findOne({ email });

    if(userVendedores.email == email)
        response.redirect('/logadoVendedor')
    else if(userClientes.email != null)
        response.redirect('/logado')
    else
        return response.status(400).send({error: 'Usuario nao encontrado'});
});


module.exports = app => app.use('/', router);