const tasksRepo = require('./task.memory.repository');

const getAll = async boardId => tasksRepo.getAll(boardId);

const createTask = async (boardId, task) => tasksRepo.createTask(boardId, task);

const getById = async (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const updateTask = async (boardId, taskId, task) =>
  tasksRepo.updateTask(boardId, taskId, task);

const removeTask = async (boardId, taskId) =>
  tasksRepo.removeTask(boardId, taskId);

module.exports = { getAll, createTask, getById, updateTask, removeTask };
