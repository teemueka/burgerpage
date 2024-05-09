module.exports = async () => {
  // Stop the server after all tests
  global.server.kill();
};
