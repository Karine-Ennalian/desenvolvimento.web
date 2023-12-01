var http = require("http")
var express = require("express")
var app = express()
const fs = require("fs")
const request = require('request')
var email

var port = 9999
var hostname = "localhost"

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get("/login", (req, res) =>{
    process.argv.forEach((val, index) =>{
        console.log(index + " <-> " +val)
    })

    console.log("Login : " + process.argv.slice(2, 3))

    email = process.argv.slice(2, 3)

    console.log(req.body.action)
    console.log(email)
    console.log("TERMINOU DE EXECUTAR LOGIN ")


})

app.get("/salvarlogin", (req, res) =>{  
    fs.appendFile("example.txt", email, err =>{
    if(err){
        console.error(err)
        return
    }
    })
    console.log("SALVANDO O LOGIN")
    console.log("login salvo: " + email)
    console.log(req.body.action)
})

app.post("/read",(req, res) =>{
    process.argv.forEach((val, index) =>{
        console.log(index + " <-> " +val)
    })

    console.log("\n")
    console.log("Nome: " + req.body.name)
    console.log("Telefone: " + process.argv.slice(3, 4))
    console.log("Status: " + req.body.status)
})

app.post("/description", (req, res) =>{
    console.log("\n")
    console.log("Emprego: " + req.body.job)
    console.log("Salario: R$ " + req.body.money)
    console.log("Idade: " + req.body.age)
})

app.listen(port, hostname, () => {
    console.log("Server executando em http://" + hostname + ":" + port)
})