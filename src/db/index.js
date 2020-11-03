const mongoose = require('mongoose');

const { MONGO_CONNECTION_STRING } = require('../common/config');
const { hashPassword } = require('../common/authUtils');
const {
  createUser,
  getByLogin
} = require('../resources/users/user.memory.repository');

const connectToDb = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.once('open', async () => {
    // db.dropDatabase();
    const user = await getByLogin('admin');

    if (!user) {
      const password = await hashPassword('admin');

      await createUser({
        name: 'admin',
        login: 'admin',
        password
      });
    }

    cb();
  }).on('error', () => console.log('connection error:'));
};

module.exports = connectToDb;
