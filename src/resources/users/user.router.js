const router = require('express').Router();
const usersService = require('./user.service');

// Get all Users
router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();

    res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
});

// Create User
router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);

    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
});

// Get User by Id
router.route('/:userId').get(async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await usersService.getById(userId);

    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
});

// Update User
router.route('/:userId').put(async (req, res, next) => {
  try {
    const { name, login, password } = req.body;
    const { userId } = req.params;

    const user = await usersService.updateUser(userId, {
      name,
      login,
      password
    });

    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
});

// Remove User
router.route('/:userId').delete(async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await usersService.removeUser(userId);

    res.status(204).json(user);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
