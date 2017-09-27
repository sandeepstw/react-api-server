const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new mongoose.Schema({
  email:String,
//  email: { type: String, unique: true, lowercase: true },
  password: String
});
// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function saveHook(next) {
  // get access to the user model
  const user = this;
  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;

      next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}
// Export the model
module.exports = mongoose.model('User', userSchema);
