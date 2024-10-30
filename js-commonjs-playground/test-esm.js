// If we try to run synchronous require(esm) it will fail for all Node versions <v23.
//
// /Users/luska/poc/npm/yellowcab/js-commonjs-playground/test-esm.js:1
// const { is_black, is_red } = require('@yellowcab/js-esm-lib');
//                              ^
//
// Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/luska/poc/npm/yellowcab/js-esm-lib/index.js from /Users/luska/poc/npm/yellowcab/js-commonjs-playground/test-esm.js not supported.
// Instead change the require of index.js in /Users/luska/poc/npm/yellowcab/js-commonjs-playground/test-esm.js to a dynamic import() which is available in all CommonJS modules.
//     at Object.<anonymous> (/Users/luska/poc/npm/yellowcab/js-commonjs-playground/test-esm.js:1:30) {
//   code: 'ERR_REQUIRE_ESM'
// }
//
// As stated in the error, we may use dynamic import scheme: we asynchronously load ESM module and then use
// module presentation object to run dependency methods.

if (false) {
  const { is_black, is_red } = require('@yellowcab/js-esm-lib');

  console.log(is_black('banana'));
  console.log(is_black('black'));
  console.log(is_red('red'));
}
else {
  const module = import('@yellowcab/js-esm-lib');

  module.then(
    (m) => {
      console.log(m.is_black('banana'));
      console.log(m.is_black('black'));
      console.log(m.is_red('red'));
    },
    (err) => {
      console.log('Failed to import @yellowcab/js-esm-lib module', err);
    }
  );
}
