const router = require('express').Router();

const authService = require('./auth.service');
const { Error403 } = require('../../common/errors');

// Login
router.route('/').post(async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const jwt = await authService.loginUser(login, password);

    if (!jwt) {
      return next(new Error403());
    }

    res.status(200).json({ token: jwt });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
