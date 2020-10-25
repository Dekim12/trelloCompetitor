const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

// Get all Tasks
router.route('/').get(async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const tasks = await tasksService.getAll(boardId);

    res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
});

// Create Task
router.route('/').post(async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const task = await tasksService.createTask(boardId, req.body);

    res.status(200).json(task);
  } catch (err) {
    return next(err);
  }
});

// Get Task by Id
router.route('/:taskId').get(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;

    const task = await tasksService.getById(boardId, taskId);

    if (!task) {
      return next({ statusCode: 404, result: 'Task not found.' });
    }
    res.status(200).json(task);
  } catch (err) {
    return next(err);
  }
});

// Update Task
router.route('/:taskId').put(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;

    const task = await tasksService.updateTask(boardId, taskId, req.body);

    res.status(200).json(task);
  } catch (err) {
    return next(err);
  }
});

// Remove Task
router.route('/:taskId').delete(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;

    const task = await tasksService.removeTask(boardId, taskId);

    if (!task) {
      return next({ statusCode: 404, result: 'Task not found.' });
    }
    res.status(204).json(task);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
