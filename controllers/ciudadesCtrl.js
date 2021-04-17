const Ciudad = require('../models/ciudadesModel');

const ciudadesCtrl = {
  getCiudades: async (req, res) => {
    try {
      const ciudades = await Ciudad.find();
      res.json(ciudades);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCiudad:async(req,res) =>{
    const {nombre} = req.body;
    try {
        const ciudad = await Ciudad.findOne({nombre});
        res.json(ciudad);
    } catch (err) {
        return res.status(500).json({msg:err.message});
    }
  },
  createCiudad: async (req, res) => {
    try {
      console.log(req.body);
      const { ciudad_id, nombre, opcionuno,opciondos,opciontres } = req.body;
      const ciudad = await Ciudad.findOne({ nombre });
      if (ciudad)
        return res.status(400).json({ msg: "Ya existe la ciudad." });

      const nuevaCiudad = new Ciudad({ ciudad_id, nombre,opcionuno,opciondos,opciontres });
      await nuevaCiudad.save();
      res.json({ msg: "Ciudad creada." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCiudad: async (req, res) => {
    try {
      await Ciudad.findByIdAndDelete(req.params.id);
      res.json({ msg: "Ciudad Eliminada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCiudad: async (req, res) => {
    try {
      const {nombre,opcionuno,opciondos,opciontres} = req.body;
      await Ciudad.findOneAndUpdate({_id:req.params.id},{nombre,opcionuno,opciondos,opciontres});
      res.json({msg:"Ciudad Actualizada"});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = ciudadesCtrl;