const yup = require('yup');
const locationSchema = require('../subSchemas/locationSchema');

module.exports = yup.object().shape({
    body: yup.object().shape({
        location: locationSchema,
        name: yup.string().required(),
        phoneNumber: yup.string(),
        email: yup.string().required()
    })
});