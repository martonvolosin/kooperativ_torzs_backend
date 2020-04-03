const { ERRORS } = require('../utils/constants');

module.exports = class ValidationError extends Error {
  constructor(init) {
    super(init.message);
    this.name = ERRORS.VALIDATION_ERROR;
    this.errors = init.errors || init.message;
  }
};
