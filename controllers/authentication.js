const jwt = require('jwt-simple');
const User = require('mongoose').model('User');
const Role = require('mongoose').model('Role');
const UserRole = require('mongoose').model('UserRole');
const config = require('../config/index.json');
const assert=require('assert');

function tokenForUser(user,_role) {
   console.log(_role);
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp,role:_role }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  var userInRole='anonymous';
  UserRole.findOne({userId:req.user._id})
  .then((userrole)=>{
    Role.findOne({_id:userrole.roleId})
      .then((role)=>{
        // We just need to give them a token
        console.log("_role "+ role.name);
        userInRole=role.name;
  })
})
   res.json({ token: tokenForUser(req.user,userInRole) })

}

exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;
  const newrole=req.body.role;
  var userInRole='anonymous';


  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }
    })
.then((user)=>{
 //console.log('role id '+ newrole);
  // Find in Kb_Role document for posted role
  Role.findOne({name: newrole})
     .then((role)=>{
         console.log('role id '+ role);
      const userrole = new UserRole({
        userId: user._id,
        roleId: role._id
      });

       userrole.save()

       })
       userInRole=role.name;

     })
      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user, userInRole) });

  });
}
