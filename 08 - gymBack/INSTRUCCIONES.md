## Profesores

- Las dos URLs tienen que funcionar (No tienen que devolver 404)
- Dentro del fichero api.js hay que hacer el enlace con el fichero profesores.js de la carpeta routes
- Todas las queries sobre la tabla profesores irán sobre el fichero profesor.model.js

### GET /api/profesores

  - Recupera todos los profesores de la BBDD (función getAll)

### GET api/profesores/IDPROFESORES

  - Recupera un único profesor de la BBDD (función getById)
  - ¿Qué pasa si el ID no existe?
    - ¿Qué podremos hacer para resolverlo?

### GET api/clientes/edad/45

  - Recupera todos los clientes cuya edad es mayor que el valor recibido a través de la URL
    1. Que la URL funcione
    2. Recuperar el valor de la edad
    3. ¿Qué query lanzamos?
    4. Dentro del modelo(model) generamos el método que lanza la query
    5. Ejecutamos el método dentro del manejador(controller) de la ruta

### GET /api/profesores/clientes

  - OBJETIVO: Recuperar toda la lista de profesores con sus clientes asociados.

  ```json
  [
    {
      "nombre": "Profesor 1",
      "experiencia": 20,
      "clientes": {
        { "nombre": "Fulanito", ... }
        { "nombre": "Menganito", ... }
      }
    }
    ...
  ]
  ```

  1. Que la URL funcione.✅
  2. ¿Puedo rescatar todos esos datos con esa estructura directamente con una query SQL? -> Probar en el Workbench
  3. Ejecutar la query o queries
  4. Retornar la respuesta
      - Puede ser que la respuesta no venga directamente de la BBDD.
      - Puede ser que haya que lanzar varias queries.
      - Puede ser que tenga que tratar a los profesores de manera individual.


### GET /api/profesores/nombres

  - OBJETIVO: Recuperar únicamente los nombres de los profesores

```json
[
  "José",
  "Glenna Shepherd",
  "Tamara Salomon",
  ...
]
```

  1. ¿Qué opción es la más cómoda?
      - Hacerlo desde la BBDD.
      - Hacerlo desde JS. 