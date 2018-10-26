const catchErrors = (fn) => function (req, res, next) {
  return fn(req, res, next).catch(next);
};

const notFound = (req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
};

const handleErrors = (err, req, res, next) => {
  const stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: stack,
  };
  console.log('error', stack);
  res.status(err.status || 500);
  res.json(errorDetails);
};

module.exports = {
  catchErrors,
  notFound,
  handleErrors,
};
