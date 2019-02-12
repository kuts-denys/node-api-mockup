const BeerModel = require('../models/beer');

const postBeers = async (req, res) => {
  const { name, type, quantity } = req.body;
  const userId = req.user._id;
  const beer = { name, type, quantity, ownerId: userId };
  const createdBeer = await new BeerModel(beer).save();
  res.json({ message: 'BeerModel added to the locker!', data: createdBeer });
};

const getBeers = async (req, res) => {
  const beers = await BeerModel.find({ ownerId: req.user._id });
  res.json(beers);
};

const getBeer = async (req, res) => {
  const beer = await BeerModel.findOne({
    ownerId: req.user._id,
    _id: req.params.beer_id,
  });
  if (!beer) {
    res.status(404).json({ message: "Beer with such id doesn't exist" });
  } else {
    res.json(beer);
  }
};

const putBeer = async (req, res) => {
  const beer = await BeerModel.findByIdAndUpdate(
    { ownerId: req.user._id, _id: req.params.beer_id },
    { quantity: req.body.quantity },
    { new: true },
  );
  if (!beer) {
    res.status(404).json({ message: "Beer with such id doesn't exist" });
  } else {
    res.json({ message: 'Beer successfully updated', data: beer });
  }
};

const deleteBeer = async (req, res) => {
  const removedBeer = await BeerModel.remove({
    ownerId: req.user._id,
    _id: req.params.beer_id,
  });
  if (!removedBeer.n) {
    res.status(404).json({ message: "Beer with such id doesn't exist" });
  } else {
    res.json({ message: 'Beer has been removed successfully.' });
  }
};

module.exports = {
  postBeers,
  getBeers,
  getBeer,
  putBeer,
  deleteBeer,
};
