const router = require('express').Router();
const userController = require('../../controllers/userController');
const passport = require('../../scripts/passport');

// Matches with /api/users
router
  .route('/')
  .get(userController.findAll)
  .post(userController.createUser)

// Matches /api/users/login
router
  .route('/login')
  .post(passport.authenticate('local'), (req, res) => {
    if (req.body) {
      return res.json(req.user._id);
    };
    return res.json(null);
  });

  module.exports = router;