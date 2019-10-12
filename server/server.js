require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const _ = require('underscore')
let app = express()



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(require('./routes/usuario'))

mongoose.connect('mongodb://localhost:27017/users',{useNewUrlParser:true,useUnifiedTopology:true},(err,res)=>{
    if (err)  throw err;
 
    console.log('Base de datos Online');
})




app.listen(process.env.PORT,()=>{
    console.log(`Escuchando en el puerto ${process.env.PORT}`)
})
