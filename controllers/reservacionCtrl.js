const Reservacion = require('../models/reservacionesModel');

const reservacionCtrl = {
    getReservacion: async (req,res) =>{
        try {
            const reservaciones = await Reservacion.find();
            res.json({
                status: 'success',
                result: reservaciones.length,
                reservaciones: reservaciones
            })
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    createReservacion: async (req,res)=>{
        try {
            const {product_id, csalida,cdestino,horario,fecha, noadultos,noninos,tipo,precio,id_usuario} = req.body;
            
            const nuevaReservacion = new Reservacion({
                product_id, csalida: csalida.toLowerCase(), cdestino:cdestino.toLowerCase(), horario,fecha, noadultos, noninos,tipo,precio, id_usuario
            })

            await nuevaReservacion.save();
            return res.json({msg:"Reservación creada!"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    deleteReservacion: async (req,res)=>{
        try {
            await Reservacion.findByIdAndDelete(req.params.id);
            res.json({msg:"Reservación eliminada"});
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    updateReservacion: async (req,res)=>{
        try {
            const {csalida, cdestino, horario, fecha, noadultos, noninos, tipo,precio,id_usuario} = req.body;

            await Reservacion.findOneAndUpdate({_id:req.params.id},{
                csalida:csalida.toLowerCase(), cdestino:cdestino.toLowerCase(), horario, fecha, noadultos,noninos, tipo,precio,id_usuario
            });
            res.json({msg:"Reservación actualizada!"});

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = reservacionCtrl;