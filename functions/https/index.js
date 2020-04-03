const express = require('express');
const glob = require('glob');
const bodyParser = require('body-parser');
const { errorHandler } = require('../middlewares/errorHandler');
const { getRouteFromFileName } = require('../utils/getRouteFromFileName');
const { ENVIRONMENT } = require('../utils/constants');
const cors = require('../middlewares/cors');
const decodeToken = require('../middlewares/decodeToken');
const validator = require('../middlewares/validator');

// Apply Middlewares
const app = express();
app.use(cors);
app.use(decodeToken);
app.use(bodyParser.json());
app.use(validator);

console.log(
  '\n\n\nDeploying app to:     http://localhost:5000/kooperativ-torzs/us-central1/api',
  '\n\nThe available routes are: ',
);

const files = glob.sync('./**/*.f.js', { cwd: __dirname });
files.forEach((file) => {
  // eslint-disable-next-line
  const func = require(file);
  const functionName = getRouteFromFileName(file);
  const method = func.method || 'post';
  console.log('- ', functionName, `(${method.toUpperCase()})`);

  // Create routes based on the functionname
  // eslint-disable-next-line
  app[method](`/${functionName}`, (req, res, next) => {
    // this wrapper makes sure that every functions .catch calls the next() so the error
    // would be forwarded to the errorHandling middlewares
    try {
      console.log('Function execution started: ', functionName);
      func(req, res, next);
    } catch (error) {
      return next(error);
    }
  });
});

// Environmental warning (just to make sure that it is not run in prod accidentally)
console.log('\n\n\n');
if (ENVIRONMENT.env === 'PRODUCTION') {
  console.log('\x1b[31m', '############################################');
  console.log('\x1b[31m', '# YOU ARE RUNNING A PRODUCTION ENVIRONMENT #');
  console.log('\x1b[31m', '#       IS THIS REALLY WHAT YOU WANT?      #');
  console.log('\x1b[31m', '############################################');
  console.log('\x1b[0m', '\n\n');
} else {
  console.log('\x1b[33m%s\x1b[0m', '###################################');
  console.log(
    '\x1b[33m%s\x1b[0m',
    `# Running in ${ENVIRONMENT.env} environment #`,
  );
  console.log('\x1b[33m%s\x1b[0m', '###################################');
  console.log('\x1b[0m', '\n\n');
}

// Error handling middlewares
app.use(errorHandler);

// eslint-disable-next-line
exports = module.exports = app;