const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/usuario', function(req, res) {
    /*La funcion find de mongoose, se utiliza para buscar en BD es como un select de SQL
      se pueden agregar varios parametros, al final para enviar a ejecutar se hace con .exec()
      que es un callback que recibe un err y el obj a devolver
      .skip funciona para saltar registros osea paginar*/

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    /* despues del primer parametro "{}" podemos enviar los campos que queremos recibir
       como un select de SQL
       en el parametro {} enviamos las condiciones por asi decirlo el where en sql*/
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            /*se ejemplifica el uso de la funcion count, sirve para devolver o saber cuantos registros me 
              esta retornando mi consulta a BD, puede contar de forma general enviando el primer parametro vacio {}
              o bien especificanto condiciones*/
            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo

                })
            })
        })


})

app.post('/usuario', function(req, res) {

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //grabamos en BD
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }

        usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB

        })
    });


})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    /*La funcion pick de require('underscore') unicamente me devuelve las propiedades que deseo envia a actualizar
     */
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    //esta es una funcion de Mongoose
    //va a BD busca el rgistro si lo encuentra lo actualiza
    //el parmetro {new:true} es opcional y funcional para que Mongoose nos devuelva el obj ya modificado de BD
    /*el parametro runValidators se usa para que cuando se actualice haga las validaciones del schema*/

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBD
        })
    });
})

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;
    /*con el siguiente codigo se elimina un registro de base datos*/
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            res.status(400).json({
                ok: false,
                err: { message: `No se encontro ningun usuario con el id ${id} para ser eliminado.` }
            });
        }

        res.json({
            ok: true,
            usuarioBorrado
        });
    });
});


app.delete('/usuarioDeleteLogico/:id', function(req, res) {

    let id = req.params.id;
    /*declaro un obj con las propiedades que quiero enviar a modificar a BD
      en este caso solo es el estado*/
    let borradoLogico = {
            estado: false
        }
        /*con el siguiente codigo se elimina un registro de base datos*/
    Usuario.findByIdAndUpdate(id, borradoLogico, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            res.status(400).json({
                ok: false,
                err: { message: `No se encontro ningun usuario con el id ${id} para ser eliminado.` }
            });
        }

        res.json({
            ok: true,
            usuarioBorrado
        });
    });
});



module.exports = app;