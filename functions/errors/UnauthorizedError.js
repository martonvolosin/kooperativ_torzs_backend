const { STATUS_CODES } = require('../utils/constants');

module.exports = class UnauthorizedError extends Error {
  constructor(property) {
    super(STATUS_CODES.STATUS_401);
    this.name = STATUS_CODES.STATUS_401;
    this.property = property;
  }
};
