module.exports = exports = {
  config: {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['slothpack_db_spec.js'],
    onPrepare: function() {
      require('babel-core/register');
    }
  }
};
