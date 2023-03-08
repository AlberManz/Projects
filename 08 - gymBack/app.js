const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dayjs = require('dayjs');
const fs = require('fs');
//! Esto se instala con npm i cors para conectar Express con el framework
const cors = require('cors');

//*  Creación de la app de Express
const app = express();

// Configuración de mi app de Express
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//* Middlewares
app.use((req, res, next) => {
  const currentDate = dayjs().format('DD-MM-YYYY hh:mm:ss A');
  console.log(currentDate);
  next();
});

// Ejercicio: hacer un middleware que obtenga un número aletorio
// Si el número es mayor que 0.6 respondemos a la petición con error
// Si el número es menor de 0.6 respondemos con next

// app.use((req, res, next) => {
//   const num = Math.random()
//   console.log('Random num', num)
//   if (num > 0.6) {
//     return res.send('Número mayor que 0.6')
//   }
//   next()
// })

// TODO -> Ejercicio: middleware que escriba en un fichero datos sobre la petición que entra en nuestro server
app.use((req, res, next) => {
  // Esta es la línea que quiero crear -> [FECHA] Método: GET. Url: /api/clientes
  // Creo una variable para conseguir la fecha (si lo pusiéramos todo en la línea quedaía horrible a la hora de leer)
  const currentDate = dayjs().format('DD-MM-YYYY hh:mm A');
  // Sigo la estructura de la línea que quiero crear
  const line = `[${currentDate}] Método: ${req.method}. Url:${req.url}\n`;

  fs.appendFile('./logs/main.log', line, (err) => {
    if (err) {
      return res.send(err.message);
    }
    next();
  });
});
//! El resultado de esto se ve reflejado dentro de la carpeta logs. El main.log tiene un registro de cada una de las peticiones que se hacen, con la fecha y hora, método y la url a la que se hace

//* Gestión de rutas
app.use('/api', require('./routes/api'));

module.exports = app;
