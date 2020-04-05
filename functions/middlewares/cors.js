const whitelist = [
    'http://localhost:3000',
    /localhost:3000$/,
    'kooperativ-torzs.web.app',
    /kooperativ-torzs.web.app$/
  ];
  const cors = require('cors')({
    origin: whitelist,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  
  exports = module.exports = cors;