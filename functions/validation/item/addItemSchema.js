const yup = require('yup');
const { ITEM_TYPES } = require('../../utils/constants');
const location = require('../subSchemas/locationSchema');

module.exports = yup.object().shape({
    body: yup.object().shape({
        userId: yup.string().required(),
        categoryId: yup.string().required(),
        type: yup.mixed().oneOf(ITEM_TYPES),
        quantity: yup.number(),
        unit: yup.string(),
        description: yup.string().required(),
        counterValue: yup.string(),
        location,
    })
});