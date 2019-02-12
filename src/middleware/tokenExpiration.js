const redisController = require('./../redis');

module.exports = (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    next();
  } else {
    redisController.getClient().get(token.split(' ')[1], (err, blacklisted) => {
      if (err) {
        next(err);
      } else if (blacklisted) {
        res.status(400).json({ message: 'Token has expired' });
      } else {
        next();
      }
    });
  }
};
