const config = require('../config/index.json');
const Role = require('mongoose').model('Role');
//var KB_Role = require('../models/kb_RolesModel.js');

exports.list = function(req, res){
  Role.find(function(err, role){
    if(err){
      throw err;
    }
    res.json(role);
  });
};
// create actvity
exports.create = function(req, res){
  var roleType = req.body;
//console.log(req.body);
  Role.create(roleType, function(err, role){
    if(err){
      throw err;
    }
    res.json(role);
  })
};

exports.read = function(req, res) {
  Role.findById(req.params._id, function(err, role) {
    if (err)
      res.send(err);
    res.json(role);
  });
};

// update activity
exports.update = function(req, res){
  var roleType = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
      name:roleType.Name
    }
  };
    // When true returns the updated document
    var options = {new: true};

    Role.findOneAndUpdate(query, update, options, function(err, role){
      if(err){
        throw err;
      }
      res.json(role);
    })

};
// delete actvity
exports.delete = function(req, res){
  var query = {_id: req.params._id};

  Role.remove(query, function(err, role){
    if(err){
      console.log("# API DELETE ACTIVITY: ", err);
    }
    res.json(role);
  })
};
//db.disconnect();
