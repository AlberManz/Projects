const router = require('express').Router();
const {
  getAll,
  getById,
  getByAge,
  create,
  update,
  deleteById,
  getByPage,
  count
} = require('../../models/cliente.model');


router.get('/', async (req, res) => {

  //! PAGINACIÓN
  const { limit = 10, page = 1 } = req.query;
  try {
    const [clientes] = await getByPage(page, limit);
    const [num] = await count();

    const total = num[0].count;
    res.json({
      info: {
        current_page: parseInt(page),
        count: total,
        pages: Math.ceil(total / limit)
      },
      results: clientes
    });
  } catch (err) {
    res.json(err.message);
  }
});


router.get('/:clienteId', async (req, res) => {
  const { clienteId } = req.params;
  try {
    const [result] = await getById(clienteId);
    res.json(result[0]);
  } catch (err) {
    res.json(err.message);
  }
});

router.get('/edad/:minEdad', async (req, res) => {
  const { minEdad } = req.params;

  try {
    const result = await getByAge(minEdad);
    res.json(result[0]);
  } catch (err) {
    res.json({ erroraco: err.message });
  }
});

router.post('/', async (req, res) => {
  try {

    const [result] = await create(req.body);

    const [cliente] = await getById(result.insertId);

    res.json(cliente[0]);
  } catch (err) {
    res.json({ erroraco: err.message });
  }
});


router.put('/:clienteId', async (req, res) => {

  const { clienteId } = req.params;

  try {
    const [result] = await update(clienteId, req.body);
    res.json(result);
  } catch (err) {
    res.json({ erroraco: err.message });
  }
});

router.delete('/:clienteId', async (req, res) => {
  const { clienteId } = req.params;

  try {
    const [result] = await deleteById(clienteId);
    res.json(result);
  } catch (err) {
    res.json({ erroraco: err.message });
  }
});

module.exports = router;
