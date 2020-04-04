const yup = require("yup");

module.exports = yup.object().shape({
    lat: yup.number().required(),
    lon: yup.number().required(),
})