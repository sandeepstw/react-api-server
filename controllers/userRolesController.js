'use strict';
var db = require('../config/index.json');
const UserRole = require('mongoose').model('UserRole');
//var KB_UserRole = require('../models/kb_UserRolesModel.js');

exports.list = function(req, res){
  UserRole.find(function(err, userroles){
    if(err){
      throw err;
    }
    res.json(userroles);
  });
};
// create actvity
exports.create = function(req, res){
  var userrolesType = req.body;
//console.log(req.body);
  UserRole.create(userrolesType, function(err, userroles){
    if(err){
      throw err;
    }
    res.json(userroles);
  })
};

exports.read = function(req, res) {
  UserRole.findById(req.params._id, function(err, userroles) {
    if (err)
      res.send(err);
    res.json(userroles);
  });
};

// update activity
exports.update = function(req, res){
  var userrolesType = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
Rolename:userrolesType.Rolename
    }
  };
    // When true returns the updated document
    var options = {new: true};

    UserRole.findOneAndUpdate(query, update, options, function(err, userroles){
      if(err){
        throw err;
      }
      res.json(userroles);
    })

};
// delete actvity
exports.delete = function(req, res){
  var query = {_id: req.params._id};

  UserRole.remove(query, function(err, userroles){
    if(err){
      console.log("# API DELETE ACTIVITY: ", err);
    }
    res.json(userroles);
  })
};


// 'use strict';
// var db = require('../config/index.json');
// const UserRole = require('mongoose').model('UserRole');
// //var KB_UserRole = require('../models/kb_UserRolesModel.js');
//
// exports.list = function(req, res){
//   UserRole.find(function(err, userroles){
//     if(err){
//       throw err;
//     }
//     res.json(userroles);
//   });
// };
// // create actvity
// exports.create = function(req, res){
//   var userrolesType = req.body;
// //console.log(req.body);
//   KB_UserRole.create(userrolesType, function(err, userroles){
//     if(err){
//       throw err;
//     }
//     res.json(userroles);
//   })
// };
//
// exports.read = function(req, res) {
//   UserRole.findById(req.params._id, function(err, userroles) {
//     if (err)
//       res.send(err);
//     res.json(userroles);
//   });
// };
//
// // update activity
// exports.update = function(req, res){
//   var userrolesType = req.body;
//   var query = req.params._id;
//   // if the field doesn't exist $set will set a new field
//   var update = {
//     '$set':{
// Rolename:userrolesType.Rolename
//     }
//   };
//     // When true returns the updated document
//     var options = {new: true};
//
//     UserRole.findOneAndUpdate(query, update, options, function(err, userroles){
//       if(err){
//         throw err;
//       }
//       res.json(userroles);
//     })
//
// };
// // delete actvity
// exports.delete = function(req, res){
//   var query = {_id: req.params._id};
//
//   UserRole.remove(query, function(err, userroles){
//     if(err){
//       console.log("# API DELETE ACTIVITY: ", err);
//     }
//     res.json(userroles);
//   })
// };
