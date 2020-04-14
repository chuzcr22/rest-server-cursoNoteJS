//====================================
//Puerto
process.env.PORT = process.env.PORT || 3000;
//====================================


//====================================
//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//====================================


//VENCIMIENTO DEL TOKEN==================
// 60 segundos
// 60 Minitos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//=======================================

//seed de autenticación
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';
//=======================================
let urlBD;

if (process.env.NODE_ENV === 'dev')
    urlBD = 'mongodb://localhost:27017/cafe'
else
    urlBD = process.env.MONGO_URI;

process.env.URLDB = urlBD;