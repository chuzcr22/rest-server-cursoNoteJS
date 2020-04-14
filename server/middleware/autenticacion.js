const jwt = require('jsonwebtoken');
//========================
//VERIFICAR TOKEN
// EL PARAMETRO DE NEXT, DEBE SER LLAMADO PARA QUE LA FUNCION DONDE SE LLAME ESTE MIDDLEWARE PUEDA CONTINUAR
// DE LO CONTRARIO UNICAMENTE SE EJECUTARIA EL CODIGO DE ESTE MIDDLEWARE Y NO DE LA FUNCION DONDE SE LLAME
//========================

let verificaToken = (req, res, next) => {
    let token = req.get('token'); //aqui traemos la información del header que traemos del llamado al API, en este caso el header "token"

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no válidao"
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

//===============================================
//VERIFICA ROL DE ADMINISTRADOR PARA LOS USUARIOS
//===============================================

let verificaAdminRol = (req, res, next) => {
    //esto realmente lee la respuesta que nos dio el de valida token
    //ya que el return del valida toquen es: req.usuario = decoded.usuario;
    let usuario = req.usuario;

    console.log(usuario.role);
    if (!(usuario.role === 'ADMIN_ROLE')) {
        return res.json({
            ok: false,
            err: {
                message: "El usuario no es administrador."
            }
        });
    } else {
        next();
    }

};

module.exports = {
    verificaToken,
    verificaAdminRol
};