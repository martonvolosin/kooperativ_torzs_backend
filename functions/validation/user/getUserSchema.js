const yup = require("yup");

module.exports = yup.object().shape({
    query: yup.object().shape({
        userId: yup.string().required()
    }),
});