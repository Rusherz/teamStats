const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        console.error(err);
        reject();
      }
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        if (err) {
          console.error(err);
          reject();
        }
        newUser.password = hash;
        newUser.save(function(err, user) {
          if (err) {
            console.error(err);
            reject();
          }
          resolve(user);
        });
      });
    });
  });
}
