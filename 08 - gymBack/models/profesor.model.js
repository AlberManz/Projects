const getAll = () => {
  return db.query('select * from profesores');
};

const getById = (profesorId) => {
  return db.query('select * from profesores where id = ?', [profesorId]);
};

const getNames = () => {
  return db.query('select nombre from profesores');
};

const create = ({ nombre, experiencia }) => {
  return db.query(
    'insert into profesores (nombre, experiencia) values (?, ?)',
    [nombre, experiencia]
  );
};

const update = (profesorId, { nombre, experiencia }) => {
  return db.query(
    'update profesores set nombre = ?, experiencia = ? where id = ?',
    [nombre, experiencia, profesorId]
  );
};

module.exports = {
  getAll,
  getById,
  getNames,
  create,
  update,
};
