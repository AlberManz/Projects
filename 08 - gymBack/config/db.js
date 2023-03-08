// Se instala mysql2 (npm install mysql2)
//! Una vez que la tenemos, la requerimos en el fichero www para que se inicialice nada más creamos la app

const mysql = require('mysql2');

// Para comprobar que se conecta bien console.log('Config DB')
// TODO: Coger datos del fichero de entorno. LO PRIMERO QUE DEBERÍA DE HACER AL INICIAR EL PROYECTO
//* 1. Instalar DotEnv (npm i dotenv)
//* 2. Crear un archivo .env con la estructura de datos que puedo ver el archivo
//* 3. Una vez relleno, en el archivo www se configura justo después de los require
// createPool ya crea la conexión y la cierra automáticamente
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Con esto logramos que de manera global en la app cada vez que accedamos a la propiedad DB obtendremos pool (que es el gestor de base de datos declarada arriba). Promise() establece que lo que nos va a devolver son promesas
global.db = pool.promise();
