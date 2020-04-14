const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
require('./config/config');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//traemos las rutas del controlador index dentro de routes
app.use(require('./routes/index'));


/*conexion a la base de dato, el primer paramtro "process.env.URLDB = urlBD" lo hemos definido
  en el archivo config.js, este parametro indica el entorno en el cual estamos trabajando*/
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw new Error;

        console.log("Base de datos ONLINE");
    });



app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
})