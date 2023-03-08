const create = ({ username, email, password }) => {
  return db.query(
    'insert into usuarios (username, email, password) values (?, ?, ?)',
    [username, email, password]
  );
};

const getByEmail = (email) => {
  return db.query('select * from usuarios where email = ?', [email]);
};

const getById = (usuarioId) => {
  return db.query('select * from usuarios where id = ?', [usuarioId]);
};

module.exports = {
  create,
  getByEmail,
  getById,
};
