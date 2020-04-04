const yup = require("yup");

module.exports = yup.object().shape({
    body: yup.object.shape({
        userId: yup.string().required()
    }),
});