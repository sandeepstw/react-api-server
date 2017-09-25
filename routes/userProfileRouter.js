var express = require('express');
var router = express.Router();
const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

 var userProfile = require('../controllers/userProfileController.js');
 router.route('/userProfile')
         .get(requireAuth,userProfile.list)
         .post(requireAuth,userProfile.create);
 router.route('userProfile/:_id')
         .get(requireAuth,userProfile.read)
         .put(requireAuth,userProfile.update)
         .delete(requireAuth,userProfile.delete);
router.route('/searchUsers')
      .post(requireAuth,userProfile.searchUsers);

module.exports = router;
