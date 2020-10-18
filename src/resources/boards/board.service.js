const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const createBoard = board => boardsRepo.createBoard(board);

const getById = id => boardsRepo.getById(id);

const updateBoard = (boardId, board) => boardsRepo.updateBoard(boardId, board);

const removeBoard = boardId => boardsRepo.removeBoard(boardId);

module.exports = { getAll, createBoard, getById, updateBoard, removeBoard };
