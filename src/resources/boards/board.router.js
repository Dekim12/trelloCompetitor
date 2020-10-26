const router = require('express').Router();
const boardsService = require('./board.service');
const { Error404 } = require('../../common/errors');

const ERROR_RESULT = 'Board not found.';

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
      return next(new Error404(ERROR_RESULT));
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

    const updateRes = await boardsService.updateBoard(boardId, {
      title,
      columns
    });

    if (!updateRes.n) {
      return next(new Error404(ERROR_RESULT));
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

    const deletedCount = await boardsService.removeBoard(boardId);

    if (!deletedCount) {
      return next(new Error404(ERROR_RESULT));
    }

    res.status(204).json(boardId);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
