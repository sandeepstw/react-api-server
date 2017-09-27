"use strict"
var mongoose = require('mongoose');

var userroleSchema = new mongoose.Schema({
  userId:Object,
  roleId:Object
});

module.exports = mongoose.model('UserRole', userroleSchema);
