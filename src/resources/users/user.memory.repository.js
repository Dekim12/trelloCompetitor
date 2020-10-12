const User = require('./user.model');
const db = require('../../db');

const getAll = () => Object.values(db.users).map(User.toResponse);

const getById = userId => {
  const user = db.users[userId];

  if (user) {
    return User.toResponse(user);
  }

  return null;
};

const createUser = user => {
  const targetUser = Object.values(db.users).find(
    item => item.name === user.name
  );

  if (targetUser) {
    return null;
  }

  const newUser = new User(user);
  db.users[newUser.id] = newUser;

  return User.toResponse(newUser);
};

const updateUser = (id, user) => {
  const targetUser = db.users[id];

  if (!targetUser) {
    return null;
  }

  const updatedUser = new User({ ...targetUser, ...user });
  db.users = { ...db.users, [id]: updatedUser };

  return User.toResponse(updatedUser);
};

const removeUser = id => {
  const { [id]: targetUser, ...users } = db.users;

  if (!targetUser) {
    return null;
  }

  db.users = users;

  return User.toResponse(targetUser);
};

module.exports = { getAll, getById, createUser, updateUser, removeUser };
