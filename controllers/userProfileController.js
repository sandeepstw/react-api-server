'use strict';
var db = require('../config/index.json');
const UserProfile = require('mongoose').model('UserProfile');
const UserRole = require('mongoose').model('UserRole');

//var KB_UserProfile = require('../models/kb_UserProfileModel.js');

exports.list = function(req, res){
  UserProfile.find(function(err, userProfile){
    if(err){
      throw err;
    }
    res.json(userProfile);
  });
};
exports.searchUsers = function(req, res){
    var searchText = req.body.value;
  UserProfile.find({$text: {$search: searchText}})
       .exec(function(err, userProfile) {
         if(err){
           throw err;
         }
         res.json(userProfile);
       }
     );
};
// create actvity
exports.create = function(req, res){
//var userProfileNew = req.body;
console.log(req.body);
var userProfileNew ={userId:req.user._id,	description:req.body.description, name:req.body.name, phone: req.body.phone}
//console.log(req.body);
  UserProfile.create(userProfileNew, function(err, userProfile){
    if(err){
      throw err;
    }
    res.json(userProfile);
  })
};

exports.read = function(req, res) {
  UserProfile.findById(req.params._id, function(err,userProfile) {
    if (err)
      res.send(err);
    res.json(userProfile);
  });
};

// update activity
exports.update = function(req, res){
  var userProfileType = req.body;
  var query = req.params._id;
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
TaskName:userProfileType.TaskName
    }
  };
    // When true returns the updated document
    var options = {new: true};

    UserProfile.findOneAndUpdate(query, update, options, function(err, userProfile){
      if(err){
        throw err;
      }
      res.json(userProfile);
    })

};
// delete actvity
exports.delete = function(req, res){
  var query = {_id: req.params._id};

  UserProfile.remove(query, function(err, userProfile){
    if(err){
      console.log("# API DELETE ACTIVITY: ", err);
    }
    res.json(userProfile);
  })
};


// 'use strict';
// var db = require('../config/index.json');
// const UserProfile = require('mongoose').model('UserProfile');
// //var KB_UserProfile = require('../models/kb_UserProfileModel.js');
//
// exports.list = function(req, res){
//   UserProfile.find(function(err, userProfile){
//     if(err){
//       throw err;
//     }
//     res.json(userProfile);
//   });
// };
// exports.searchUsers = function(req, res){
//     var searchText = req.body.value;
//   UserProfile.find({$text: {$search: searchText}})
//        .exec(function(err, userProfile) {
//          if(err){
//            throw err;
//          }
//          res.json(userProfile);
//        }
//      );
// };
// // create actvity
// exports.create = function(req, res){
//   // Getting user from req using passport jwt
//   var userProfileNew=req.body;
//   //var userProfileNew ={userId:req.user._id,	"description":req.body.Description, "name":req.body.name, "phone": req.body.phone}
// //console.log(req.body);
//   UserProfile.create(userProfileNew, function(err, userProfile){
//     if(err){
//       throw err;
//     }
//     res.json(userProfile);
//   })
// };
//
// exports.read = function(req, res) {
//   UserProfile.findById(req.user._id, function(err, userProfile) {
//     if (err)
//       res.send(err);
//     res.json(userProfile);
//   });
// };
//
// // update activity
// exports.update = function(req, res){
//   var userProfileType = req.body;
//   var query = req.params._id;
//   // if the field doesn't exist $set will set a new field
//   var update = {
//     '$set':{
//       TaskName:userProfileType.TaskName
//     }
//   };
//     // When true returns the updated document
//     var options = {new: true};
//
//     UserProfile.findOneAndUpdate(query, update, options, function(err, userProfile){
//       if(err){
//         throw err;
//       }
//       res.json(userProfile);
//     })
//
// };
// // delete actvity
// exports.delete = function(req, res){
//   var query = {_id: req.params._id};
//
//   UserProfile.remove(query, function(err, userProfile){
//     if(err){
//       console.log("# API DELETE ACTIVITY: ", err);
//     }
//     res.json(userProfile);
//   })
// };
