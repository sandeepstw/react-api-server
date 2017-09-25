# react-api-server
React API server based on node.js, express.js, mongodb including json web token and passport.js authentication for user access and roles.

# Install npm
npm install

#Install Nodemon
npm install -g nodemon

#Run Server using nodemon
nodemon

#Create data/db folder inside your project directory and run following command
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "your-data/db path"

It automatically create database as per name we mentioned DBDemo.

#Call API via postman using route path

http://localhost:3090/api/v1/role
"role" having name field who define the roles. We need to create role first.

http://localhost:3090/api/v1/signup
"user" collection having email,password field.For signup email,password and role are must.

"userRoles" contains userId,roleId. In that userId is reference of user-ObjectId and roleId is reference of role-ObjectId.

After signup you can signin and get token. For other collections token authorization is must.
"userProfile"-userId,description,Name,Phone. userId  

#signin
signin having email and password credentials and it will return the token.
