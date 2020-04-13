const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contrasena es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

//con esta funcion podemos eliminar una propiedad del JSON a la hora de devolver una respuesta
usuarioSchema.methods.toJSON = function() {
    let user = this; //con esto tenermos en user todos las propiedades de la respuesta
    let userObject = user.toObject(); //Con esto pasamos user a un objeto para trabajar sus propiedades
    delete userObject.password //con esto eliminamos la propiedad password de la respuesta.

    return userObject; //devolvemos el nuevo obj ya modificado. 
};

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });


module.exports = mongoose.model('Usuario', usuarioSchema);