const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title, columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => ({ id: uuid(), ...column }));
  }
}

module.exports = Board;
