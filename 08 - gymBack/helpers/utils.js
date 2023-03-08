//! Lo creamos en la carpeta helpers (que es como el cajón desastre, donde se mete lo que no sabes dónde meter) para crear el token
const dayjs = require('dayjs');
//* Hay que instalar jsonwebtoken para generar tokens (npm i jsonwebtoken). Vale tanto para codificar como para descodificar
const jwt = require('jsonwebtoken');

//* El método createToken recibe un user, creamos un objeto con los campos que queremos del user y lo codificamos para que se convierta en token y usarlo. Ahora iremos a usuarios para en la respuesta añadir también el token.
//! !!! NO METER INFORMACIÓN SENSIBLE !!!
const createToken = (user) => {
  const obj = {
    user_id: user.id,
    user_role: user.role,
    exp: dayjs().add(5, 'weeks').unix(),
  };
  //* Aplicamos el método sign que nos marca que tenemos que pasar el objeto y una contraseña (esto nos lo dice en la documentación de la librería)
  //* Como la vamos a usar más veces la SECRET_KEY la meto en el archivo de .env que además queda más guay. Es una llave de codificación, no tiene que ser una password al uso
  return jwt.sign(obj, process.env.SECRET_KEY);
};

module.exports = {
  createToken,
};
