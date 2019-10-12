const express = require('express')
const Usuario = require('../models/user')
const bcrypt = require('bcrypt')
const _ =require('underscore')

let app = express()

app.get('/usuarios',(req,res)=>{
    Usuario.find({}).exec((err,usuarios)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            usuarios
        })
    })
   
})

app.get('/usuario',(req,res)=>{
    let since = req.query.since || 0;
    since = Number(since)
    let limit = req.query.limit || 5;
    limit = Number(limit)
    Usuario.find({}).skip(since).limit(limit)
    .exec((err,usuarios)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }

        Usuario.count({},(err,conteo)=>{
            res.json({
                ok:true,
                usuarios,
                Total:conteo
            })
        })
    })
})

app.post('/usuario',function(req,res){
    let body = req.body

    let usuario = new Usuario({
        nombre:body.name,
        email:body.mail,
        apellido:body.surname,
        edad:body.age,
        direccion:body.address,
        role:body.role,
        password:bcrypt.hashSync(body.password,10)

    });
    usuario.save((err,usuarioDB)=>{
        if (err) {
           return res.status(400).json({
                ok:false,
                err
            })
        }

         res.json({
            ok:true,
            usuario:usuarioDB
        })
    })
    
})

app.put('/usuario/:id',(req,res)=>{
    let id = req.params.id
    let body = _.pick(req.body,['nombre','email','apellido','edad','direccion'])
    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,usuarioDB)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })

        }
        res.json({
            ok:true,
            usuario:usuarioDB
        })
    })
})
app.delete('/usuario/:id',(req,res)=>{
    let id = req.params.id
    Usuario.findByIdAndRemove(id,(err,UsuarioEliminado)=>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })

        }
        if (!UsuarioEliminado) {
            return res.status(404).json({
                ok:false,
                err:{
                    message:'El usuario no existe'
                }
            })
        }
        res.status(200).json({
            ok:true,
            usuario:UsuarioEliminado
        })
    })
})

app.get('/usuarios/:id',(req,res)=>{
    res.send('HEllo')
})

module.exports = app;