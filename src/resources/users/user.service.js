const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = userId => usersRepo.getById(userId);

const createUser = user => usersRepo.createUser(user);

const updateUser = (id, user) => usersRepo.updateUser(id, user);

const removeUser = id => usersRepo.removeUser(id);

module.exports = { getAll, getById, createUser, updateUser, removeUser };
