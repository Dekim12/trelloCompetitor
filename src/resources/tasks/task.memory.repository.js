const Task = require('./task.model');
const db = require('../../db');

const selectBoardTasks = (boardId, tasks) => tasks[boardId] || {};

const getAll = boardId => {
  return Object.values(selectBoardTasks(boardId, db.tasks));
};

const createTask = (boardId, task) => {
  let boardTasks = db.tasks[boardId];

  if (!boardTasks) {
    db.tasks[boardId] = {};
    boardTasks = db.tasks[boardId];
  }

  const targetTask = Object.values(boardTasks).find(
    item => item.title === task.title
  );

  if (targetTask) {
    return null;
  }

  const newTask = new Task(task);
  boardTasks[newTask.id] = newTask;

  return newTask;
};

const getById = (boardId, taskId) => {
  const boardTasks = db.tasks[boardId] || {};
  const targetTask = boardTasks[taskId];

  if (!targetTask) {
    return null;
  }

  return targetTask;
};

const updateTask = (boardId, taskId, task) => {
  const boardTasks = db.tasks[boardId] || {};
  const targetTask = boardTasks[taskId];

  if (!targetTask) {
    return null;
  }

  const updatedTask = new Task({ ...targetTask, ...task });
  db.tasks[boardId] = { ...db.tasks[boardId], [taskId]: updatedTask };

  return updatedTask;
};

const removeTask = (boardId, taskId) => {
  const boardTasks = db.tasks[boardId] || {};
  const { [taskId]: targetTask, ...tasks } = boardTasks;

  if (!targetTask) {
    return null;
  }

  db.tasks[boardId] = tasks;

  return targetTask;
};

module.exports = { getAll, createTask, getById, updateTask, removeTask };
