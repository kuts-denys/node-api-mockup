const express = require('express');

const { postUser, getUsers, loginUser, logoutUser, forgotPassword } = require('./../controllers/user');
const { protectedRoute } = require('./../passport/jwtStrategy');
const { catchErrors } = require('../middleware/errorHandlers');

const UsersRouter = express.Router();

UsersRouter.route('/')
  .get(protectedRoute, catchErrors(getUsers))
  .post(catchErrors(postUser));

UsersRouter.route('/login').post(catchErrors(loginUser));

UsersRouter.route('/logout').post(protectedRoute, catchErrors(logoutUser));

UsersRouter.route('/account/forgot').post(catchErrors(forgotPassword));

module.exports = UsersRouter;
