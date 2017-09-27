const jwt = require('jwt-simple');
const User = require('mongoose').model('User');
const Role = require('mongoose').model('Role');
const UserRole = require('mongoose').model('UserRole');
const config = require('../config/index.json');
const assert=require('assert');

function tokenForUser(user,_role) {

  const timestamp = new Date().getTime();
     console.log( 'token role'+ _role);
  return jwt.encode({ sub: user.id, iat:timestamp,role:_role }, config.secret);
}

exports.signin = function(req, res) {
  // User has already had their email and password auth'd
  // console.log("hi ");

    UserRole.findOne({userId:req.user._id})
      .then((userrole)=>{
        console.log("user id " + userrole.userId);
        const roleid=userrole.roleId;
          Role.findOne({_id:roleid})
          .then((role)=>{
            if(role!=null)
            {
              res.json({ token: tokenForUser(req.user, role.name)});
            }
            else {
              res.json({ token: tokenForUser(req.user, '')});
            }
          })
        })

}

exports.signup = function(req, res, next) {

  const email = req.body.email;
  const password = req.body.password;
  const newrole=req.body.role;

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

  // Find in Kb_Role document for posted role
  Role.findOne({name: newrole})
  .then((role)=>{
          if(role!=null)
          {
            const userrole = new UserRole({
              userId: user._id,
              roleId: role._id
            });

             userrole.save()
               res.json({ token: tokenForUser(user, role.name)});
          }
          else {
            res.json({ token: tokenForUser(user, '')});
          }
    })
     })


  });
}
