const express = require('express');
const { handleErrors, notFound } = require('./../middleware/errorHandlers');

const BeersRouter = require('./beer');
const UsersRouter = require('./user');

const rootRouter = express.Router();

rootRouter.use('/beers', BeersRouter);
rootRouter.use('/users', UsersRouter);
rootRouter.use(notFound);
rootRouter.use(handleErrors);

module.exports = rootRouter;
