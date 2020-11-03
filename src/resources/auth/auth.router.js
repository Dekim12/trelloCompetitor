const router = require('express').Router();

const usersRepo = require('../users/user.memory.repository');
const { Error403 } = require('../../common/errors');
const { comparePasswords, generateJWT } = require('../../common/authUtils');

// Login
router.route('/').post(async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const user = await usersRepo.getByLogin(login);

    if (!user) {
      return next(new Error403());
    }

    const isPasswordsEqual = await comparePasswords(password, user.password);

    if (!isPasswordsEqual) {
      return next(new Error403());
    }

    const jwt = await generateJWT({ userId: user._id, login: user.login });

    res.status(200).json({ token: jwt });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
