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

//====================================
//Google clientID
process.env.CLIENT_ID = process.env.CLIENT_ID || '443821737879-9p0musqir4tp812lf5uo5of1dba1p79a.apps.googleusercontent.com';
//====================================