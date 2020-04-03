const whitelist = [
    'http://localhost:3000',
    /localhost:3000$/,
  ];
  const cors = require('cors')({
    origin: whitelist,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  
  exports = module.exports = cors;