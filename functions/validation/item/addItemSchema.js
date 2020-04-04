const yup = require('yup');
const { ITEM_TYPES } = require('../../utils/constants');
const location = require('../subSchemas/locationSchema');

// should add userId in the function
module.exports = yup.object().shape({
    body: yup.object().shape({
        categoryId: yup.string().required(),
        type: yup.mixed().oneOf(Object.values(ITEM_TYPES)),
        quantity: yup.number(),
        unit: yup.string(),
        description: yup.string().required(),
        counterValue: yup.string(),
        location,
    })
});
