"use strict"
var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
  name:String
  });

module.exports = mongoose.model('Role', roleSchema);
