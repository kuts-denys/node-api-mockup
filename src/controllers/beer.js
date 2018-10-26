const BeerModel = require('../models/beer');

const postBeers = async (req, res) => {
  const { name, type, quantity } = req.body;
  const userId = req.user._id;
  const beer = { name, type, quantity, userId };
  const createdBeer = await new BeerModel(beer).save();
  res.json({ message: 'BeerModel added to the locker!', data: createdBeer });
};

const getBeers = async (req, res) => {
  const beers = await BeerModel.find({ ownerId: req.user._id });
  res.json(beers);
};

const getBeer = async (req, res) => {
  const beer = await BeerModel.find({
    ownerId: req.user._id,
    _id: req.params.beer_id,
  });
  res.json(beer);
};

const putBeer = async (req, res) => {
  const beer = await BeerModel.update(
    { ownerId: req.user._id, _id: req.params.beer_id },
    { quantity: req.body.quantity },
  );
  res.json({ message: `${beer.n} updated` });
};

const deleteBeer = async (req, res) => {
  await BeerModel.remove({ ownerId: req.user._id, _id: req.params.beer_id });
  res.json({ message: 'BeerModel has been removes successfully.' });
};

module.exports = {
  postBeers,
  getBeers,
  getBeer,
  putBeer,
  deleteBeer,
};
