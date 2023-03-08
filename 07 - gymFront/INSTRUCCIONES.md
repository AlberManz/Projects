## REGISTRO

- Componente: /components/usuarios/Registro
- URL: localhost:4200/registro

- Dentro del componente:
  - Generamos un formulario con los campos necesarios para el registro de usuarios (hay que mirar qué información necesita el back para registrar un usuario [en el back vemos en peticiones-usuarios que para registro hace falta un username, email y password])

- Servicio de usuarios
  - Necesitamos una función que lance la petición al back que nos permite registrar usuarios

- ¿Qué hacer cuando el usuario se registra correctamente? -> Lo hemos redirigido a login

- Comoponente: components/usuarios/Login
- URL: /login


## NAVBAR

  - Componente navBar: crear una barra de navegación con enlaces a todas las rutas disponibles -> [routerLink]
  - Componente ListaProfesores:
    - Crear el componente y asignarle la ruta /profesores.
    - Crear un servicio Profesores que me permita replicar la petición del back para poder traerme los profesores.