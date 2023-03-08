// Creamos este fichero solo para esta ocasión poder interactuar con la BBDD

const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Roronoa88.',
  port: 3306,
  database: 'gimnasio_iron'
})

connection.connect((err) => {
  console.log(err)
  // connection.query('select * from clientes', (err, result) => {
  //   console.log(err)
  //   console.log(result[0])
  // })

  const clienteId = 31
  // La interrogación de cierre marca que ahí va a ir algo variable (sin importar que sea string, entero...). Después pasamos como segundo parámetro un array (tantos como ? haya) con el campo que quiero recuperar de la BBDD
  connection.query(
    'select * from clientes where id = ?',
    [clienteId],
    (err, result) => {
      console.log(err)
      // El resultado de un select SIEMPRE es un ARRAY
      console.log(result[0].nombre)
      // Con esto se desconecta manualmente
      connection.destroy()
    })
})
