const config = require('../config/index.json');
const KB_Role = require('mongoose').model('Role');
//var KB_Role = require('../models/kb_RolesModel.js');

exports.list = function(req, res){
  KB_Role.find(function(err, kb_role){
    if(err){
      throw err;
    }
    res.json(kb_role);
  });
};
// create actvity
exports.create = function(req, res){
  var kb_roleType = req.body;
//console.log(req.body);
  KB_Role.create(kb_roleType, function(err, kb_role){
    if(err){
      throw err;
    }
    res.json(kb_role);
  })
};

exports.read = function(req, res) {
  KB_Role.findById(req.params._id, function(err, kb_role) {
    if (err)
      res.send(err);
    res.json(kb_role);
  });
};

// update activity
exports.update = function(req, res){
  var kb_roleType = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
      Name:kb_roleType.Name
    }
  };
    // When true returns the updated document
    var options = {new: true};

    KB_Role.findOneAndUpdate(query, update, options, function(err, kb_role){
      if(err){
        throw err;
      }
      res.json(kb_role);
    })

};
// delete actvity
exports.delete = function(req, res){
  var query = {_id: req.params._id};

  KB_Role.remove(query, function(err, kb_role){
    if(err){
      console.log("# API DELETE ACTIVITY: ", err);
    }
    res.json(kb_role);
  })
};
//db.disconnect();
