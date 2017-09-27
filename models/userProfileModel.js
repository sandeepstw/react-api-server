"use strict"
var mongoose = require('mongoose');

var userProfileSchema = mongoose.Schema({
    userId:Object,
    description:String,
    name:String,
    phone:String
  });

userProfileSchema.index(
  {"$**": "text"},
);

module.exports = mongoose.model('UserProfile', userProfileSchema);
