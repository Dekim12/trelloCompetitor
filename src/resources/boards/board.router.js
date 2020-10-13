const router = require('express').Router();
const boardsService = require('./board.service');

// Get all Boards
router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();

    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

// Create Board
router.route('/').post(async (req, res) => {
  try {
    const { title, columns } = req.body;

    const board = await boardsService.createBoard({ title, columns });

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

// Get Board by Id
router.route('/:boardId').get(async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await boardsService.getById(boardId);
    if (!board) {
      res.status(404).json({ success: false, result: 'Task not found.' });
    } else {
      res.status(200).json(board);
    }
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

// Update Board
router.route('/:boardId').put(async (req, res) => {
  try {
    const { title, columns } = req.body;
    const { boardId } = req.params;

    const board = await boardsService.updateBoard(boardId, {
      title,
      columns
    });

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

// Remove Board
router.route('/:boardId').delete(async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await boardsService.removeBoard(boardId);

    if (!board) {
      res.status(404).json({ success: false, result: 'Board not found.' });
    } else {
      res.status(204).json(board);
    }
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

module.exports = router;
