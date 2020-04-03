/** EXPORT ALL FUNCTIONS
 *
 *   Loads all `.f.js` files
 *   Exports a cloud function matching the file name
 *
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 */
const glob = require('glob');
const functions = require('firebase-functions');
const https = require('./https');
const { getRouteFromFileName } = require('./utils/getRouteFromFileName');

// Import auth and db functions
const files = glob.sync('./**/*.f.js', {
  cwd: __dirname,
  ignore: ['./node_modules/**', './https/**'], // Had to ignore https to use express.
});

for (let f = 0, fl = files.length; f < fl; f++) {
  const file = files[f];
  const functionName = getRouteFromFileName(file);

  if (
    !process.env.FUNCTION_NAME
    || process.env.FUNCTION_NAME === functionName
  ) {
    // eslint-disable-next-line
    exports[functionName] = require(file);
  }
}

const firebasePathPatch = (app) => (req, res) => {
  // patch from https://github.com/firebase/firebase-functions/issues/27#issuecomment-292768599
  // https://some-firebase-app-id.cloudfunctions.net/route
  // without trailing "/" will have req.path = null, req.url = null
  // which won't match to your app.get('/', ...) route
  if (!req.path) {
    // prepending "/" keeps query params, path params intact
    req.url = `/${req.url}`;
  }
  return app(req, res);
};

// Add http functions
exports.api = functions.https.onRequest(firebasePathPatch(https));