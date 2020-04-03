const { ERRORS } = require('../utils/constants');

module.exports = class NotFound extends Error {
  constructor(property) {
    super(ERRORS.NOT_FOUND_ERROR + property);
    this.name = ERRORS.NOT_FOUND_ERROR;
    this.property = property;
  }
};
