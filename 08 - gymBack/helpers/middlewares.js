const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const { getById } = require('../models/usuario.model');

const checkToken = async (req, res, next) => {
  //* 1. Comprobar si la petición incluye el token
  if (!req.headers.authorization) {
    return res.json({ erroraco: 'Debes incluir la cabecera de autorización' });
  }

  //* 2. Comprobar si el token es correcto
  const token = req.headers.authorization;

  let obj;
  try {
    //! SECRET_KEY está establecida en el archivo .env
    obj = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.json({ fatal: 'El token es incorrecto' });
  }

  //* 3. Comprobar si el token está caducado (OPCIONAL). Si en el objeto que creamos en el archivo utils ponemos una variable llamada exp, jwt entiende directamente que es la fecha de expiración y ya hace la comprobación de si está caducado el token o no
  // Si la fecha actual (dayjs().unix()) es mayor que la expiración que viene dentro del objeto (obj.exp)
  if (dayjs().unix() > obj.exp) {
    return res.json({ fatal: 'El token está caducado' });
  }

  // TODO: Rescatar al usuario
  //* El obj obtenido a través del token tiene las claves: user_id, user_role, exp y iat (la crea automáticamente el método sign que ejecutamos a jwt en utils. Es la fecha de creación del token)
  const [result] = await getById(obj.user_id);
  //* Dentro de la req (petición) estoy creando una propiedad user y la estoy llenando con el result en la posición 0 (que como solo hay una posición pues me devuelve el usuario)
  //* De esta forma cada vez que la req pase a través del middleware nos devolverá un req.user y podremos acceder a la información del usuario
  req.user = result[0];
  next();
};

const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.json({ Erroraco: 'Zona solo para administradores' });
  }
  next();
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.send({ erroraco: `Zona solo para usuarios ${role}` });
    }
    next();
  };
};

module.exports = {
  checkToken,
  checkAdmin,
  checkRole,
};
