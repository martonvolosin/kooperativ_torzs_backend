const { ENVIRONMENT } = require('../utils/constants');
const ValidationError = require('../errors/ValidationError');
const NotFound = require('../errors/NotFound');
const FirestoreError = require('../errors/FirestoreError');
const AlreadyInDatabaseError = require('../errors/AlreadyInDatabaseError');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.errorHandler = (error, req, res) => {
  // Only return the stack on ServerError 500 or in Test / Emulator Environments
  let stack;
  if (ENVIRONMENT.env !== 'PRODUCTION') stack = error.stack;

  /**
  |--------------------------------------------------
  | VALIDATE THE DIFFERENT ERRORST BELOW
  | if the file gets too big, use more errorHandling middleWares
  |--------------------------------------------------
  */

  // ValidationError & PropertyRequired
  if (error instanceof ValidationError) {
    return res.send({
      status: 400,
      type: 'BadRequest',
      errors: error.errors || [],
      stack,
    });
  }

  // NotFound
  if (error instanceof NotFound) {
    return res.send({
      status: 404,
      type: error.name,
      errors: [error.message],
      stack,
    });
  }

  // FirestoreError
  if (error instanceof FirestoreError) {
    return res.send({
      status: 400,
      type: error.name,
      errors: error.message,
      stack,
    });
  }

  // AlreadyInDatabase
  if (error instanceof AlreadyInDatabaseError) {
    return res.send({
      status: 400,
      type: error.name,
      errors: error.message,
      stack,
    });
  }
  // Unauthorized
  if (error instanceof UnauthorizedError) {
    return res.send({
      status: 401,
      type: error.name,
      errors: [error.message],
      stack,
    });
  }

  // DEFAULTS TO SERVER ERROR
  return res.send({
    status: 500,
    type: 'ServerError',
    errors: error.message,
    stack: error.stack,
  });

  // next(error);
};