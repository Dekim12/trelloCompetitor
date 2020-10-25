const User = require('./user.model');

const getAll = async () => User.find();

const createUser = async user => User.create(user);

const getById = async userId => User.findById(userId);

const updateUser = async (_id, user) => User.updateOne({ _id }, user);

const removeUser = async _id => User.remove({ _id });

module.exports = { getAll, getById, createUser, updateUser, removeUser };
