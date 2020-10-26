const router = require('express').Router();
const usersService = require('./user.service');
const { Error404 } = require('../../common/errors');

const ERROR_RESULT = 'User not found.';

// Get all Users
router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();

    const usersToResponse = users.map(user => user.toResponse());

    res.status(200).json(usersToResponse);
  } catch (err) {
    return next(err);
  }
});

// Create User
router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);

    res.status(200).json(user.toResponse());
  } catch (err) {
    return next(err);
  }
});

// Get User by Id
router.route('/:userId').get(async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await usersService.getById(userId);

    if (!user) {
      return next(new Error404(ERROR_RESULT));
    }

    res.status(200).json(user.toResponse());
  } catch (err) {
    return next(err);
  }
});

// Update User
router.route('/:userId').put(async (req, res, next) => {
  try {
    const { name, login, password } = req.body;
    const { userId } = req.params;

    const updateRes = await usersService.updateUser(userId, {
      name,
      login,
      password
    });

    if (!updateRes.n) {
      return next(new Error404(ERROR_RESULT));
    }

    res.status(200).json({ id: userId, name, login });
  } catch (err) {
    return next(err);
  }
});

// Remove User
router.route('/:userId').delete(async (req, res, next) => {
  try {
    const { userId } = req.params;

    const deletedCount = await usersService.removeUser(userId);

    if (!deletedCount) {
      return next(new Error404(ERROR_RESULT));
    }

    res.status(204).json(userId);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
