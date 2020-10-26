const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const { Error404 } = require('../../common/errors');

const ERROR_RESULT = 'Task not found.';

// Get all Tasks
router.route('/').get(async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const tasks = await tasksService.getAll(boardId);

    const tasksToResponse = tasks.map(user => user.toResponse());

    res.status(200).json(tasksToResponse);
  } catch (err) {
    return next(err);
  }
});

// Create Task
router.route('/').post(async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const task = await tasksService.createTask(boardId, req.body);

    res.status(200).json(task.toResponse());
  } catch (err) {
    return next(err);
  }
});

// Get Task by Id
router.route('/:taskId').get(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;

    const task = await tasksService.getById(taskId, boardId);

    if (!task) {
      return next(new Error404(ERROR_RESULT));
    }

    res.status(200).json(task.toResponse());
  } catch (err) {
    return next(err);
  }
});

// Update Task
router.route('/:taskId').put(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;

    const updateRes = await tasksService.updateTask(taskId, boardId, req.body);

    if (!updateRes.n) {
      return next(new Error404(ERROR_RESULT));
    }

    res.status(200).json({ ...req.body, id: taskId, boardId });
  } catch (err) {
    return next(err);
  }
});

// Remove Task
router.route('/:taskId').delete(async (req, res, next) => {
  try {
    const { boardId, taskId } = req.params;

    const removeRes = await tasksService.removeTask(taskId, boardId);

    if (!removeRes.deletedCount) {
      return next(new Error404(ERROR_RESULT));
    }

    res.status(204).json(taskId);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
