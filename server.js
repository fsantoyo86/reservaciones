require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());


//Routes fro users and upload

app.use('/usuario',require('./routes/usuariosRouter'));
app.use('/api',require('./routes/ciudadesRouter'));
app.use('/api',require('./routes/reservacionesRouter'));

//Connecto to mongodb database

const URI = process.env.MONGODB_URL;

mongoose.connect(URI,{
    useCreateIndex: true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}, err=>{
    if(err) throw err;
    console.log('Conexión a MongoDB establecida.');
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Servidor en http://localhost:${PORT}`);
});
