const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

//* El método createToken recibe un user, creamos un objeto con los campos que queremos del user y lo codificamos para que se convierta en token y usarlo. Ahora iremos a usuarios para en la respuesta añadir también el token.

const createToken = (user) => {
  const obj = {
    user_id: user.id,
    user_role: user.role,
    exp: dayjs().add(5, 'weeks').unix(),
  };
  //* Aplicamos el método sign que nos marca que tenemos que pasar el objeto y una contraseña (esto nos lo dice en la documentación de la librería)

  return jwt.sign(obj, process.env.SECRET_KEY);
};

module.exports = {
  createToken,
};
