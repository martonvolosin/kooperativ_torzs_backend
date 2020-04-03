const validation = require('../validation');
const ValidationError = require('../errors/ValidationError');

const validator = async (req, res, next) => {
  const path = req.url.slice(1).split('?')[0];

  try {
    await validation[path].validate(req, { abortEarly: false, strict: true });
    return next();
  } catch (err) {
    return next(new ValidationError({ errors: err.errors, message: err }));
  }
};

module.exports = validator;