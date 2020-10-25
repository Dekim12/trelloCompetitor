const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();

const getById = async userId => usersRepo.getById(userId);

const createUser = async user => usersRepo.createUser(user);

const updateUser = async (id, user) => usersRepo.updateUser(id, user);

const removeUser = async id => usersRepo.removeUser(id);

module.exports = { getAll, getById, createUser, updateUser, removeUser };
