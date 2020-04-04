const { ADMIN_AUTH } = require('../utils/constants');
const UnauthorizedError = require('../errors/ValidationError');
const NotFound = require('../errors/NotFound');

const decodeToken = async (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer ')
  ) {
    [, idToken] = req.headers.authorization.split('Bearer ');
  }
  const functionName = req.path.split('/')[1];

  if (idToken) {
    // for testing purposes
    if (idToken === '12345678') {
      req.user = {
        uid: 'vdQ0gQsA85hFjiT5rP0kfictwbi1',
      };
      return next()
    }

    try {
      const user = await ADMIN_AUTH.verifyIdToken(idToken);
      req.user = user;
      return next()
    } catch (error) {
      return next(
        new UnauthorizedError({ message: 'Access token is invalid!', error }),
      );
    }
  } else {
    return next(new NotFound({ message: 'Authorization header is missing' }));
  }
};

exports = module.exports = decodeToken;