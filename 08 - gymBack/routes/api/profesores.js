const router = require('express').Router()

const { getByProfesorId } = require('../../models/cliente.model')
const { getAll, getById, create, update, getNames } = require('../../models/profesor.model')


router.get('/', async (req, res) => {
  try {
    const [result] = await getAll()
    res.json(result)
  } catch (err) {
    res.json(err.message)
  }
})

router.get('/clientes', async (req, res) => {
  const [profesores] = await getAll()

  for (const profesor of profesores) {
    const [arrClientes] = await getByProfesorId(profesor.id)

    profesor.clientes = arrClientes
  }
  res.json(profesores)
})

router.get('/nombres', async (req, res) => {

  const [profesores] = await getAll()

  res.json(profesores.map(p => p.nombre))
})

router.get('/:profesorId', async (req, res) => {
  const { profesorId } = req.params

  try {
    const [result] = await getById(profesorId)

    if (result.length === 0) {
      return res.json({ fatal: 'No existe el profesor con ese ID' })
    }
    res.json(result[0])
  } catch (err) {
    res.json(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const [result] = await create(req.body)
    const [profesor] = await getById(result.insertId)
    res.json(profesor[0])
  } catch (err) {
    res.json({ erroraco: err.message })
  }
})

router.put('/:profesorId', async (req, res) => {
  const { profesorId } = req.params

  try {
    const [result] = await update(profesorId, req.body)
    res.json(result)
  } catch (err) {
    res.json({ erroraco: err.message })
  }
})

module.exports = router
