const express = require('express');
const app = express();
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const port = 3001;

const indexRouter = require('./routes/index');


dotenv.config();

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);

// Manejo de errores 404 y envío al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Establecer variables locales, proporcionando solo el mensaje de error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

module.exports = app;
