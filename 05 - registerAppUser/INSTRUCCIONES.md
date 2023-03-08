### Register App User

  1. Vamos a crar los componentes que se sitúan en la parte pública.
   
        1. HOME donde se carga cierta información de la página. En este caso un mensaje y dos botones
        2. REGISTER donde cargarems un formulario de tipo model con validaciones.
        3. LOGIN donde cargaremos un formulario de tipo template sin validaciones.

  2. El proceso de login me devolverá un token que me debe dar acceso a una parte privada, cuya ruta es /dashboard. A esa parte no podré acceder sin estar logueado. (GUARDS o cláusulas de guarda).
  3. Pintar dentro de dashboard un componente como ruta hija (dashboard/productos) el listado de productos paginado (con anterior y siguiente), del siguiente servicios (https://peticiones.online/products). **GESIONARLO CON PROMESAS**
