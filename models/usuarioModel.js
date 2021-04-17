const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    carrito: {
        type:Array,
        default:[]
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Usuarios',usuarioSchema);