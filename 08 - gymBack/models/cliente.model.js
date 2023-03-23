const getAll = () => {
  return db.query('select * from clientes')
}

const getById = (clienteId) => {
  return db.query('select * from clientes where id = ?', [clienteId])
}

const getByAge = (minEdad) => {
  return db.query('select * from clientes where edad > ?', [minEdad])
}

const getByProfesorId = (profesorId) => {
  return db.query('select * from clientes where profesor_id = ?', [profesorId])
}

const getByPage = (page, limit) => {
  page = parseInt(page);
  limit = parseInt(limit);
  return db.query(
    'select * from gimnasio_iron.clientes limit ? offset ? ',
    [limit, (page - 1) * limit])
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
