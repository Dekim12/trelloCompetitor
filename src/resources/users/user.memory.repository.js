const User = require('./user.model');
const db = require('../../db');

const getAll = () => Object.values(db.users).map(User.toResponse);

const getById = userId => {
  const user = db.users[userId];

  return User.toResponse(user);
};

const createUser = user => {
  Object.values(db.users).find(item => item.name === user.name);

  const newUser = new User(user);
  db.users[newUser.id] = newUser;

  return User.toResponse(newUser);
};

const updateUser = (id, user) => {
  const targetUser = db.users[id];

  const updatedUser = new User({ ...targetUser, ...user });
  db.users = { ...db.users, [id]: updatedUser };

  return User.toResponse(updatedUser);
};

const removeUser = id => {
  const { [id]: targetUser, ...users } = db.users;

  db.users = users;

  Object.keys(db.tasks).forEach(boardId => {
    Object.keys(db.tasks[boardId]).forEach(taskId => {
      if (db.tasks[boardId][taskId].userId === id) {
        db.tasks[boardId][taskId].userId = null;
      }
    });
  });

  return User.toResponse(targetUser);
};

module.exports = { getAll, getById, createUser, updateUser, removeUser };
