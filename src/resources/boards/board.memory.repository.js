const Board = require('./board.model');
const db = require('../../db');

const getAll = () => Object.values(db.boards);

const createBoard = board => {
  Object.values(db.boards).find(item => item.title === board.title);

  const newBoard = new Board(board);
  db.boards[newBoard.id] = newBoard;

  return newBoard;
};

const getById = boardId => {
  const board = db.boards[boardId];

  if (!board) {
    return null;
  }

  return board;
};

const updateBoard = (id, board) => {
  const targetBoard = db.boards[id];

  const updatedBoard = new Board({ ...targetBoard, ...board });
  db.boards = { ...db.boards, [id]: updatedBoard };

  return updatedBoard;
};

const removeBoard = id => {
  const { [id]: targetBoard, ...boards } = db.boards;

  if (!targetBoard) {
    return null;
  }

  db.boards = boards;
  delete db.tasks[id];

  return targetBoard;
};

module.exports = { getAll, createBoard, getById, updateBoard, removeBoard };
