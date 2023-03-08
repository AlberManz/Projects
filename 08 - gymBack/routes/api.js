const router = require('express').Router();

const { checkToken, checkAdmin, checkRole } = require('../helpers/middlewares');

router.use(
  '/clientes',
  checkToken,
  checkRole('regular'),
  require('./api/clientes')
);

router.use('/profesores', checkToken, checkAdmin, require('./api/profesores')); // El checkAdmin marca que a profesores solo pueden acceder los que tengan el rol de admin

router.use('/usuarios', require('./api/usuarios'));

module.exports = router;
