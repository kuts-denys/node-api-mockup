// Get the packages we need
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
require('dotenv').config();
const session = require('express-session');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const router = require('./src/routes');

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true },
);
mongoose.connection.on('error', (err) => {
  console.error(`erererer: => ${err.message}`);
});

const app = express();
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());

const port = process.env.PORT || 3000;

const swaggerDocument = require('./public/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', router);

app.listen(port);
console.log(`Listening on port ${port}`);
