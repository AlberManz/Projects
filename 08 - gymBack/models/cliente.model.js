//* El objetivo de este fichero es crear un directorio de querys para ir usando sobre la tabla clientes

const getAll = () => {
  return db.query('select * from clientes') // Retornamos la promesa directamente para luego ya consumirla. NO hace falta poner then/catch o async/await porque en sí ya se sabe que es una pomesa
}

const getById = (clienteId) => {
  return db.query('select * from clientes where id = ?', [clienteId])
}

const getByAge = (minEdad) => {
  return db.query('select * from clientes where edad > ?', [minEdad])
}

//! PARTE DEL EJERCICIO: Aunque sea de profesores lo que estamos queriendo es recuperar los clientes asociados a un id de profesor
const getByProfesorId = (profesorId) => {
  return db.query('select * from clientes where profesor_id = ?', [profesorId])
}

const getByPage = (page, limit) => {
  page = parseInt(page);
  limit = parseInt(limit);
  return db.query(
    'select * from gimnasio_iron.clientes limit ? offset ? ',
    [limit, (page - 1) * limit]) // En el offset pasamos el cálculo que le corresponde (siempre el mismo)
}

const count = () => {
  return db.query('select count(*) as count from clientes');
}

const create = ({ nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni }) => {
  return db.query(
    'insert into clientes (nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni]
  )
}

const update = (clienteId, { nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni }) => {
  return db.query(
    'update clientes set nombre = ?, apellidos = ?, direccion = ?, email = ?, edad = ?, genero = ?, cuota = ?, fecha_nacimiento = ?, dni = ? where id = ?',
    [nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni, clienteId]
  )
}

const deleteById = (clienteId) => {
  return db.query('delete from clientes where id = ?', [clienteId])
}

module.exports = {
  getAll,
  getById,
  getByAge,
  getByProfesorId,
  getByPage,
  create,
  update,
  deleteById,
  count
}
