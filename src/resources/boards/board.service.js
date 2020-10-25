const boardsRepo = require('./board.memory.repository');

const getAll = async () => boardsRepo.getAll();

const createBoard = async board => boardsRepo.createBoard(board);

const getById = async id => boardsRepo.getById(id);

const updateBoard = async (boardId, board) =>
  boardsRepo.updateBoard(boardId, board);

const removeBoard = async boardId => boardsRepo.removeBoard(boardId);

module.exports = { getAll, createBoard, getById, updateBoard, removeBoard };
