const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

// Get all Tasks
router.route('/').get(async (req, res) => {
  try {
    const { boardId } = req.params;

    const tasks = await tasksService.getAll(boardId);

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

// Create Task
router.route('/').post(async (req, res) => {
  try {
    // const { title, order, description, userId, boardId, columnId } = req.body;
    const { boardId } = req.params;

    const task = await tasksService.createTask(boardId, req.body);

    if (!task) {
      res
        .status(400)
        .json({ success: false, result: 'Task has already exist.' });
    } else {
      res.status(200).json(task);
    }
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

// Get Task by Id
router.route('/:taskId').get(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;

    const task = await tasksService.getById(boardId, taskId);

    if (!task) {
      res.status(404).json({ success: false, result: 'Task not found.' });
    } else {
      res.status(200).json(task);
    }
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

// Update Task
router.route('/:taskId').put(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;

    const task = await tasksService.updateTask(boardId, taskId, req.body);

    if (!task) {
      res.status(400).json({ success: false, result: 'Task not found.' });
    } else {
      res.status(200).json(task);
    }
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

// Remove Task
router.route('/:taskId').delete(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;

    const task = await tasksService.removeTask(boardId, taskId);

    if (!task) {
      res.status(404).json({ success: false, result: 'User not found.' });
    } else {
      res.status(204).json(task);
    }
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

module.exports = router;
