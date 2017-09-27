'use strict'

var authRouter = require('./authRouter.js');
var roleRouter=require('./roleRouter.js');
var userroleRouter=require('./userRolesRouter.js');
var userprofileRouter=require('./userProfileRouter');

module.exports = function(app)
{
    app.use("/api/v1",authRouter);
    app.use("/api/v1",roleRouter);
    app.use("/api/v1",userroleRouter);
    app.use("/api/v1",userprofileRouter);
}
