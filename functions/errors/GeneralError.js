const { ERRORS } = require('../utils/constants');

module.exports = class GeneralError extends Error {
  constructor(message) {
    super(message);
    this.name = ERRORS.GENERAL_ERROR;
  }
};