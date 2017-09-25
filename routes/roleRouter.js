var express = require('express');
var router = express.Router();
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

 var role = require('../controllers/rolesController.js');
 router.route('/role')
         .get(role.list)
         .post(role.create);
 router.route('role/:_id')
         .get(requireAuth,role.read)
         .put(requireAuth,role.update)
         .delete(requireAuth,role.delete);
module.exports = router;
