require(`dotenv`).config()
const express = require(`express`)
const mongoose = require(`mongoose`)
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)

const app = express()
app.use(express.json())

// models
const User = require(`./models/User`)

app.get('/', (req, res)=> {
    res.status(200).json({msg:`Bem-vindo à API!`})
}) 

// registro de usuário
app.post(`/auth/register`, async(req, res) => {
const {name, email, password, confirmpassword} = req.body

// validações
if(!name) {
    return res.status(422).json({msg: `O campo nome é obrigatório.`})
} 

if(!email) {
    return res.status(422).json({msg: `O campo e-mail é obrigatório.`})
} 

if(!password) {
    return res.status(422).json({msg: `O campo senha é obrigatório.`})
} 

if(password !== confirmpassword) {
    return res.status(422).json({msg: `As senhas não conferem.`}) 

}})

// credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.y4hs1ev.mongodb.net/?retryWrites=true&w=majority`)
.then(() =>  {
    app.listen(3000)
    console.log(`Conectado ao banco de dados.`)
})
.catch((err) => console.log(err))
    

