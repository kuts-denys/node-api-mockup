const express = require('express');

const {
  postBeers,
  getBeers,
  getBeer,
  putBeer,
  deleteBeer,
} = require('./../controllers/beer');
const { protectedRoute } = require('./../passport/jwtStrategy');
const { catchErrors } = require('../middleware/errorHandlers');

const BeersRouter = express.Router();

BeersRouter.route('/')
  .post(protectedRoute, catchErrors(postBeers))
  .get(protectedRoute, catchErrors(getBeers));

BeersRouter.route('/:beer_id')
  .get(protectedRoute, catchErrors(getBeer))
  .put(protectedRoute, catchErrors(putBeer))
  .delete(protectedRoute, catchErrors(deleteBeer));

module.exports = BeersRouter;
