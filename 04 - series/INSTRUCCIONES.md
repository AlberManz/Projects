### APP Series

    1. Instalar Bootstrap y modificar el angular.json
   
    2. Componentes. ¿Cuántos? Hay 8:

        - Header
        - ItemList
        - Card
        - CharacterView
        - SerieView
            - Casting
            - Seasons
        - Filters
  
    3. Interfaces. ¿Cuántos y cuáles?

        - Serie
        - Character

    4. Servicios.

        - Series
        - Characters

    5. Enlazar servicios con interfaces y data bases. (Hacer el método getAll() y getById())
   
    6. Rutas. ¿Cuántas? Formación de cada ruta. ¿Tenemos rutas dinámicas o activas? ¿Rutas hijas? La ruta inicial tiene que ser el listado de series.

    7. Cargar en la ruta series el listado de series correspondiente con la maquetación que queramos.
   
    8. Usar el componente card para cargar la imagen y el título de la serie.
   
    9. Cuando hagamos click en la serie iremos a SerieView y cargaremos toda la información de la serie.
   
    10. Dentro de serieView cargaremos dos componentes: casting y seasons. En el componente casting pintaremos por consola el listado de personajes de cada serie.
   
    11. Reutilizar el cardComponent para que permita visualizar también personajes.
   
    12.  Averiguar cómo detectar en qué ruta estática estoy y pintamos las listas de personajes y series.
   
    13.  Pintar un personaje en characterView, toda la info del actor/actriz y un botón de ir a su serie y un botón de volver a personajes.
   
    14.  En el componente seasons cargar todas las temporadas que tiene cada serie.
   
    15.  Maquetar el header.
   
    16.  Filtros tendrá dos botones que me permitan cargar series y personajes.
   
    17.  Ocultar la barra lateral en el componente siempre que estemos en la ruta de las vistas de personaje y serie.
     
    18.  Filtro por plataforma, un selector que nos filtre solo las series por canal. En el listado de personajes no se tiene que ver dicho filtro.
   
    19.  Ese filtro se llena con todos los canales del array de series. ***OJO*** que vienen canales repetidos.
   
    20.  Crear el filtro de búsqueda por canal, usando la ruta url como cargador de la búsqueda, ya que los componentes no están enlazados entre sí.
   
    21.  Sanitizar la url del filtro para que no aparezcan caracteres extraños.