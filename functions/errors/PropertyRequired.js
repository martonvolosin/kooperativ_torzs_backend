const ValidationError = require('./ValidationError');
const { ERRORS } = require('../utils/constants');

module.exports = class PropertyRequired extends ValidationError {
  constructor(property) {
    super(ERRORS.NO_PROPERTY_ERROR + property);
    this.name = ERRORS.PROPERTY_REQUIRED_ERROR;
    this.property = property;
  }
};