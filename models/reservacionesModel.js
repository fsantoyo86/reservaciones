const mongoose = require('mongoose');

const reservacionesSchema = new mongoose.Schema({
    product_id:{
        type:String,
        trim: true,
        required:false,
    },
    csalida:{
        type:String,
        trim:true,
        required:true
    },
    cdestino:{
        type:String,
        trim:true,
        required:true
    },
    horario:{
        type:String,
        required:false
    },
    fecha:{
        type:String,
        required:true
    },
    noadultos:{
        type:Number,
        required:false
    },
    noninos:{
        type:Number,
        required:false
    },
    tipo:{
        type:String,
        required:false
    },
    precio: {
        type:Number,
        required:true,
    },
    id_usuario:{
        type:String,
        required:true,
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Reservaciones", reservacionesSchema);