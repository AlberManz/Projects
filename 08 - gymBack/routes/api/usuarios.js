const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkToken } = require('../../helpers/middlewares');

const { createToken } = require('../../helpers/utils');
const { create, getByEmail } = require('../../models/usuario.model');

router.get('/profile', checkToken, (req, res) => {
  res.json(req.user);
});

router.post('/registro', async (req, res) => {

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

  if (result.length === 0) {
    return res.json({ erroraco: 'Error en email y/o contraseña' });
  }

  const usuario = result[0];

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
