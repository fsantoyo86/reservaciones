const mongoose = require('mongoose');

const ciudadesModel = new mongoose.Schema({
    ciudad_id:{
      type: String,
      required:true,
      unique:true
    },
    nombre: {
      type: String,
      required:true,
      unique: true,
    },
    opcionuno: {
      nombre: {
        type: String,
      },
      horario: {
        type: String,
      },
      precio: {
        type: Number,
      },
    },
    opciondos: {
      nombre: {
        type: String,
      },
      horario: {
        type: String,
      },
      precio: {
        type: Number,
      },
    },
    opciontres: {
      nombre: {
        type: String,
      },
      horario: {
        type: String,
      },
      precio: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ciudades",ciudadesModel);