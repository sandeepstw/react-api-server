# react-api-server
React API server based on node.js, express.js, mongodb including json web token and passport.js authentication for user access and roles.

# installation
### install npm
npm install

### install nodemon using following command
npm install -g nodemon

nodemon will automatically restart our server application whenever a code change happens.

# run server using nodemon from your project directory
nodemon
![](image\nodemon.PNG "Description goes here")

# create data/db folder inside your project directory and run following command
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "your-data/db path"
![](image\dbConn.PNG "Description goes here")

![](image\dbstart.PNG "Description goes here")
It will automatically create database as per name we mentioned DBDemo.
![](image\DBdemo.PNG "Description goes here")

# call API via postman using route path

"role" having name field who define the roles. We need to create role first.http://localhost:3090/api/v1/role
![](image\roleApi.PNG "Description goes here")
http://localhost:3090/api/v1/signup

"user" collection having email,password fields.For signup email,password and role are must.
![](image\api1.PNG "Description goes here")
![](image\user.PNG "Description goes here")

"userRoles" contains userId,roleId. In that userId is reference of user-ObjectId and roleId is reference of role-ObjectId.
![](image\userrole.PNG "Description goes here")

# signin
signin having email and password credentials and it will return the token.
![](image\api2.PNG "Description goes here")

For other collections token authorization is must.
"userProfile"-userId,description,Name,Phone. userId is the reference of

# Usage

userSchema.pre('save', function saveHook(next) {
  // get access to the user model
  const user = this;
  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
        // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) { return next(err); }
        // overwrite plain text password with encrypted password
      user.password = hash;
        next();
      });
  });
});

UserSchema.pre('save') that will be executed before saving. In this method, the bcrypt module will generate a hash from a generated earlier salt string and a user’s password. This hash instead of a user’s password will be saved in the collection.

![](image\hash.PNG "Description goes here")
This generation will be executed only if it’s a new document or the password field has been changed:
 user.isModified('password').

The schema also contains a method UserSchema.methods.comparePassword that we will call if we want to check if a user has provided a correct password.

function tokenForUser(user,_role) {

      const timestamp = new Date().getTime();

      return jwt.encode({ sub: user.id, iat:timestamp,role:_role }, config.secret);

}
This will create token for user. token encoded by header (algorithm and token type),payload (data) and signature. The signature part contains an encoded header, a payload, and a secret key phrase.
