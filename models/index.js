const mongoose = require('mongoose');
module.exports.connect = (uri) => {
  mongoose.connect(uri);
  // plug in the promise library:
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });
//console.error(`Mongoose connection`);
  // load models

require('./roleModel');
require('./userModel');
require('./userRolesModel');
require('./userProfileModel');

};
