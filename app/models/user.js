var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend ({
  tableName: 'users',
  hasTimestamps: true,
  hashPassword: function(model, attrs, options) {
    console.log('model.attributes--->', model.attributes);
    var plainPW = model.attributes.password;
    console.log(model.attributes.password);
    var promiseCrypt = Promise.promisify(bcrypt.hash);

    return promiseCrypt(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      if (err) {
        callback(err);
      }
      callback(isMatch);
    });
  },
  initialize: function() { this.on('creating', this.hashPassword, this); }
});

module.exports = User;
