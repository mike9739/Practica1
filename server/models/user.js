const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


let Schema = mongoose.Schema
let validRoles = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol valido'
}
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        default:'USER_ROLE',
        enum:validRoles
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es necesaria']
    },
    edad:{
        type:Number,
        required:true
    }

  
 
});

usuarioSchema.methods.toJSON = function(){
    let usur = this;
    let usurObject = usur.toObject();
    delete usurObject.password;
    return usurObject
}

usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe ser unico'})
module.exports = mongoose.model('Usuario', usuarioSchema);
