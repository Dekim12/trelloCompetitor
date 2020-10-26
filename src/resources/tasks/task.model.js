const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    order: Number,
    description: String,
    userId: {
      type: String,
      ref: 'User'
    },
    boardId: {
      type: String,
      ref: 'Board'
    },
    columnId: String
  },
  { versionKey: false }
);

function toResponse() {
  const { id, title, order, description, userId, boardId, columnId } = this;

  return { id, title, order, description, userId, boardId, columnId };
}

TaskSchema.methods.toResponse = toResponse;

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
