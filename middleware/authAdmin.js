const Usuario = require('../models/usuarioModel');

const authAdmin = async (req,res,next)=>{
    try {
        //Get user Information
        const user = await Usuario.findOne({
            _id:req.user.id
        });
        if(user.role === 0) return res.status(400).json({msg:"Acceso denegado. Permiso Administrador!."});
        next();
    } catch (err) {
        return res.status(500).json({msg:err.message});
    }
}

module.exports = authAdmin;