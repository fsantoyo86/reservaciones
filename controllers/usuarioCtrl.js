const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { create } = require('../models/usuarioModel');

const usuarioCtrl = {
  register: async (req, res) => {
    try {
        const {nombre, email, password} = req.body;
        const usuario = await Usuario.findOne({email});
        if(usuario) return res.status(400).json({msg: "Ya existe el email."})

        if(password.length < 6){
            return res.status(400).json({msg:"La contraseña debe contener al menos 6 caracteres."})
        }

        //password encryption
        const passwordHash=await bcrypt.hash(password,10);
        const nuevoUsuario = new Usuario({
            nombre,email,password:passwordHash
        });
        //save mongodb user
        await nuevoUsuario.save();

        //Then create jsonwebtoken for authentication
        const accesstoken = createAccessToken({id:nuevoUsuario._id});
        const refreshtoken = createRefreshToken({id:nuevoUsuario._id});
        
        res.cookie('refreshtoken',refreshtoken,{
            httpOnly: true,
            path:'/usuario/refresh_token',
            maxAge:7*24*60*60*1000
        })

        res.json({ accesstoken });
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
  },
  login: async (req,res)=>{
        try {
            const {email,password} = req.body;
            const usuario = await Usuario.findOne({email});
            if(!usuario){
                return res.status(400).json({msg:"El usuario no existe."});
            }
            const isMatch = await bcrypt.compare(password,usuario.password);
            if(!isMatch){
                return res.status(400).json({msg:"La contraseña es incorrecta."});
            }
            //if login success, create access token and refresh token
            const accesstoken = createAccessToken({id:usuario._id});
            const refreshtoken = createRefreshToken({id: usuario._id});

            res.cookie("refreshtoken", refreshtoken, {
              httpOnly: true,
              path: "/usuario/refresh_token",
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            
            res.json({accesstoken});

        } catch (err) {
            return res.status(500).json({ msg: error.message });
        }
  },
  logout: async(req,res)=>{
        try {
            res.clearCookie('refreshtoken',{
                path: '/usuario/refresh_token'
            });
            return res.json({msg:"Logged out"});
        } catch (error) {
            return res.status(500).json({msg:err.message});
        }
  },
  refreshToken: (req,res)=>{
      try {
          const rf_token = req.cookies.refreshtoken;
          if (!rf_token) {
              return res.status(400).json({msg: "Favor de ingresar o registrarse"});
          }
          jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
              if(err) return res.status(400).json({ msg: "Favor de ingresar o registrarse" });
              const accesstoken = createAccessToken({id:user.id});
              res.json({accesstoken})
          });
      } catch (error) {
          return res.status(500).json({ msg: error.message });
      }
      
  },
  getUser: async (req, res)=>{
      try {
          const user = await Usuario.findById(req.user.id).select('-password');
          if(!user) return res.status(500).json({msg: "El usuario no existe."});
          res.json(user);
      } catch (err) {
          return res.status(500).json({msg:err.message});
      }
  },
};

const createAccessToken = (user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'});
}

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = usuarioCtrl;