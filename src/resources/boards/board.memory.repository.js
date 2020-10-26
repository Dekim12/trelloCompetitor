const Board = require('./board.model');
const { removeBoardTasks } = require('../tasks/task.memory.repository');

const getAll = async () => Board.find();

const createBoard = async board => Board.create(board);

const getById = async boardId => Board.findById(boardId);

const updateBoard = async (_id, { title, columns }) => {
  const transformedColumns = columns.map(
    ({ id, title: columnTitle, order }) => ({
      _id: id,
      title: columnTitle,
      order
    })
  );

  return Board.updateOne({ _id }, { title, columns: transformedColumns });
};

const removeBoard = async _id => {
  const { deletedCount } = await Board.remove({ _id });

  if (deletedCount) {
    await removeBoardTasks(_id);
  }

  return deletedCount;
};

module.exports = { getAll, createBoard, getById, updateBoard, removeBoard };
