## API Clientes

- GET /api/clientes
  - Recupera un array con todos los clientes de la BBDD.

- GET /api/clientes/IDCLIENTE
  - Recupera **UN ÚNICO** cliente a partir de su ID.

- GET /api/clientes/MINEDAD
  - Recupera todos los clientes cuya edad sea mayor que la especificada en la URL.

- POST /api/clientes
  - Inserta un nuevo cliente.
  - En el body de la petición debemos pasar un objeto con las claves: nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni.

- PUT /api/clientes/IDCLIENTE
  - Actualiza el cliente especificado en la URL.
  - En el body de la petición debemos pasar un objeto con las claves: nombre, apellidos, direccion, email, edad, genero, cuota, fecha_nacimiento, dni.

- DELETE /api/clientes/IDCLIENTE
  - Borra el cliente especificado en la URL.

## API Profesores

- GET /api/profesores
  - Recupera un array con todos los profesores de la BBDD.

- GET /api/profesores/IDPROFESOR
  - Recupera **UN ÚNICO** profesor a partir de su ID. Si no existe el ID devuelve un error.

- POST /api/profesores
  - Insertar un profesor en la BBDD
    1. Que la URL funcione.
    2. Determinar en el fichero .rest qué body vamos a mandar.
    3. Dentro del modelo de profesores crear el método que realice el insert.
        - ¿Cuántos parámetros le pasamos?
    4. Ejecutar dicho método -> Recuperar los datos de la promesa y responder con el nuevo profesor.
    5. Gestión de errores.
  - En el body de la perición debemos pasar un objeto con las claves: nombre, experiencia.

- PUT /api/profesores/IDPROFESOR
  - Actualizar un profesor de la BBDD
    1. Que funcione la URL!
    2. ¿Cómo lanzamos la petición? -> Vemos el body que nos devuelve el GET y lo establecemos en .rest.
    3. Método de actualización en el modelo de profesores (Número de parámetros).
    4. Ejecución del método y la respuesta.
  - En el body de la perición debemos pasar un objeto con las claves: nombre, experiencia.

