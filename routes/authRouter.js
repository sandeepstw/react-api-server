var express = require('express');
var router = express.Router();

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
router.route('/signin')
         .post(requireSignin,Authentication.signin);
router.route('/signup')
         .post(Authentication.signup);

module.exports = router;
