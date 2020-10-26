const Task = require('./task.model');

const getAll = async boardId => Task.find({ boardId });

const createTask = async (boardId, task) => Task.create({ ...task, boardId });

const getById = async (_id, boardId) => Task.findOne({ _id, boardId });

const updateTask = async (_id, boardId, task) =>
  Task.updateOne({ _id, boardId }, task);

const removeTask = async (_id, boardId) => Task.remove({ _id, boardId });

const removeBoardTasks = async boardId => Task.remove({ boardId });

const resetUserIds = async userId =>
  Task.updateMany({ userId }, { userId: null });

module.exports = {
  getAll,
  createTask,
  getById,
  updateTask,
  removeTask,
  removeBoardTasks,
  resetUserIds
};
