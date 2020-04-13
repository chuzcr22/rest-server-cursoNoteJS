//====================================
//Puerto
process.env.PORT = process.env.PORT || 3000;
//====================================


//====================================
//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
    //====================================


let urlBD;

if (process.env.NODE_ENV === 'dev')
    urlBD = 'mongodb://localhost:27017/cafe'
else
    urlBD = 'mongodb+srv://sa:NrtcSAP2010@cluster0-any3z.mongodb.net/cafe'

process.env.URLDB = urlBD;