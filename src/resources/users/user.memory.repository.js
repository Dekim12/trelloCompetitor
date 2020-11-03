const User = require('./user.model');
const { resetUserIds } = require('../tasks/task.memory.repository');

const getAll = async () => User.find();

const createUser = async user => User.create(user);

const getById = async userId => User.findById(userId);

const getByLogin = async login => User.findOne({ login });

const updateUser = async (_id, user) => User.updateOne({ _id }, user);

const removeUser = async _id => {
  const { deletedCount } = await User.remove({ _id });

  if (deletedCount) {
    await resetUserIds(_id);
  }

  return deletedCount;
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  removeUser,
  getByLogin
};
