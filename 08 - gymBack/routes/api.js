const router = require('express').Router();

const { checkToken, checkAdmin, checkRole } = require('../helpers/middlewares');

router.use(
  '/clientes',
  checkToken,
  checkRole('regular'),
  require('./api/clientes')
);

router.use('/profesores', checkToken, checkAdmin, require('./api/profesores'));

router.use('/usuarios', require('./api/usuarios'));

module.exports = router;
