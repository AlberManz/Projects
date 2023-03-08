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
    // console.log(profesor.nombre, clientes.length) comprobamos que sale el nombre del profesor y al lado el número de clientes que tiene
    //! Al poner profesor.clientes a cada profesor le estoy generando la propiedad clientes y la estoy llenando con el arrClientes que he creado arriba y que tiene los clientes de cada profesor.id (obtenidos en cliente.model.js)
    profesor.clientes = arrClientes
  }
  res.json(profesores)
})

router.get('/nombres', async (req, res) => {
  // const [profesores] = await getNames() hecho con query de MySQL que no me hace falta porque se puede hacer con el getAll()
  const [profesores] = await getAll()
  // const arrNombres = []
  // for (const profesor of profesores) {
  //   arrNombres.push(profesor.nombre)
  // }

  //! Ese bloque se puede cambiar por un map que te permite de un objeto enorme sacar uno de los valores y te lo devuelven en un array
  // const arrNombres = profesores.map((profesor) => {
  //   return profesor.nombre
  // })
  // res.json(arrNombres)

  //! SIMPLIFICADO (p de profesores y se hace directamente en la respuesta)
  res.json(profesores.map(p => p.nombre))
})

router.get('/:profesorId', async (req, res) => {
  const { profesorId } = req.params

  try {
    const [result] = await getById(profesorId)
    //* Para comprobar si piden un id que no existe
    // Result es un ARRAY
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
