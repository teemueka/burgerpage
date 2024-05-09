const {exec} = require('child_process');

module.exports = async () => {
  // Start the server before all tests
  global.server = exec('npm run server');
};
