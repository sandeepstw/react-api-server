# react-api-server
React API server based on node.js, express.js, mongodb including json web token and passport.js authentication for user access and roles.

# installation
### install npm
npm install

### install nodemon using following command
npm install -g nodemon

nodemon will automatically restart our server application whenever a code change happens.

# run server using nodemon
nodemon

# create data/db folder inside your project directory and run following command
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "your-data/db path"
![start database](D:\Project\react-api-server\react-api-server\image.png "Description goes here")
It will automatically create database as per name we mentioned DBDemo.

# call API via postman using route path

http://localhost:3090/api/v1/role
"role" having name field who define the roles. We need to create role first.

http://localhost:3090/api/v1/signup
"user" collection having email,password fields.For signup email,password and role are must.

"userRoles" contains userId,roleId. In that userId is reference of user-ObjectId and roleId is reference of role-ObjectId.

After signup you can signin and get token. For other collections token authorization is must.
"userProfile"-userId,description,Name,Phone.

# signin
signin having email and password credentials and it will return the token.

# Usage
function tokenForUser(user,_role) {

      const timestamp = new Date().getTime();

      return jwt.encode({ sub: user.id, iat:timestamp,role:_role }, config.secret);

}

This will create token for user. token encoded by header (algorithm and token type),payload (data) and signature. The signature part contains an encoded header, a payload, and a secret key phrase.
