'use strict';
var db = require('../config/index.json');
const KB_UserRole = require('mongoose').model('UserRole');
//var KB_UserRole = require('../models/kb_UserRolesModel.js');

exports.list = function(req, res){
  KB_UserRole.find(function(err, kb_userroles){
    if(err){
      throw err;
    }
    res.json(kb_userroles);
  });
};
// create actvity
exports.create = function(req, res){
  var kb_userrolesType = req.body;
//console.log(req.body);
  KB_UserRole.create(kb_userrolesType, function(err, kb_userroles){
    if(err){
      throw err;
    }
    res.json(kb_userroles);
  })
};

exports.read = function(req, res) {
  KB_UserRole.findById(req.params._id, function(err, kb_userroles) {
    if (err)
      res.send(err);
    res.json(kb_userroles);
  });
};

// update activity
exports.update = function(req, res){
  var kb_userrolesType = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
Rolename:kb_userrolesType.Rolename
    }
  };
    // When true returns the updated document
    var options = {new: true};

    KB_UserRole.findOneAndUpdate(query, update, options, function(err, kb_userroles){
      if(err){
        throw err;
      }
      res.json(kb_userroles);
    })

};
// delete actvity
exports.delete = function(req, res){
  var query = {_id: req.params._id};

  KB_UserRole.remove(query, function(err, kb_userroles){
    if(err){
      console.log("# API DELETE ACTIVITY: ", err);
    }
    res.json(kb_userroles);
  })
};
