// eslint-disable-next-line
const { STATUS_CODES } = require('../utils/constants');

module.exports = class AlreadyInDatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = STATUS_CODES.STATUS_400;
  }
};