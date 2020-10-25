const { PORT } = require('./common/config');
const app = require('./app');
const connectToDb = require('./db');

connectToDb(() => {
  console.log('Connected to DB');

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
