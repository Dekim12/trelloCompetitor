const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const createTask = (boardId, task) => tasksRepo.createTask(boardId, task);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const updateTask = (boardId, taskId, task) =>
  tasksRepo.updateTask(boardId, taskId, task);

const removeTask = (boardId, taskId) => tasksRepo.removeTask(boardId, taskId);

module.exports = { getAll, createTask, getById, updateTask, removeTask };
