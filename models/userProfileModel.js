"use strict"
var mongoose = require('mongoose');

var userProfileSchema = mongoose.Schema({
  userId:Object,
  Description:String,
  Name:String,
  Phone: String,

  });

userProfileSchema.index(
  {"$**": "text"},
);

module.exports = mongoose.model('UserProfile', userProfileSchema);
