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

//* OPCIÓN 1: Promesa con then catch
// Si queremos crear un paginado, un límite de lo que se va a recuperar -> api/clientes?page=4&limit=10
router.get('/then-catch', (req, res) => {
  // Hacemos destructuring. Para que no sea undefined (en caso de que el usuario no lo pase) le ponemos unos valores por defecto
  // const { page = 1, limit = 10 } = req.query
  // console.log('page:', page, 'limit:', limit)
  db.query('select * from clientes') //! La ejecución de un select siempre devuelve un array con result y fields
    .then(([result, fields]) => {
      // [result] estamos desestructurando el array directamente y accediendo a la posición 0, porque no hemos indicado nada más. En el res ponemos "result" que es cómo estamos llamando a lo que extraemos del array. Fields es por si queremos acceder a los campos (columnas) de los datos dentro de la BBDD
      // result es un array con dos posiciones
      // la posición 0 son los datos recuperados
      // la posición 1 es el nombre de los campos recuperados (nombre, apellidos, dirección...)
      // console.log(result[0][0].nombre) De esta forma accedemos al nombre del primer cliente. Primero tenemos que acceder a la primera posición del primer array que es donde están los datos. Dentro de ese array hay otro array así que accedemos a la primera posición (primer cliente) y a su nombre
      console.log(fields.map((f) => f.name));
      res.json(result);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

//* OPCIÓN 2: Promesa con async await
router.get('/async-await', async (req, res) => {
  try {
    const [result] = await db.query('select * from clientes');
    res.json(result);
  } catch (err) {
    res.json(err.message);
  }
});

//* OPCIÓN 3: LA MEJOR
// Creamos la carpeta models y el archivo cliente.model.js
router.get('/', async (req, res) => {

  // console.log(req.user);
  //! PAGINACIÓN
  const { limit = 10, page = 1 } = req.query; // limit y page dentro de req.query son STRINGS en el model lo hemos transformado a número con parseInt en getByPage()
  // console.log(req.query) // Comprobamos que limit y page son strings
  try {
    const [clientes] = await getByPage(page, limit); // Estamos extrayendo los clientes paginados de getByPage()
    const [num] = await count();
    // console.log(num) -> es esto lo que da por consola //! [ { count: 94 } ]
    // vemos que el num que nos devuelve la query con el select es un array con un objeto dentro
    const total = num[0].count; // Sabiendo qué nos devuelve num [ { count: 94 } ] accedemos a la primera posición del array [0] y al objeto count

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

  //! Para el GetAll normal
  // try {
  //   const [result] = await getAll(); // Estamos extrayendo el result del getAll
  //   res.json(result);
  // } catch (err) {
  //   res.json(err.message);
  // }
});

//! Importante que /:clienteid sea igual que el nombre que le ponemos a la variable en el destructuring
router.get('/:clienteId', async (req, res) => {
  // SELECT * FROM clientes WHERE id = XXXX;
  const { clienteId } = req.params;
  try {
    const [result] = await getById(clienteId);
    res.json(result[0]); // Para que mande directamente la información del cliente en un objeto y no dentro de un array
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
    // Insertamos el cliente en la BBDD
    const [result] = await create(req.body);
    // Recupero de la BBDD el nuevo cliente creado (en la respuesta de result hay un campo que es insertId que es el ID asignado al cliente creado. Para que la respuesta que nos da sea la info del cliente que hemos introducido, usamos el getById y le pasamos el result.insertId para que nos dé la info de ese ID)
    const [cliente] = await getById(result.insertId);
    // Nos devuelve un array así que queremos lo que está en la posición 0 que es el objeto con la info
    res.json(cliente[0]);
  } catch (err) {
    res.json({ erroraco: err.message });
  }
});

// Hacemos una ruta dinámica añdiendo los ":" y luego un nombre que queramos
router.put('/:clienteId', async (req, res) => {
  // Destructuring: del objeto que es req.params.clienteId. Queremos extraer el clienteId, por eso lo metemos entre llaves y lo ponemos a la izquierda. De ese modo extraemos el clienteId y además lo llamamos de la misma forma
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
