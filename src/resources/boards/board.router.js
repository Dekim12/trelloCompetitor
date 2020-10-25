const router = require('express').Router();
const boardsService = require('./board.service');

// Get all Boards
router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();

    const boardsToResponse = boards.map(user => user.toResponse());

    res.status(200).json(boardsToResponse);
  } catch (err) {
    return next(err);
  }
});

// Create Board
router.route('/').post(async (req, res, next) => {
  try {
    const { title, columns } = req.body;

    const board = await boardsService.createBoard({ title, columns });

    res.status(200).json(board.toResponse());
  } catch (err) {
    return next(err);
  }
});

// Get Board by Id
router.route('/:boardId').get(async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const board = await boardsService.getById(boardId);

    if (!board) {
      return next({ statusCode: 404, result: 'Board not found.' });
    }

    res.status(200).json(board.toResponse());
  } catch (err) {
    return next(err);
  }
});

// Update Board
router.route('/:boardId').put(async (req, res, next) => {
  try {
    const { title, columns } = req.body;
    const { boardId } = req.params;

    console.log('----------', columns);

    const updateRes = await boardsService.updateBoard(boardId, {
      title,
      columns
    });

    if (!updateRes.n) {
      return next({ statusCode: 404, result: 'Board not found.' });
    }

    res.status(200).json({ id: boardId, title, columns });
  } catch (err) {
    return next(err);
  }
});

// Remove Board
router.route('/:boardId').delete(async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const removeRes = await boardsService.removeBoard(boardId);

    if (!removeRes.deletedCount) {
      return next({ statusCode: 404, result: 'Board not found.' });
    }
    res.status(204).json(boardId);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
