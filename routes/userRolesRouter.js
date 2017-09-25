var express = require('express');
var router = express.Router();
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

 var userRole = require('../controllers/userRolesController.js');
 router.route('/userRole')
         .get(requireAuth,userRole.list)
         .post(requireAuth,userRole.create);
 router.route('userRole/:_id')
         .get(requireAuth,userRole.read)
         .put(requireAuth,userRole.update)
         .delete(requireAuth,userRole.delete);
module.exports = router;
