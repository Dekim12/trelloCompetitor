const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    columns: [
      {
        title: String,
        order: Number
      }
    ]
  },
  { versionKey: false }
);

function toResponse() {
  const { id, title, columns } = this;

  const transformedColumns = columns.map(
    ({ _id, title: columnTitle, order }) => ({
      id: _id,
      title: columnTitle,
      order
    })
  );

  return {
    id,
    title,
    columns: transformedColumns
  };
}

BoardSchema.methods.toResponse = toResponse;

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
