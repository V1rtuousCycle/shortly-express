var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend ({
  tableName: 'users',
  hasTimestamps: true,
  // hashPassword: function(model, attrs, options) {
  //  console.log('model.attributes--->', model.attributes);
  // },
  // initialize: function() {this.on('creating', this.hashPassword, this);}
});

module.exports = User