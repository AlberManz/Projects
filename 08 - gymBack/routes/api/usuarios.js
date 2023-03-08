const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkToken } = require('../../helpers/middlewares');

const { createToken } = require('../../helpers/utils');
const { create, getByEmail } = require('../../models/usuario.model');

//* En este caso el checkToken no se hace para la url usuarios (porque al registrarme es cuando genero el token), se aplica el middleware solo a la url que incluye profile
router.get('/profile', checkToken, (req, res) => {
  res.json(req.user);
});

router.post('/registro', async (req, res) => {
  //* Dentro de req.body recibo todos los datos del nuevo usuario
  //* Para encriptar el password instalamos bcryptjs (npm i bcryptjs)
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  try {
    const [result] = await create(req.body);
    res.json(result);
  } catch (err) {
    res.json({ erroraco: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [result] = await getByEmail(email);
  //* Si existe el email result es un array con 1 usuario
  //* Si no existe el email result es un array vacío

  //* Manejo el error en caso de que el mail no exista (da un array vacío result.length = 0)
  if (result.length === 0) {
    return res.json({ erroraco: 'Error en email y/o contraseña' });
  }

  //* Recupero el usuario
  const usuario = result[0];

  //* Comparamos las password
  const iguales = bcrypt.compareSync(password, usuario.password);

  if (!iguales) {
    return res.json({ erroraco: 'Error en email y/o contraseña' });
  }

  res.json({
    success: 'Login correcto',
    token: createToken(usuario),
  });
});

module.exports = router;
