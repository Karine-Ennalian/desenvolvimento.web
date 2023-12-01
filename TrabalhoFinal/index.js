const express = require('express');
const bodyParser = require('body-parser');
const { request, response } = require('express');

const portaHttp = 9999;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('../TrabalhoFinal/routes')(app);

app.listen(portaHttp, () =>{
    console.log('Servidor executano na porta: ' + portaHttp)
})