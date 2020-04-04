const yup = require('yup');
const locationSchema = require('../subSchemas/locationSchema');

module.exports = yup.object().shape({
    body: yup.object().shape({
        location: locationSchema,
        userId: yup.string().required(),
    })
});